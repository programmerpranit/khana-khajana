import MenuDish from "@/components/MenuDish";
import Navbar from "@/components/Navbar";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(100);
  const [category, setCategory] = useState("appetizer");

  const [dishes, setDishes] = useState([]);

  const getDishes = async () => {
    try {
      const url = `${BASE_URL}/api/menu`;
      const res = await axios.get(url);
      setDishes(res.data.dish);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveDish = async (e) => {
    e.preventDefault();

    try {
      const url = `${BASE_URL}/api/menu`;
      await axios.post(url, {
        name,
        price,
        category,
      });
      clearForm();
      getDishes();
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setName("");
    setPrice(100);
    setCategory("appetizer");
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-semibold text-center">Our Menu </h2>

      <div className="flex max-w-6xl gap-5 m-auto py-10 ">
        <div className="w-1/2 p-5">
          <input
            type="text"
            placeholder="Search Dish"
            className="w-full border outline-none p-2 rounded"
          />

          <div className="flex flex-wrap border-b-2 gap-3 py-5">
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-100 ">
              Appetizer
            </p>
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-200 ">
              Main Course
            </p>
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-200 ">
              Appetizer
            </p>
          </div>

          <div className="dishlist my-5">
            {dishes.map((dish) => (
              <MenuDish
                key={dish._id}
                name={dish.name}
                price={dish.price}
                category={dish.category}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 border border-black rounded  p-5">
          <form onSubmit={(e) => handleSaveDish(e)}>
            <p>Name</p>
            <input
              type="text"
              className="w-full border-2 px-2 py-1 border-gray-500 outline-none mb-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Price</p>
            <input
              type="number"
              min={10}
              className="w-full border-2 border-gray-500 px-2 py-1 outline-none mb-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p>Category</p>
            <select
              className="w-full border-2 px-2 py-1 border-gray-500 outline-none mb-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="appetizer">Appetizer</option>
              <option value="main-course">Main Course</option>
              <option value="appetizer">Appetizer</option>
              <option value="appetizer">Appetizer</option>
            </select>
            <button type="submit" className=" py-2 my-1 w-full bg-blue-500">
              Save Dish
            </button>
            <button
              onClick={clearForm}
              className=" py-2 my-1 w-full border text-blue-500 border-blue-500"
            >
              Clear{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Menu;
