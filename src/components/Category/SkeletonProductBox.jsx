const SkeletonProductBox = () => {
  return (
    <div className="w-full p-4 border rounded-lg animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-md"></div>
      <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonProductBox;
