import dbConnect from "@/middleware/mongo";
import Bill from "@/models/Bill";
import React from "react";

const Bills = ({ bills }) => {
  return (
    <>
      <div className=" max-w-6xl gap-5 m-auto py-10 ">
        <h2>All Bills</h2>
        <br />
        <div className="">
          <div className="flex gap-5">
            <p>Bill no</p>
            <p>Total</p>
          </div>
          {bills.map((bill, i) => (
            <div key={bill._id} className=" flex gap-5">
              <p>{i}</p>
              <p>{bill.total}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bills;

export const getServerSideProps = async () => {
  await dbConnect();

  const bills = await Bill.find().sort({ _id: -1 });
  const data = JSON.parse(JSON.stringify(bills));
  console.log(bills);
  return {
    props: {
      bills: data,
    },
  };
};
