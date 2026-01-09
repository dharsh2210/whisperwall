import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { nickname, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("nickname", nickname);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftPane}>
        <div style={styles.illustrationContainer}>
          <img
            src="/images/login-illustration.png"
            alt="Illustration"
            style={styles.illustration}
          />
           <p style={styles.caption}>
            Join our community today and start your journey with us.
            Enjoy a seamless experience crafted for you!
          </p>
         
        </div>
      </div>

      <div style={styles.rightPane}>
        <div style={styles.card}>
          <h3 style={styles.welcomeText}>Welcome back</h3>
          <h2 style={styles.title}>Login your account</h2>

          <input
            placeholder="Nickname"
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

          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>

          <div style={styles.links}>
            <Link to="/signup" style={styles.link}>
              Create Account
            </Link>
            
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
  width: "450px",      // increased width
  height: "auto",      // keeps proportions
  marginBottom: "30px",
  transition: "all 0.3s ease",
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
    display: "block",
    marginBottom: "5px",
  },
  linkSmall: {
    color: "#999",
    fontSize: "13px",
    textDecoration: "none",
  },
};
