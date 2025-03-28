import { useState } from "react";

const MediaGallery = ({product}) => {
  const media = product[0].media_gallery;
  // console.log(media)
  const [selectedImage, setSelectedImage] = useState(0)
  // console.log(selectedImage);
  return (
    
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={media[selectedImage].url}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {media.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded overflow-hidden border-2 ${
              selectedImage === index ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img src={img.url} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
