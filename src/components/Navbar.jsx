import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className=" flex p-10 justify-between px-20 ">
      <div className="text-2xl font-semibold">The Lalit</div>
      <div className="flex gap-10 text-lg ">
        <Link href={"/menu"}>
          <p className="font-semibold text-black">Menu</p>
        </Link>
        <Link href={"/bills"}>
          <p className="font-semibold text-black">Bills</p>
        </Link>
        <p className="font-semibold text-black">Logout</p>
      </div>
    </nav>
  );
};

export default Navbar;
