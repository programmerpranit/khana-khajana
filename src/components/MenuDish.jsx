import React from "react";

const MenuDish = ({ name, price, category }) => {
  return (
    <>
      <div className="border rounded p-5">
        <h4>{name}</h4>
        <div className="mt-2 flex justify-between">
          <p>
            Price: <strong>{price}/-</strong>
          </p>

          <button className="bg-blue-500">{category}</button>
        </div>
      </div>
    </>
  );
};

export default MenuDish;
