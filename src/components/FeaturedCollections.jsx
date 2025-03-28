const collections = [
  {
    name: "Modern Living",
    img: "https://sanipexgroup.com/media/ox_instagram/471430471_18088199554539366_5097691385758343069_n.jpg",
  },
  {
    name: "Beach House",
    img: "https://sanipexgroup.com/media/ox_instagram/471430471_18088199554539366_5097691385758343069_n.jpg",
  },
  {
    name: "Penthouse",
    img: "https://sanipexgroup.com/media/ox_instagram/471430471_18088199554539366_5097691385758343069_n.jpg",
  },
];

export default function FeaturedCollections() {
  return (
    <section id="collections" className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="relative group">
              <img
                src={collection.img}
                alt={collection.name}
                className="w-full rounded shadow"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <h3 className="text-white text-xl font-bold">
                  {collection.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
