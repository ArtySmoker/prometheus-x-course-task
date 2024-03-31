import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Виконано в{" "}
        <a
          href="https://prometheus.org.ua/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prometheus
        </a>{" "}
        © 2024
      </p>
    </footer>
  );
}

export default Footer;
