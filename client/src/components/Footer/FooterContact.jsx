import { IoChatboxOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function FooterContact() {
  return (
    <div className="part1 w-[25%]">
      <h2 className="text-[20px] font-[600] mb-4">Contact us</h2>
      <p className="text-[14px] pb-4">
        CLASSYSHOP 123 Fashion Street, New York,
        <br /> NY 10001 United States
      </p>

      <Link className="link !block mb-4" to="mailto:contact@example.com">
        contact@example.com
      </Link>

      <Link
        className="link text-[22px] font-[600] text-primary"
        to="tel:+1234567890"
      >
        (+1) 234 567 890
      </Link>

      <div className="flex items-center gap-2 mt-4">
        <IoChatboxOutline className="text-primary text-[40px]" />
        <span className="text-[16px] font-[600]">
          Live Chat <br /> Get expert help
        </span>
      </div>
    </div>
  );
}

export default FooterContact;
