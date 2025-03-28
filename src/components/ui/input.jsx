export default function Input({ placeholder, value, ...props }) {
  return (
    <input
      className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
}
