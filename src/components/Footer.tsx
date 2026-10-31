import { site } from '../content';

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {site.name.toUpperCase()}</span>
      <span>
        <span className="hide-sm">BUILT AS A SYSTEM · </span>
        <a href="#top">BACK TO TOP ↑</a>
      </span>
    </footer>
  );
}
