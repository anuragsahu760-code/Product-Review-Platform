import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4003";

function renderStars(rating) {
  return `${"*".repeat(rating)}${"-".repeat(5 - rating)}`;
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [form, setForm] = useState({ productId: 1, rating: 5, comment: "" });

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((response) => response.json())
      .then(setProducts);
  }, []);

  async function login() {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "anurag@example.com" })
    });

    const data = await response.json();
    setToken(data.token);
  }

  async function submitReview(event) {
    event.preventDefault();
    if (!token) {
      return;
    }

    await fetch(`${API_BASE}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: Number(form.productId),
        rating: Number(form.rating),
        comment: form.comment
      })
    });

    const refreshed = await fetch(`${API_BASE}/api/products`).then((response) => response.json());
    setProducts(refreshed);
    setForm({ ...form, comment: "" });
  }

  const totalReviews = products.reduce((sum, product) => sum + product.reviews.length, 0);
  const featuredProduct = products[0];

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Customer trust platform</p>
          <h1>Collect better product feedback in a storefront that feels credible.</h1>
          <p className="subtitle">
            Product Review Platform brings catalog browsing, review moderation, and
            authenticated customer feedback into a more premium commerce experience.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={login}>
              {token ? "Workspace connected" : "Launch demo workspace"}
            </button>
            <span>{token ? "JWT session active" : "Secure reviewer login enabled"}</span>
          </div>
        </div>

        <aside className="hero-card">
          <p className="card-label">Reputation summary</p>
          <div className="metric-grid">
            <article>
              <span>Products tracked</span>
              <strong>{products.length || 3}</strong>
            </article>
            <article>
              <span>Reviews captured</span>
              <strong>{totalReviews || 12}</strong>
            </article>
            <article>
              <span>Top rating</span>
              <strong>{featuredProduct ? featuredProduct.averageRating : 4.6}</strong>
            </article>
            <article>
              <span>Auth layer</span>
              <strong>JWT</strong>
            </article>
          </div>
        </aside>
      </section>

      <section className="feature-strip">
        <article>
          <h3>Storefront-ready UI</h3>
          <p>Balances catalog browsing, ratings, and review detail without looking like an admin mockup.</p>
        </article>
        <article>
          <h3>Protected review workflow</h3>
          <p>Authenticated review creation demonstrates the practical side of JWT-secured APIs.</p>
        </article>
        <article>
          <h3>Portfolio-friendly architecture</h3>
          <p>Clear separation between product data, review data, and interactive client components.</p>
        </article>
      </section>

      <section className="content">
        <div className="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Catalog showcase</p>
              <h2>Featured customer sentiment</h2>
            </div>
          </div>
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-header">
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                </div>
                <div className="rating-badge">
                  <strong>{product.averageRating}</strong>
                  <span>{product.category}</span>
                </div>
              </div>
              <div className="review-list">
                {product.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-top">
                      <strong>{review.author}</strong>
                      <span>{renderStars(review.rating)}</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <form className="review-form" onSubmit={submitReview}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Review composer</p>
              <h2>Capture fresh feedback</h2>
            </div>
          </div>
          <p className="form-copy">
            Log in once, choose a product, and simulate a verified review submission flow.
          </p>
          <select
            value={form.productId}
            onChange={(event) => setForm({ ...form, productId: event.target.value })}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <select
            value={form.rating}
            onChange={(event) => setForm({ ...form, rating: event.target.value })}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} stars
              </option>
            ))}
          </select>
          <textarea
            rows="7"
            placeholder="Write a thoughtful, specific review"
            value={form.comment}
            onChange={(event) => setForm({ ...form, comment: event.target.value })}
          />
          <button type="submit" disabled={!token}>
            {token ? "Publish review" : "Login to post"}
          </button>
        </form>
      </section>
    </main>
  );
}
