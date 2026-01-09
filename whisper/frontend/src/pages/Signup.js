import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!nickname || !password) return alert("All fields required!");
    try {
      await axios.post("http://localhost:5000/signup", { nickname, password });
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={styles.page}>
      {/* Left side with illustration */}
      <div style={styles.leftPane}>
        <div style={styles.illustrationContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/images/login-illustration.png`}
            alt="Illustration"
            style={styles.illustration}
          />
          <p style={styles.caption}>
            Join our community today and start your journey with us.
            Enjoy a seamless experience crafted for you!
          </p>
        </div>
      </div>

      {/* Right side with signup form */}
      <div style={styles.rightPane}>
        <div style={styles.card}>
          <h3 style={styles.welcomeText}>Create Account</h3>
          <h2 style={styles.title}>Sign up to get started</h2>

          <input
            placeholder="Username"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleSignup} style={styles.button}>
            Signup
          </button>

          <div style={styles.links}>
            <p style={{ marginTop: "15px" }}>
              Already have an account?{" "}
              <Link to="/" style={styles.link}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #673AB7, #512DA8)",
  },
  leftPane: {
    flex: 1,
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
    padding: "40px",
  },
  illustrationContainer: {
    textAlign: "center",
    color: "white",
  },
  illustration: {
    width: "450px",
    height: "auto",
    marginBottom: "30px",
    transition: "transform 0.3s ease",
  },
  caption: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.6",
  },
  rightPane: {
    flex: 1,
    background: "white",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    maxWidth: "350px",
    textAlign: "center",
  },
  welcomeText: {
    background: "linear-gradient(135deg, #9575CD, #673AB7)",
    color: "white",
    padding: "8px 20px",
    borderRadius: "20px",
    display: "inline-block",
    fontSize: "14px",
    marginBottom: "20px",
  },
  title: {
    fontWeight: "600",
    color: "#333",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "10px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #7B1FA2, #9C27B0)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  links: {
    marginTop: "20px",
  },
  link: {
    color: "#7B1FA2",
    fontWeight: "500",
    textDecoration: "none",
  },
};
