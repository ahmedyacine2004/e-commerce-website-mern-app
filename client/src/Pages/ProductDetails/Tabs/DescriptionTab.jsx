function DescriptionTab({ description, activeTab }) {
  if (!description) return null; // safeguard if description is missing

  return (
    <div
      className={`desc ${activeTab !== "desc" ? "hidden" : "block"}`}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}

export default DescriptionTab;
