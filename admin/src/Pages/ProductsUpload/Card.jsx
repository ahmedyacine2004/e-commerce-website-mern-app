export default function Card({ title, children }) {
  return (
    <div className="bg-[#f1f1f1] border rounded-xl p-5 radius-lg shadow-sm">
      <h3 className="font-semibold mb-4 text-lg text-primary">{title}</h3>
      {children}
    </div>
  );
}
