import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";

export default function Register() {
  return (
    <main style={{ padding: "40px 24px", textAlign: "center", maxWidth: 400, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Create Account</h1>
      <p style={{ color: "#666", lineHeight: 1.6 }}>
        Registration is coming soon. You will be able to create an account to
        track orders and save your favorites.
      </p>
      <p style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
        <Link
          to={ROUTES.PRODUCTS}
          style={{
            padding: "12px 24px",
            background: "#111",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Browse Shop
        </Link>
        <Link
          to={ROUTES.LOGIN}
          style={{
            padding: "12px 24px",
            background: "#f5f5f5",
            color: "#111",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Sign In
        </Link>
      </p>
    </main>
  );
}
