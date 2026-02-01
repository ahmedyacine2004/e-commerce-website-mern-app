function DescriptionTab({ description, activeTab }) {
  if (!description) return null; // safe guard if description is missing

  return (
    <div className={`desc ${activeTab !== "desc" ? "hidden" : "block"}`}>
      <h4 className="font-[600]">{description.h4_1}</h4>
      <p className="text-[14px] pr-48 mt-2 mb-5">{description.p_1}</p>

      <h4 className="font-[600]">{description.h4_2}</h4>
      <p className="text-[14px] pr-48 mt-2 mb-5">{description.p_2}</p>

      <h4 className="font-[600]">{description.h4_3}</h4>
      <p className="text-[14px] pr-48 mt-2 mb-5">{description.p_3}</p>

      <h4 className="font-[600]">{description.h4_4}</h4>
      <p className="text-[14px] pr-48 mt-2 mb-5">{description.p_4}</p>

      <h4 className="font-[600]">{description.h4_5}</h4>
      <p className="text-[14px] pr-48 mt-2 mb-5">{description.p_5}</p>
    </div>
  );
}

export default DescriptionTab;
