import TextField from "@mui/material/TextField";
import { Country, State } from "country-state-city";
import { MenuItem } from "@mui/material";

function BillingForm({ country, setCountry, city, setCity, phoneCode, setPhoneCode, phone, setPhone }) {
  const countries = Country.getAllCountries();
  const wilayas = State.getStatesOfCountry(country);

  return (
    <div className="shadow-md rounded-md p-5 bg-[#f1f1f1] mt-2">
      <h2 className="text-[18px] font-[600]">Billing Details</h2>

      <form className="w-full mt-2">
        {/* Personal Info */}
        <h5 className="text-[14px] font-[500] mt-3">Personal Information *</h5>
        <div className="flex flex-col md:flex-row items-center gap-3 py-2">
          <div className="w-full md:w-[50%]">
            <TextField type="text" label="Full Name" variant="outlined" className="w-full" required />
          </div>
          <div className="w-full md:w-[50%]">
            <TextField type="email" label="Email" variant="outlined" className="w-full" required />
          </div>
        </div>

        {/* Street Address */}
        <h5 className="text-[14px] font-[500] mt-3">Street Address *</h5>
        <div className="flex flex-col gap-3 py-2">
          <TextField type="text" label="House No. and Street Name" variant="outlined" className="w-full" required />
          <TextField type="text" label="Apartment, Suite, Unit (Optional)" variant="outlined" className="w-full" />
        </div>

        {/* Location Details */}
        <h5 className="text-[14px] font-[500] mt-3">Location Details *</h5>
        <div className="flex flex-col md:flex-row items-center gap-3 py-2">
          {/* Country */}
          <div className="w-full md:w-[33%]">
            <TextField
              select
              label="Country"
              value={country}
              onChange={(e) => {
                const selectedCountry = Country.getCountryByCode(e.target.value);
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
            <TextField type="text" label="Postal Code (Optional)" variant="outlined" className="w-full" />
          </div>
        </div>

        {/* Contact Info */}
        <h5 className="text-[14px] font-[500] mt-3">Contact Information *</h5>
        <div className="flex items-center gap-3 py-2">
          <div className="w-full">
            <TextField
              type="tel"
              label="Phone Number"
              variant="outlined"
              className="w-full"
              value={`${phoneCode} ${phone}`}
              onChange={(e) => setPhone(e.target.value.replace(phoneCode, "").trim())}
              placeholder={`${phoneCode} XXXXXXXX`}
              required
            />
          </div>
        </div>

        {/* Order Notes */}
        <h5 className="text-[14px] font-[500] mt-3">Order Notes (Optional)</h5>
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
  );
}

export default BillingForm;
