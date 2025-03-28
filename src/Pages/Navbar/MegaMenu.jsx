import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_MEGAMENU } from "../../utils/graphql/query";

const Megamenu = ({ parentId, pageSize = 20, currentPage = 1 }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [encodedQuery, setEncodedQuery] = useState('');

  // Load the menu from localStorage if available
  const [menu, setMenu] = useState(() => {
    const storedMenu = localStorage.getItem("megaMenu");
    return storedMenu ? JSON.parse(storedMenu) : null;
  });

  const { loading, err, data } = useQuery(GET_MEGAMENU, {
    variables: { parentId, pageSize, currentPage },
    skip: menu !== null,
  });
  // URL-encode the query string
  // useEffect(() => {
  //   const encoded = encodeURIComponent(query);
  //   setEncodedQuery(encoded);
  // }, [query]);
  useEffect(() => {
    if (data?.categories?.items) {
      setMenu(data.categories.items);
      localStorage.setItem("megaMenu", JSON.stringify(data.categories.items));
    }
  }, [data]);

  if (loading)
    return (
      <nav className="bg-gray-100 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex space-x-8">
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className="w-32 h-8 bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  if (err) return <p>Error: {err.message}</p>;

  return (
    <>
      <nav className="bg-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex space-x-8">
                {menu
                  ?.filter((item) => item.include_in_menu == 1)
                  ?.map((category, index) => (
                    <div
                      key={category.uid}
                      className="relative"
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <Link
                        to={`/category/${
                          category.url_path + category.url_suffix
                        }`}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                          activeIndex === index
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        state={{ uid: category.uid }}
                      >
                        {category.name}
                      </Link>
                      {category.children_count > 0 && (
                        <div
                          className={`absolute left-0 top-full mt-0 w-48 bg-white shadow-lg rounded-md py-1 z-50 ${
                            activeIndex === index ? "block" : "hidden"
                          }`}
                        >
                          <NavItems items={category.children} depth={1} />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavItems = ({ items, depth }) => {
  return (
    <>
      {items
        .filter((item) => item.include_in_menu == 1)
        .map((item) => (
          <div key={item.uid} className="relative group z-50">
            <Link
              to={`/category/${item.url_path + item.url_suffix}`}
              className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              state={{ uid: item.uid }}
            >
              <span>{item.name}</span>
              {item.children_count > 0 && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </Link>
            {item.children_count > 0 && (
              <div
                className={`absolute ${
                  depth === 1 ? "left-full top-0" : "left-full top-0"
                } w-48 bg-white shadow-lg rounded-md py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-0`}
              >
                <NavItems items={item.children} depth={depth + 1} />
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Megamenu;
