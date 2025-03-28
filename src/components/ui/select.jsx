export default function Select({ options, placeholder, ...props }) {
  return (
    <select
      className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      {...props}
    >
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option} defaultValue={""}>
          {option}
        </option>
      ))}
    </select>
  );
}
