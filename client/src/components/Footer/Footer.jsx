import "./style.css";
import FooterFeatures from "./FooterFeatures";
import FooterMain from "./FooterMain";
import FooterBottom from "./FooterBottom";

function Footer() {
  return (
    <footer className="pt-6 bg-[#f1f1f1] border-t-[1px] border-primary">
      <FooterFeatures />
      <FooterMain />
      <FooterBottom />
    </footer>
  );
}

export default Footer;
