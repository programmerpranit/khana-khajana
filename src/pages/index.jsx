import Navbar from "@/components/Navbar";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [bills, setBills] = useState([]);
  const [unpaidBills, setUnpaidBills] = useState([]);

  const getUnpaidBills = async () => {
    try {
      const url = `${BASE_URL}/api/bill/unpaid`;
      const res = await axios.get(url);
      console.log(res.data);
      setBills(res.data.bill);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const arr = [];
    bills.forEach((bill) => {
      arr.push(bill.table);
    });
    setUnpaidBills(arr);
  }, [bills]);

  useEffect(() => {
    getUnpaidBills();
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-semibold text-center">Tables</h2>

      <div className="flex flex-wrap justify-center max-w-6xl gap-10 m-auto py-10">
        <Table tableNo={1} status={unpaidBills.includes(1)} />
        <Table tableNo={2} status={unpaidBills.includes(2)} />
        <Table tableNo={3} status={unpaidBills.includes(3)} />
        <Table tableNo={4} status={unpaidBills.includes(4)} />
        <Table tableNo={5} status={unpaidBills.includes(5)} />
        <Table tableNo={6} status={unpaidBills.includes(6)} />
      </div>
    </>
  );
}

const Table = ({ tableNo, status, id }) => {
  return (
    <Link href={`/table/${tableNo}`}>
      <div
        className={`border-2 border-black rounded  w-52 h-52 flex justify-center items-center ${
          status ? "bg-green-200" : ""
        } `}
      >
        <p className="text-lg text-black">{tableNo}</p>
      </div>
    </Link>
  );
};
