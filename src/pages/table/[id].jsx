import Dish from "@/components/Dish";
import Navbar from "@/components/Navbar";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TableDetails = () => {
  const [dishes, setDishes] = useState([]);
  const [bill, setBill] = useState(null);
  const [creating, setCreating] = useState(false);

  const router = useRouter();

  const getDishes = async () => {
    try {
      const url = `${BASE_URL}/api/menu`;
      const res = await axios.get(url);
      setDishes(res.data.dish);
    } catch (error) {
      console.log(error);
    }
  };

  const getBill = async () => {
    try {
      const url = `${BASE_URL}/api/bill/${router.query.id}`;
      const res = await axios.get(url);

      console.log(res.data);
      setBill(res.data.bill);
    } catch (error) {
      console.log(error);
    }
  };

  const startBill = async () => {
    console.log(router.query.id);
    if (creating) return;
    try {
      setCreating(true);
      const url = `${BASE_URL}/api/bill`;
      const res = await axios.post(url, {
        table: router.query.id,
      });
      console.log(res.data);
      setBill(res.data.bill);
    } catch (error) {
      console.log(error);
    }
    setCreating(false);
  };

  const addDish = async (dishId, price, dishName, quantity) => {
    try {
      const url = `${BASE_URL}/api/bill/${bill?._id}`;
      console.log(url);
      const res = await axios.post(url, {
        dish: dishId,
        dishName,
        quantity,
        price,
      });
      getBill();
    } catch (error) {
      console.log(error);
    }
  };

  const payBill = async () => {
    try {
      const url = `${BASE_URL}/api/bill/${bill?._id}`;
      console.log(url);
      const res = await axios.put(url, {});
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    setTimeout(() => {
      getDishes();
      getBill();
    }, 1000);
  }, [router]);

  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-semibold text-center">
        Table No {router.query.id}
      </h2>

      {!bill && (
        <div className=" flex gap-5 justify-center">
          <button onClick={startBill} className="bg-blue-500">
            Start New Bill
          </button>
        </div>
      )}

      <div className="flex max-w-6xl gap-5 m-auto py-10 ">
        <div className="w-1/2 p-5">
          <input
            type="text"
            placeholder="Search Dish"
            className="w-full border outline-none p-2 rounded"
            name=""
            id=""
          />

          <div className="flex flex-wrap border-b-2 gap-3 py-5">
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-100 ">
              Appetizer
            </p>
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-200 ">
              Main Course
            </p>
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-200 ">
              Roti
            </p>
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-200 ">
              Biryani
            </p>
            <p className="border px-3 cursor-pointer rounded-full border-blue-500 bg-blue-200 ">
              Dessert
            </p>
          </div>

          <div className="dishlist my-5">
            {dishes.map((dish) => (
              <Dish
                key={dish._id}
                name={dish.name}
                price={dish.price}
                dishId={dish._id}
                addDish={addDish}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 bg-blue-50 p-5">
          <h3>Bill</h3>

          {bill &&
            bill.dishes.map((dish) => (
              <div key={dish._id} className="flex justify-between ">
                <p className="font-semibold">{dish.dishName}</p>
                <p className="font-semibold">{dish.quantity}</p>
                <p className="font-semibold">{dish.price * dish.quantity}</p>
              </div>
            ))}
          <br />
          <div className="flex justify-between ">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">{bill?.total}</p>
          </div>
          <br />
          <button onClick={payBill} className="bg-blue-500 float-right">
            {" "}
            Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default TableDetails;
