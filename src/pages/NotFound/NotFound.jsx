import { Link } from "react-router";
import { ROUTES } from "../../constants/routes";

export default function NotFound() {
  return (
    <main style={{ padding: "80px 24px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <h1 style={{ fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1 }}>404</h1>
      <p style={{ color: "#888", fontSize: 14, marginTop: 8, marginBottom: 16 }}>
        Page not found
      </p>
      <p style={{ color: "#666", lineHeight: 1.6 }}>
        The page you are looking for does not exist or has been moved. Let us help
        you find something great.
      </p>
      <p style={{ marginTop: 24 }}>
        <Link
          to={ROUTES.HOME}
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "#111",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </p>
    </main>
  );
}
