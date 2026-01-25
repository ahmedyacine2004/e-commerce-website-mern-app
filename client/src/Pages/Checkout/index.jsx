import { useContext } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import { Country, State } from "country-state-city";
import { MenuItem } from "@mui/material";
import { useState } from "react";

function Checkout() {
  // TODO: Country City flexibility by AI
  const [country, setCountry] = useState("DZ"); // default Algeria
  const [city, setCity] = useState("");
  const [phoneCode, setPhoneCode] = useState("+213");
  const [phone, setPhone] = useState("");

  const countries = Country.getAllCountries();
  const wilayas = State.getStatesOfCountry(country);
  // =================== Contexts ====================
  const context = useContext(DrawerContext);
  const orders = context.orders.list;
  return (
    <section className="section pt-5">
      <Stack spacing={2} className="container pb-5">
        <Breadcrumbs separator={"|"} aria-label="breadcrumb">
          <Link key="1" color="inherit" to="/" className="link">
            Home
          </Link>
          <Typography
            key="3"
            sx={{ color: "text.primary" }}
            className="link cursor-pointer"
          >
            Cart
          </Typography>
          <Typography
            key="3"
            sx={{ color: "text.primary" }}
            className="link cursor-pointer"
          >
            checkout
          </Typography>
        </Breadcrumbs>
      </Stack>
      <div className="w-full bg-white pb-5">
        <div className="container flex gap-4 w-[80%] max-w-[80%]">
          {/* TODO: Look at the generated AI part here */}
          {/* Left Part */}
          <div className="leftPart w-[70%] py-3">
            <div className="shadow-md rounded-md p-5 bg-[#f1f1f1] mt-2">
              <h2 className="text-[18px] font-[600]">Billing Details</h2>

              <form className="w-full mt-2">
                {/* Personal Info */}
                <h5 className="text-[14px] font-[500] mt-3">
                  Personal Information *
                </h5>
                <div className="flex flex-col md:flex-row items-center gap-3 py-2">
                  <div className="w-full md:w-[50%]">
                    <TextField
                      type="text"
                      label="Full Name"
                      variant="outlined"
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="w-full md:w-[50%]">
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                {/* Street Address */}
                <h5 className="text-[14px] font-[500] mt-3">
                  Street Address *
                </h5>
                <div className="flex flex-col gap-3 py-2">
                  <TextField
                    type="text"
                    label="House No. and Street Name"
                    variant="outlined"
                    className="w-full"
                    required
                  />
                  <TextField
                    type="text"
                    label="Apartment, Suite, Unit (Optional)"
                    variant="outlined"
                    className="w-full"
                  />
                </div>

                {/* Location Details */}
                <h5 className="text-[14px] font-[500] mt-3">
                  Location Details *
                </h5>
                <div className="flex flex-col md:flex-row items-center gap-3 py-2">
                  {/* Country */}
                  <div className="w-full md:w-[33%]">
                    <TextField
                      select
                      label="Country"
                      value={country}
                      onChange={(e) => {
                        const selectedCountry = Country.getCountryByCode(
                          e.target.value,
                        );
                        setCountry(e.target.value);
                        setCity("");
                        setPhoneCode(`+${selectedCountry.phonecode}`);
                      }}
                      className="w-full"
                      required
                    >
                      {countries.map((c) => (
                        <MenuItem key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  {/* City / Wilaya */}
                  <div className="w-full md:w-[33%]">
                    <TextField
                      select
                      label="City / Wilaya"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full"
                      required
                    >
                      {wilayas.map((w) => (
                        <MenuItem key={w.isoCode} value={w.name}>
                          {w.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  {/* Postal Code */}
                  <div className="w-full md:w-[33%]">
                    <TextField
                      type="text"
                      label="Postal Code (Optional)"
                      variant="outlined"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <h5 className="text-[14px] font-[500] mt-3">
                  Contact Information *
                </h5>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-full">
                    <TextField
                      type="tel"
                      label="Phone Number"
                      variant="outlined"
                      className="w-full"
                      value={`${phoneCode} ${phone}`}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(phoneCode, "").trim())
                      }
                      placeholder={`${phoneCode} XXXXXXXX`}
                      required
                    />
                  </div>
                </div>

                {/* Order Notes */}
                <h5 className="text-[14px] font-[500] mt-3">
                  Order Notes (Optional)
                </h5>
                <div className="py-2">
                  <TextField
                    multiline
                    rows={3}
                    label="Notes about your order, delivery instructions, etc."
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Part */}
          <div className="rightPart w-[30%] py-3">
            <div className="shadow-md rounded-md bg-[#f1f1f1] p-5 mt-2">
              <h2 className="text-[18px] font-[600]">Order Summary</h2>
              <hr className="my-2" />

              {/* Products list (scrollable) */}
              <div
                className="flex flex-col gap-3"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {orders.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-[14px]"
                  >
                    <div className="flex items-center gap-3">
                      {/* Product Image */}
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md bg-white border"
                      />

                      {/* Product Info */}
                      <div className="flex flex-col">
                        <span className="text-gray-700 line-clamp-1 max-w-[140px]">
                          {item.name}
                        </span>
                        <span className="text-[12px] text-gray-500">
                          ${item.newPrice} × {item.qty}
                        </span>
                      </div>
                    </div>

                    {/* Line Total */}
                    <span className="font-[600] text-gray-800">
                      ${(item.newPrice * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-3" />

              {/* Total items */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[14px] text-gray-600">Total Items</span>
                <span className="text-[14px] font-[600]">
                  {orders.reduce((sum, o) => sum + o.qty, 0)}
                </span>
              </div>

              {/* Total price */}
              <div className="flex items-center justify-between py-2 mt-2">
                <span className="text-[15px] font-[600]">Total Price</span>
                <span className="text-[16px] font-[700] text-primary">
                  $
                  {orders
                    .reduce((sum, o) => sum + o.newPrice * o.qty, 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/checkout">
                  <Button
                    endIcon={<BsFillBagCheckFill size={16} />}
                    className="!w-full !py-2 !bg-primary !text-white !font-[600]"
                  >
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
