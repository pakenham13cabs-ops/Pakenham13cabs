import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Pakenham 13 Cabs home">
      <span className="brand-place">PAKENHAM</span>
      <span className="brand-main"><span className="brand-checkers" aria-hidden="true"><i /><i /><i /></span><strong>13</strong> Cabs</span>
      <span className="brand-tagline">Premium Car Service</span>
    </Link>
  );
}
