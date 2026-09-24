function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <h2>Contacts</h2>
        <div className="contact-list">
          <a 
            href="https://t.me/xzb1bs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-item"
          >
            <span>📱</span>
            <div>
              <strong>Telegram</strong>
              <div>@xzb1bs</div>
            </div>
          </a>

          <a 
            href="https://github.com/xzb1bs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-item"
          >
            <span>💻</span>
            <div>
              <strong>GitHub</strong>
              <div>github.com/xzb1bs</div>
            </div>
          </a>

          <a 
            href="mailto:beibarssagidolla47@gmail.com" 
            className="contact-item"
          >
            <span>✉️</span>
            <div>
              <strong>Email</strong>
              <div>beibarssagidolla47@gmail.com</div>
            </div>
          </a>

          <div className="contact-item">
            <span>🌍</span>
            <div>
              <strong>Location</strong>
              <div>Almaty, Kazakhstan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;