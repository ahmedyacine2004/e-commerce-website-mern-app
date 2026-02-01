import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function FooterNewsletter() {
  return (
    <div className="part3 w-[35%] flex flex-col border-l px-8">
      <h2 className="text-[20px] font-[600] mb-4">
        Subscribe to Newsletter
      </h2>

      <p className="text-[13px]">
        Subscribe to our newsletter and stay updated with the latest
        products and offers.
      </p>

      <form className="mt-5">
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
  );
}

export default FooterNewsletter;
