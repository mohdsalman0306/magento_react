import clsx from "clsx";

const ImageSwatcher = ({ imageUrl, selected, onClick, alt = "" }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-10 h-10 rounded border-2 overflow-hidden transition-all duration-200",
        selected ? "ring-2 ring-offset-2 ring-black" : "border-gray-300"
      )}
    >
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
    </button>
  );
};

export default ImageSwatcher;
