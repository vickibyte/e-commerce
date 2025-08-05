/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1 style={{ fontSize: "90px", color: "orange" }}>404</h1>
      <p style={{ fontSize: "18px" }}>Page not found!</p>
      <Link to="/" style={{
        marginTop: "20px",
        display: "inline-block",
        padding: "10px 20px",
        background: "orange",
        color: "white",
        borderRadius: "5px",
        textDecoration: "none"
      }}>
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
