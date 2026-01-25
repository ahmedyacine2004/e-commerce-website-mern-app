import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { IoMdGift } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "./style.css";

/**
 * Footer Component
 * ----------------
 * Displays the site footer including:
 * - Feature highlights (free shipping, returns, etc.)
 * - Contact info
 * - Products & company links
 * - Newsletter subscription form
 * - Social media buttons
 * - Payment methods and copyright
 */
function Footer() {
  return (
    <footer className="pt-6 bg-[#f1f1f1] border-t-[1px] border-primary">
      {/* ===========================
          Feature Highlights Section
      ============================ */}
      <div className="container">
        <div className="flex items-center justify-center gap-2 py-8">
          {/* Free Shipping */}
          <div className="col flex items-center text-center flex-col group w-[15%]">
            <LiaShippingFastSolid
              size={40}
              className="group-hover:translate-y-[-10px] group-hover:text-primary transition-all "
            />
            <h3 className="text-[18px] font-[600]">Free shipping</h3>
            <p className="text-[14px] font-[500]">On all orders over $100</p>
          </div>

          {/* 30 Days Returns */}
          <div className="col flex items-center text-center flex-col group w-[15%]">
            <PiKeyReturnLight
              size={40}
              className="group-hover:translate-y-[-10px] group-hover:text-primary transition-all "
            />
            <h3 className="text-[18px] font-[600]">30 Days returns</h3>
            <p className="text-[14px] font-[500]">For an exchange product</p>
          </div>

          {/* Secured Payment */}
          <div className="col flex items-center text-center flex-col group w-[15%]">
            <BsWallet2
              size={40}
              className="group-hover:translate-y-[-10px] group-hover:text-primary transition-all "
            />
            <h3 className="text-[18px] font-[600]">Secured Payment</h3>
            <p className="text-[14px] font-[500]">Payment Card accepted</p>
          </div>

          {/* Special Gifts */}
          <div className="col flex items-center text-center flex-col group w-[15%]">
            <IoMdGift
              size={40}
              className="group-hover:translate-y-[-10px] group-hover:text-primary transition-all "
            />
            <h3 className="text-[18px] font-[600]">Special Gifts</h3>
            <p className="text-[14px] font-[500]">Our First Product Order</p>
          </div>

          {/* Support 24/7 */}
          <div className="col flex items-center text-center flex-col group w-[15%]">
            <BiSupport
              size={40}
              className="group-hover:translate-y-[-10px] group-hover:text-primary transition-all "
            />
            <h3 className="text-[18px] font-[600]">Support 24/7</h3>
            <p className="text-[14px] font-[500]">Contact us anytime</p>
          </div>
        </div>

        <hr />

        {/* ===========================
            Main Footer Content
        ============================ */}
        <div className="footer flex py-6">
          {/* Contact Info Section */}
          <div className="part1 w-[25%]">
            <h2 className="text-[20px] font-[600] mb-4">Contact us</h2>
            <p className="text-[14px] font-[400] pb-4">
              CLASSYSHOP 123 Fashion Street, New York,
              <br /> NY 10001 United States
            </p>
            <Link
              className="link !block mb-4"
              to={"mailto:contact@example.com"}
            >
              contact@example.com
            </Link>
            <Link
              className="link text-[22px] font-[600] text-primary"
              to={"tel:+1234567890"}
            >
              (+1) 234 567 890
            </Link>
            <div className="flex items-center gap-2 mt-4">
              <IoChatboxOutline className="text-primary text-[40px] mt-4" />
              <span className="text-[16px] font-[600]">
                Live Chat <br /> Get expert help
              </span>
            </div>
          </div>

          {/* Products & Company Links */}
          <div className="part2 w-[40%] flex items-start justify-between border-l-[1px] border-r-[rgba(0,0,0,0.1)] px-10">
            <div className="part2-col1">
              <h2 className="text-[20px] font-[600] mb-4">Products</h2>
              <ul className="list">
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Prices drop
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    New products
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Best sales
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Contact us
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Sitemap
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Stores
                  </Link>
                </li>
              </ul>
            </div>
            <div className="part2-col2">
              <h2 className="text-[20px] font-[600] mb-4">Our company</h2>
              <ul className="list">
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Delivery
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Legal notice
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Terms and conditions of use
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    About us
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Secure payment
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                  <Link to={""} className="link">
                    Log in
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="part3 w-[35%] flex flex-col border-l-[1px] border-r-[rgba(0,0,0,0.1)] px-8">
            <h2 className="text-[20px] font-[600] mb-4">
              Subscribe to Newsletter
            </h2>
            <p className="text-[13px]">
              Subscribe to our newsletter and stay updated with the latest
              products and offers.
            </p>
            <form action="" className="mt-5">
              <input
                type="text"
                className="w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-primary"
                placeholder="Your email address"
              />
              <Button className="btn-org">SUBSCRIBE</Button>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I agree to the terms and conditions and privacy policy."
                className="mt-5"
              />
            </form>
          </div>
        </div>
      </div>

      {/* ===========================
          Bottom Strip: Social & Payment
      ============================ */}
      <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] py-4 bg-white">
        <div className="container flex items-center justify-between gap-2">
          {/* Social Media Buttons */}
          <ul>
            <li className="inline-block mr-4 text-[14px] font-[500] !rounded-full overflow-hidden">
              <Link to={"/"} target="_blank" className="link">
                <Button className="group !text-primary !max-h-[45px] !max-w-[45px] !min-h-[45px] !min-w-[45px] flex items-center justify-center">
                  <FaFacebookF className="text-[20px] group-hover:scale-110 transition-all" />
                </Button>
              </Link>
            </li>
            <li className="inline-block mr-4 text-[14px] font-[500] !rounded-full overflow-hidden">
              <Link to={"/"} target="_blank" className="link">
                <Button className="group !text-primary !max-h-[45px] !max-w-[45px] !min-h-[45px] !min-w-[45px] flex items-center justify-center">
                  <AiOutlineYoutube className="text-[20px] group-hover:scale-110 transition-all" />
                </Button>
              </Link>
            </li>
            <li className="inline-block mr-4 text-[14px] font-[500] !rounded-full overflow-hidden">
              <Link to={"/"} target="_blank" className="link">
                <Button className="group !text-primary !max-h-[45px] !max-w-[45px] !min-h-[45px] !min-w-[45px] flex items-center justify-center">
                  <FaPinterestP className="text-[20px] group-hover:scale-110 transition-all" />
                </Button>
              </Link>
            </li>
            <li className="inline-block mr-4 text-[14px] font-[500] !rounded-full overflow-hidden">
              <Link to={"/"} target="_blank" className="link">
                <Button className="group !text-primary !max-h-[45px] !max-w-[45px] !min-h-[45px] !min-w-[45px] flex items-center justify-center">
                  <FaInstagram className="text-[20px] group-hover:scale-110 transition-all" />
                </Button>
              </Link>
            </li>
          </ul>

          {/* Copyright */}
          <p className="text-center text-[14px] font-[400]">
            © {new Date().getFullYear()} ClassyShop. All Rights Reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <img
              src="/images/PaymentMethods/egold.png"
              alt="payment method"
              className="w-[35px]"
            />
            <img
              src="/images/PaymentMethods/maestro.png"
              alt="payment method"
              className="w-[35px]"
            />
            <img
              src="/images/PaymentMethods/mastercard.png"
              alt="payment method"
              className="w-[35px]"
            />
            <img
              src="/images/PaymentMethods/paypal.png"
              alt="payment method"
              className="w-[35px]"
            />
            <img
              src="/images/PaymentMethods/visa.png"
              alt="payment method"
              className="w-[35px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
