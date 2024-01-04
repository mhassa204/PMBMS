import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === items.length - 1 ? "active text-xl font-bold" : ""
            }`}
          >
            {index === items.length - 1 ? (
              item.label
            ) : (
              <Link
                className="text-xl text-green-700 hover:text-green-500  font-bold"
                to={item.path}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
