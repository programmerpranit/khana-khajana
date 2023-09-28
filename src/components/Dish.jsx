import React from "react";

const Dish = ({ name, price, addDish, dishId }) => {
  return (
    <>
      <div className="border rounded p-5">
        <h4>{name}</h4>
        <div className="mt-2 flex justify-between">
          <p>
            Price: <strong>{price}/-</strong>
          </p>

          <button
            onClick={() => addDish(dishId, price, name, 1)}
            className="bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Dish;
