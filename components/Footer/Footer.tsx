import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>
            Developer: <strong>Eugene O.</strong>
          </p>
          <p>
            <a
              href="https://github.com/id753"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
