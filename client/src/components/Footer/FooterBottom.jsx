import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

const socials = [
  { icon: <FaFacebookF />, url: "/" },
  { icon: <AiOutlineYoutube />, url: "/" },
  { icon: <FaPinterestP />, url: "/" },
  { icon: <FaInstagram />, url: "/" },
];

const payments = [
  "egold",
  "maestro",
  "mastercard",
  "paypal",
  "visa",
];

function FooterBottom() {
  return (
    <div className="bottomStrip border-t py-4 bg-white">
      <div className="container flex items-center justify-between">
        <ul>
          {socials.map((s, i) => (
            <li key={i} className="inline-block mr-4">
              <Link to={s.url} target="_blank">
                <Button className="group !text-primary !min-w-[45px] !min-h-[45px]">
                  <span className="group-hover:scale-110 transition-all">
                    {s.icon}
                  </span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-[14px]">
          © {new Date().getFullYear()} ClassyShop. All Rights Reserved.
        </p>

        <div className="flex gap-2">
          {payments.map((p) => (
            <img
              key={p}
              src={`/images/PaymentMethods/${p}.png`}
              alt={p}
              className="w-[35px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
