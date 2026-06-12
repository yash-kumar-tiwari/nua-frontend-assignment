import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "80px 24px",
            textAlign: "center",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <p style={{ marginTop: 24 }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 24px",
                background: "#111",
                color: "#fff",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Reload Page
            </button>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
