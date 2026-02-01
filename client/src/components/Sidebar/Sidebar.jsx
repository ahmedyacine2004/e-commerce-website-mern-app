import { useState } from "react";

import FilterSection from "./FilterSection";
import CheckboxList from "./CheckboxList";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

import "./style.css";

function Sidebar() {
  const [isOpened, setIsOpened] = useState({
    category: true,
    availability: true,
    size: true,
  });

  return (
    <aside className="flex flex-col gap-4 sidebar w-full h-full shadow-md rounded-md p-3 py-5">
      <FilterSection
        title="Shop By Categories"
        isOpened={isOpened.category}
        toggle={() => setIsOpened({ ...isOpened, category: !isOpened.category })}
      >
        <CheckboxList items={["Fashion","Electronics","Bags","Footwear","Groceries","Beauty","Wellness","Jewellery"]} />
      </FilterSection>

      <FilterSection
        title="Availability"
        isOpened={isOpened.availability}
        toggle={() => setIsOpened({ ...isOpened, availability: !isOpened.availability })}
      >
        <CheckboxList items={["Available (17)","In-Stock (20)","Not Available (200)"]} />
      </FilterSection>

      <FilterSection
        title="Size"
        isOpened={isOpened.size}
        toggle={() => setIsOpened({ ...isOpened, size: !isOpened.size })}
      >
        <CheckboxList items={["Small (16)","Medium (16)","Large (86)","XL (50)","XXL (40)"]} />
      </FilterSection>

      <PriceFilter />
      <RatingFilter />
    </aside>
  );
}

export default Sidebar;
