import {
  LiaShippingFastSolid,
} from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { IoMdGift } from "react-icons/io";
import { BiSupport } from "react-icons/bi";

const features = [
  {
    icon: <LiaShippingFastSolid size={40} />,
    title: "Free shipping",
    desc: "On all orders over $100",
  },
  {
    icon: <PiKeyReturnLight size={40} />,
    title: "30 Days returns",
    desc: "For an exchange product",
  },
  {
    icon: <BsWallet2 size={40} />,
    title: "Secured Payment",
    desc: "Payment Card accepted",
  },
  {
    icon: <IoMdGift size={40} />,
    title: "Special Gifts",
    desc: "Our First Product Order",
  },
  {
    icon: <BiSupport size={40} />,
    title: "Support 24/7",
    desc: "Contact us anytime",
  },
];

function FooterFeatures() {
  return (
    <div className="container">
      <div className="flex items-center justify-center gap-2 py-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="col flex items-center text-center flex-col group w-[15%]"
          >
            <div className="group-hover:translate-y-[-10px] group-hover:text-primary transition-all">
              {f.icon}
            </div>
            <h3 className="text-[18px] font-[600]">{f.title}</h3>
            <p className="text-[14px] font-[500]">{f.desc}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default FooterFeatures;
