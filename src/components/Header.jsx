import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Search,
  User2Icon,
  PhoneCallIcon,
  LogInIcon,
} from "lucide-react";
import MiniCart from "./MiniCart";

export default function Header() {
  const { token } = useSelector((state) => state.auth);
  const { total_quantity, items } = useSelector((state) => state.cart);
  // console.log(total_quantity)
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);

  // Function to handle click outside the MiniCart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log(items);

  // const cartItems = [
  //   {
  //     id: 1,
  //     name: "Throwback Hip Bag",
  //     color: "Salmon",
  //     image:
  //       "https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Medium Stuff Satchel",
  //     color: "Blue",
  //     image:
  //       "https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Zip Tote Basket",
  //     color: "White and black",
  //     image:
  //       "https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  //   },
  // ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="logo">
          <Link to={"/"}>
            <img
              src="https://sanipexgroup.com/media/athlete2/default/SANIPEX_LOGO_NEW.webp"
              alt="Sanipex Group Logo"
              className="h-10 w-auto" // Adjust height and keep aspect ratio
            />
          </Link>
        </div>

        {/* Navigation Links */}
        {/* <nav className="flex space-x-4">
          <a href="#shop" className="text-gray-600 hover:text-black">
            Shop
          </a>
          <a href="#trends" className="text-gray-600 hover:text-black">
            Trends
          </a>
          <a href="#collections" className="text-gray-600 hover:text-black">
            Collections
          </a>
        </nav> */}

        {/* Contact and Cart Links */}

        <div className="relative">
          <div className="flex items-center gap-4">
            <Search className="cursor-pointer" />
            <Link to={"tel:+123456789"}>
              <PhoneCallIcon />
            </Link>
            {!token ? (
              <Link to={`customer/account/login`}>
                <LogInIcon />
              </Link>
            ) : (
              <Link className="text-pretty" to={`customer/account`}>
                <User2Icon />
              </Link>
            )}
            <div
              className="relative cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              // ref={cartRef}
            >
              <ShoppingBag  />
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 rounded-full">
                {total_quantity}
              </span>
            </div>
          </div>
          {isOpen && <MiniCart cartItems={items} />}
        </div>
      </div>
    </header>
  );
}
