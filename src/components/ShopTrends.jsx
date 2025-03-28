export default function ShopTrends() {
  return (
    <section id="trends" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8">Shop the Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src="https://sanipexgroup.com/media/ox_instagram/471430471_18088199554539366_5097691385758343069_n.jpg"
              alt="Trend 1"
              className="w-full rounded shadow"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Bathroom Trends</h3>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://sanipexgroup.com/media/ox_instagram/471430471_18088199554539366_5097691385758343069_n.jpg"
              alt="Trend 2"
              className="w-full rounded shadow"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Outdoor Trends</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
