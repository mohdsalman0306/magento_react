export default function Hero() {
  return (
    <div className="relative bg-gray-100 h-[60vh]">
      <img
        src="https://sanipexgroup.com/media/catalog/category/BAGNODESIGN_NARA_OYSTER_SUB_SUB_BANNER_OPTION_4_8.webp"
        alt="Luxury Living"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Luxury Living</h1>
          <p className="text-lg">Beautiful and expertly crafted products</p>
        </div>
      </div>
    </div>
  );
}
