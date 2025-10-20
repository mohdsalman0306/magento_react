import clsx from "clsx";

const ColorSwatcher = ({ color, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-8 h-8 rounded-full border-2 transition-all duration-200",
        selected ? "ring-2 ring-offset-2 ring-black" : "border-gray-300"
      )}
      style={{ backgroundColor: color }}
      aria-label={`Color ${color}`}
    />
  );
};

export default ColorSwatcher;
