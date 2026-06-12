import { Link } from "react-router";
import { ROUTES } from "../../constants/routes";

export default function Checkout() {
  return (
    <main style={{ padding: "80px 24px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Checkout</h1>
      <p style={{ color: "#666", lineHeight: 1.6 }}>
        The checkout experience is coming soon. In the meantime, continue browsing
        our collection.
      </p>
      <p style={{ marginTop: 24 }}>
        <Link
          to={ROUTES.PRODUCTS}
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "#111",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Continue Shopping
        </Link>
      </p>
    </main>
  );
}
