import { Link, useParams } from "react-router";
import { ROUTES } from "../../constants/routes";

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <main style={{ padding: "80px 24px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#16a05a",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          marginBottom: 16,
        }}
        aria-hidden="true"
      >
        ✓
      </div>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Order Confirmed</h1>
      {orderId && (
        <p style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
          Order #{orderId}
        </p>
      )}
      <p style={{ color: "#666", lineHeight: 1.6 }}>
        Thank you for your purchase! You will receive a confirmation email with
        your order details and tracking information shortly.
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
