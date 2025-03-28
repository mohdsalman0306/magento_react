const instagramImages = [
  'https://sanipexgroup.com/media/ox_instagram/470487623_18087702811539366_1382405063356308400_n.jpg',
  'https://sanipexgroup.com/media/ox_instagram/471430471_18088199554539366_5097691385758343069_n.jpg',
  'https://sanipexgroup.com/media/ox_instagram/472343599_18089158510539366_4104780996268696116_n.jpg',
  'https://sanipexgroup.com/media/ox_instagram/470487623_18087702811539366_1382405063356308400_n.jpg',
  'https://sanipexgroup.com/media/ox_instagram/471430471_18088199554539366_5097691385758343069_n.jpg',
  'https://sanipexgroup.com/media/ox_instagram/472343599_18089158510539366_4104780996268696116_n.jpg',
  
];

export default function InstagramFeed() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Instagram Feed</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {instagramImages.map((image, index) => (
            <div
              key={index}
              className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
