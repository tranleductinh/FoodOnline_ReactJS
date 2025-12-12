import OrderHistoryItem from "@/components/OrderHistoryItem";
import { getOrderById } from "@/services/api/order";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const res = await getOrderById();
      setOrders(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <OrderHistoryItem orders={orders} />
    </>
  );
};

export default OrderPage;
