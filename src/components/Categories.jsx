const categories = [
  { name: 'Bathroom', icon: '🛁' },
  { name: 'Kitchen', icon: '🍴' },
  { name: 'Outdoor', icon: '🌿' },
  { name: 'Lighting', icon: '💡' },
  { name: 'Accessories', icon: '🎁' },
];

export default function Categories() {
  return (
    <section id="shop" className="py-12 bg-gray-50">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-white shadow rounded hover:shadow-lg transition"
          >
            <div className="text-4xl">{category.icon}</div>
            <h3 className="mt-2 text-lg font-medium">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
