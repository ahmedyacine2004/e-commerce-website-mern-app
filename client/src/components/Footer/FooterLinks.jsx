import { Link } from "react-router-dom";

const products = [
  "Prices drop",
  "New products",
  "Best sales",
  "Contact us",
  "Sitemap",
  "Stores",
];

const company = [
  "Delivery",
  "Legal notice",
  "Terms and conditions of use",
  "About us",
  "Secure payment",
  "Log in",
];

function FooterLinks() {
  return (
    <div className="part2 w-[40%] flex justify-between border-l border-r px-10">
      <div>
        <h2 className="text-[20px] font-[600] mb-4">Products</h2>
        <ul>
          {products.map((item, i) => (
            <li key={i} className="mb-2 text-[14px]">
              <Link to="" className="link">{item}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-[20px] font-[600] mb-4">Our company</h2>
        <ul>
          {company.map((item, i) => (
            <li key={i} className="mb-2 text-[14px]">
              <Link to="" className="link">{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FooterLinks;
