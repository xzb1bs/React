function Login() {
  return (
    <section className="page login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p className="muted">Placeholder for future authentication.</p>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Login is a placeholder. Auth will be added later.');
          }}
        >
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" required />
          </label>
          <button type="submit" className="btn primary">Sign in</button>
        </form>
      </div>
    </section>
  );
}

export default Login;