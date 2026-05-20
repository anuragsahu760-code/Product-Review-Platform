import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const secret = "resume-project-demo-secret";

const products = [
  {
    id: 1,
    name: "EchoBuds Max",
    category: "Audio",
    averageRating: 4.4,
    description: "Noise-cancelling earbuds with adaptive EQ."
  },
  {
    id: 2,
    name: "NoteFlow Pro",
    category: "Productivity",
    averageRating: 4.1,
    description: "Digital notebook for hybrid teams."
  },
  {
    id: 3,
    name: "FitTrack Mini",
    category: "Wearables",
    averageRating: 4.6,
    description: "Compact health tracker with a 10-day battery."
  }
];

const reviews = [
  { productId: 1, author: "Anurag", rating: 5, comment: "Great sound and fit." },
  { productId: 1, author: "Ria", rating: 4, comment: "Good bass, solid battery." },
  { productId: 2, author: "Dev", rating: 4, comment: "Useful collaboration tools." }
];

function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "product-review-platform-backend" });
});

app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email: email || "demo@user.dev" }, secret, { expiresIn: "2h" });
  res.json({ token, user: { email: email || "demo@user.dev" } });
});

app.get("/api/products", (_req, res) => {
  const productsWithReviews = products.map((product) => ({
    ...product,
    reviews: reviews.filter((review) => review.productId === product.id)
  }));

  res.json(productsWithReviews);
});

app.post("/api/reviews", authenticate, (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = {
    productId,
    rating,
    comment,
    author: req.user.email
  };

  reviews.push(review);
  res.status(201).json(review);
});

const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Product Review Platform backend running on port ${port}`);
});
