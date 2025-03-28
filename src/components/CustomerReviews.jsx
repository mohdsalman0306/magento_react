import { useEffect, useState } from "react";
import axios from "axios";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/customer-reviews"
        );
        setReviews(response.data.data); // Access the reviews
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reviews. Please try again later.");
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);
	
 	 // Auto-slide functionality
  	useEffect(() => {
    	const interval = setInterval(() => {
      		setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    	}, 3000); // Change slide every 3 seconds

    	return () => clearInterval(interval); // Cleanup interval on unmount
  	}, [reviews]);

  	if (loading) return <p>Loading reviews...</p>;
  	if (error) return <p>{error}</p>;

  	// Get 3 reviews for the current slide (current, previous, and next)
  	const getVisibleReviews = () => {
    	if (reviews.length < 3) return reviews;

    	const prevIndex = activeIndex === 0 ? reviews.length - 1 : activeIndex - 1;
    	const nextIndex = activeIndex === reviews.length - 1 ? 0 : activeIndex + 1;

    	return [reviews[prevIndex], reviews[activeIndex], reviews[nextIndex]];
  	};
	
	const visibleReviews = getVisibleReviews();

  	return (
    	<section className="py-12 bg-gray-100">
      	<div className="container mx-auto text-center">
        	<h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

        	<div className="relative flex justify-center items-center">
          {/* Slider Wrapper */}
          <div className="flex justify-center items-center space-x-4 overflow-hidden w-full">
            {visibleReviews.map((review, index) => {
              const isActive = index === 1; // The middle review is the active one
              return (
                <div
                  key={review.id}
                  className={`transition-all duration-300 ease-in-out transform ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-75"
                  } w-1/3`}
                >
                  <blockquote className="text-lg italic bg-white p-8 shadow rounded overflow-hidden h-60 w-full flex flex-col justify-between">
                    <p className="line-clamp-4 text-ellipsis overflow-hidden">
                      {review.review_description[0].children
                        .map((child) => child.text)
                        .join("")}
                    </p>
                    <footer className="mt-4 text-gray-600">
                      - Rating: {review.rating}
                    </footer>
                  </blockquote>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() =>
              setActiveIndex((prev) =>
                prev === 0 ? reviews.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % reviews.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
