import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";

function FooterMain() {
  return (
    <div className="container">
      <div className="footer flex py-6">
        <FooterContact />
        <FooterLinks />
        <FooterNewsletter />
      </div>
    </div>
  );
}

export default FooterMain;
