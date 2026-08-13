import Link from "next/link";
import { Brand } from "./Brand";
import { PHONE_DISPLAY, PHONE_HREF } from "../site-config";

const navigation = [["Home", "/"], ["Services", "/services"], ["Our Fleet", "/fleet"], ["Book Now", "/booking"], ["Areas", "/areas"], ["Contact", "/#contact"]] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="header-top shell"><Brand /><a className="header-call" href={PHONE_HREF} aria-label={`Call ${PHONE_DISPLAY}`}><span aria-hidden="true">☎</span> {PHONE_DISPLAY}</a></div>
      <div className="nav-wrap">
        <nav className="desktop-nav shell" aria-label="Main navigation">{navigation.map(([label, href]) => <Link className={label === "Book Now" ? "nav-book" : ""} href={href} key={label}>{label}</Link>)}</nav>
        <details className="mobile-nav shell"><summary>Menu</summary><nav aria-label="Mobile navigation">{navigation.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav></details>
      </div>
    </header>
  );
}
