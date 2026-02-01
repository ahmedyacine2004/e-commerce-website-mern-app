import { useContext, useState } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";

function Checkout() {
  const [country, setCountry] = useState("DZ"); // default Algeria
  const [city, setCity] = useState("");
  const [phoneCode, setPhoneCode] = useState("+213");
  const [phone, setPhone] = useState("");

  const context = useContext(DrawerContext);
  const orders = context.orders.list;

  return (
    <section className="section pt-5">
      <Stack spacing={2} className="container pb-5">
        <Breadcrumbs separator={"|"} aria-label="breadcrumb">
          <Link key="1" color="inherit" to="/" className="link">Home</Link>
          <Typography key="2" sx={{ color: "text.primary" }} className="link cursor-pointer">Cart</Typography>
          <Typography key="3" sx={{ color: "text.primary" }} className="link cursor-pointer">Checkout</Typography>
        </Breadcrumbs>
      </Stack>

      <div className="w-full bg-white pb-5">
        <div className="container flex gap-4 w-[80%] max-w-[80%]">
          {/* Left part */}
          <div className="leftPart w-[70%] py-3">
            <BillingForm
              country={country}
              setCountry={setCountry}
              city={city}
              setCity={setCity}
              phoneCode={phoneCode}
              setPhoneCode={setPhoneCode}
              phone={phone}
              setPhone={setPhone}
            />
          </div>

          {/* Right part */}
          <div className="rightPart w-[30%] py-3">
            <OrderSummary orders={orders} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
