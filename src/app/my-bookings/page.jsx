// "use client";
import MyAllBookings from "@/components/tables/MyBookingsTable";
import { headers } from "next/headers";
// import React, { useEffect, useState } from "react";

const fetchMyBookings = async () => {
  const res = await fetch("http://localhost:3000/api/service", {
    headers: new Headers(await headers()),
  });
  const d = await res.json();
  // setData(d);
  return d;
};

export default async function MyBookingPage() {
  const data = await fetchMyBookings();
  // const [data, setData] = useState([]);
  // useEffect(() => {

  //   fetchMyBookings()
  // }, []);
  return (
    <div>
      <MyAllBookings data={data} />
    </div>
  );
}
