import Navbar from "../components/Navbar";

export default function AboutPage() {
  const containerStyle = {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    color: "#1f2937",
    padding: "3rem 1rem",
    fontFamily: "Arial, sans-serif",
  };

  const sectionStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "2rem",
  };

  const titleStyle = {
    color: "#7c3aed",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const subtitleStyle = {
    color: "#6d28d9",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "0.75rem",
  };

  const paragraphStyle = {
    marginBottom: "1rem",
    lineHeight: "1.6",
  };

  const listStyle = {
    listStyleType: "disc",
    paddingLeft: "1.5rem",
    lineHeight: "1.6",
  };

  return (
    <>
        <Navbar />
      <div style={containerStyle}>
        <main style={{ maxWidth: "800px", margin: "0 auto" }}>
          <section style={sectionStyle}>
            <h1 style={titleStyle}>About WhisperWall</h1>
            <p style={paragraphStyle}>
              <strong>WhisperWall</strong> is an anonymous emotional support platform where users can express feelings and thoughts freely. It features themed rooms such as <em>"Regret", "Gratitude", "Anxiety"</em>, and more.
            </p>
            <p style={paragraphStyle}>
              Whether you're going through tough times or want to support others, WhisperWall offers a safe, kind, and empathetic community space.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subtitleStyle}>How to Use WhisperWall</h2>
            <ul style={listStyle}>
              <li>Log in with your Email or Google account.</li>
              <li>Select a room that reflects your current emotion or situation.</li>
              <li>Create your own post, or view and reply to others' posts anonymously.</li>
              <li>React using emojis like ❤ (support), 🤗 (comfort), and 😢 (empathy).</li>
              <li>Your profile remains anonymous — speak freely and safely.</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={subtitleStyle}>Creators</h2>
            <p style={paragraphStyle}>
              WhisperWall was created with purpose and care by <strong>DHARSHINI S</strong> and <strong>Thrishna V</strong> — developers passionate about emotional wellness and community-driven support systems.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
