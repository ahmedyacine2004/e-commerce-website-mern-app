function DescriptionTab({ description}) {
  if (!description || description.trim() === "") return null;


  return (
    <div
      style={{ whiteSpace: "normal", color: "inherit" }}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}

export default DescriptionTab;
