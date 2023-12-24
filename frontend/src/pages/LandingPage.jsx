import React, { useState } from "react";
import "../styles/landingPage.css";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const styles = {
    sec2div: "flex flex-column items-center w-64 gap-2",
    sec2img: "object-contain w-36 h-36",
    sec2p1: "font-bold text-xl",
    sec2p2: "text-center font-regular text-gray-500 text-sm",
  };
  return (
    <div>
      <section className="bg-blue-50">
        <nav className="flex items-center justify-between navBar">
          <p
            className="font-bold text-lg cursor-pointer"
            style={{ color: "#16356a" }}
          >
            govBazar
          </p>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none bg-blue-50"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute top-16 right-4 bg-white border p-4">
                <p className="p-2 navElems">Home</p>
                <p className="p-2  navElems">Bazaars</p>
                <p className="p-2 navElems">About Us</p>
                <p className="p-2 navElems">Contact Us</p>
                <p className="p-2  navElems">Sign Up</p>
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center">
            <p className="px-3 navElems">Home</p>
            <p className="px-3 navElems">Bazaars</p>
            <p className="px-3 navElems">About Us</p>
            <p className="px-3 navElems">Contact Us</p>
            <p className="px-3 navElems">Sign Up</p>
            <button
              className="py-1.5 px-4 text-white mx-3"
              style={{ backgroundColor: "#16356a" }}
            >
              LOGIN
            </button>
          </div>
        </nav>
        <div className="flex flex-col items-center md:flex-row md:pt-10 md:pl-28 justify-between">
          <div className="max-w-md md:flex flex-col gap-6 text-left marginTop">
            <p
              className="font-bold text-4xl text-left"
              style={{ color: "#16356a" }}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-left text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta rem
              beatae sed delectus totam cum architecto aut exercitationem nam
              veniam ratione nobis consectetur maxime autem debitis facilis
              quasi, aliquam voluptatibus sunt enim quo. Quo beatae explicabo a
              quod commodi optio!
            </p>
            <div className="flex flex-col md:flex-row gapBtn justify-center md:justify-start">
              <button
                className="w-full md:w-44 mb-3 md:mb-0"
                style={{ backgroundColor: "#16356a", color: "white" }}
              >
                Register
              </button>
              <button
                className="w-full md:w-44 mb-3 md:mb-0"
                style={{
                  backgroundColor: "white",
                  color: "#16356a",
                  border: "1px solid #16356a",
                }}
              >
                Login
              </button>
            </div>
          </div>
          <div className=" w-1/2">
            <img
              src="/images/landingPage.png"
              className="object-contain max-h-xl max-w-full"
            />
          </div>
        </div>
      </section>
      <section className="pt-20 pb-10 flex flex-column items-center ">
        <p className="font-bold text-2xl" style={{ color: "#16356a" }}>
          Our Partners
        </p>
        <img src="/images/gov.png" className="object-contain w-40 h-40" />
        <p className="font-bold text-2xl" style={{ color: "#16356a" }}>
          govBazar makes it easy to keep track of outlets
        </p>
        <div className="flex my-5">
          <div
            className="flex items-center justify-center px-8 py-2 rounded-tl-2xl rounded-bl-2xl"
            style={{ backgroundColor: "#16356a", color: "white" }}
          >
            <p>Zones</p>
          </div>
          <div
            className="flex items-center justify-center px-8 py-2 r"
            style={{ border: "1px solid #16356a" }}
          >
            <p>Cities</p>
          </div>
          <div
            className="flex items-center justify-center px-8 py-2 rounded-tr-2xl rounded-br-2xl"
            style={{ border: "1px solid #16356a" }}
          >
            <p>Bazaars</p>
          </div>
        </div>
        <div className="sec2Elems">
          <div className={`${styles.sec2div}`}>
            <img src="/images/zones.png" className={`${styles.sec2img}`} />
            <p className={`${styles.sec2p1}`} style={{ color: "#16356a" }}>
              Zones Creation
            </p>
            <p className={`${styles.sec2p2}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              suscipit similique deleniti tempora nesciunt harum?
            </p>
          </div>
          <span
            className="text-6xl pt-5 rotate-90 md:rotate-0"
            style={{ color: "#16356a" }}
          >
            &#8674;
          </span>
          <div className={`${styles.sec2div}`}>
            <img src="/images/bazaar.jpg" className={`${styles.sec2img}`} />
            <p className={`${styles.sec2p1}`} style={{ color: "#16356a" }}>
              Bazaars
            </p>
            <p className={`${styles.sec2p2}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              suscipit similique deleniti tempora nesciunt harum?
            </p>
          </div>
          <span
            className="text-6xl pt-5 rotate-90 md:rotate-0"
            style={{ color: "#16356a" }}
          >
            &#8674;
          </span>
          <div className={`${styles.sec2div}`}>
            <img src="/images/shops.jpg" className={`${styles.sec2img}`} />
            <p className={`${styles.sec2p1}`} style={{ color: "#16356a" }}>
              Shops
            </p>
            <p className={`${styles.sec2p2}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              suscipit similique deleniti tempora nesciunt harum?
            </p>
          </div>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="flex flex-col items-center md:flex-row justify-between px-10 md:pr-24 md:pl-12 py-10">
          <div className=" w-1/2">
            <img
              src="/images/ab.jpg"
              className="object-contain max-h-xl max-w-full"
            />
          </div>
          <div className="max-w-lg md:flex flex-col gap-6 md:text-left justify-center">
            <p
              className="font-bold text-4xl text-left"
              style={{ color: "#16356a" }}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-left text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta rem
              beatae sed delectus totam cum architecto aut exercitationem nam
              veniam ratione nobis consectetur maxime autem debitis facilis
              quasi, aliquam voluptatibus sunt enim quo. Quo beatae explicabo a
              quod commodi optio!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
