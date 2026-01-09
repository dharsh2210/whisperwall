import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#f3e8ff", minHeight: "100vh", color: "#5a0bc0" }}>
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h2>Contact Us</h2>
          <p>Email: support@whisperwall.com</p>
          <p>Phone: +91-1234567890</p>
          <p style={{ marginTop: "20px" }}>We’re here to support you anytime!</p>
        </div>
      </div>
    </>
  );
}
