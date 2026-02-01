function DetailsTab({ productDetails }) {
  return (
    <ul>
      {Object.entries(productDetails).map(([key, value]) => (
        <li key={key} className="flex justify-between border-b py-2">
          <span className="font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </span>
          <span className="text-gray-600">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default DetailsTab;
