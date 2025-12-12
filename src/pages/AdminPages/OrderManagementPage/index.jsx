import ManagementTable from "@/components/ManagementTable";
import StatusFoodManagement from "@/components/StatusFoodManagement";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { changeStatus, getAllOrders } from "@/services/api/order";

import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState({});
  const [status, setStatus] = useState("");
  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data);
      console.log("order",res.data)
      const map = {};
      res.data.forEach((order) => {
        map[order._id] = order.status;
      });
      setShow(map);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const handleChangeStatus = async (_id, status) => {
    try {
      const res = await changeStatus(_id, { status });
      toast.success("Change status successfully!");
      fetchOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const [orderManagement, setOrderManagement] = useState([
    {
      title: "Order ID",
      render: (row) => `${row.id}`,
      className: "font-mono text-sm",
    },
    {
      title: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium">{row.user_id.name}</p>
          <p className="text-xs text-muted-foreground">{row.user_id.email}</p>
        </div>
      ),
    },
    {
      title: "Items",
      render: (row) => row.items.map((item) => item.name).join(", "),
      classNameTitle: "hidden md:table-cell",
      className: "text-sm text-muted-foreground",
    },
    {
      title: "Total",
      render: (row) => `$${row.total_amount}`,
      className: "font-semibold text-primary",
    },
    {
      title: "Payment",
      render: (row) => (
        <Badge className="bg-transparent text-black border border-input">
          {row.payment_method}
        </Badge>
      ),
      classNameTitle: "hidden sm:table-cell",
    },
    {
      title: "Status",
      render: (row) => <StatusFoodManagement row={row} setOrders={setOrders} setStatus={setStatus}/>,
      classNameTitle: "hidden sm:table-cell",
    },
    {
      title: "Actions",
      render: (row, show, status) => {
        console.log("row.status", row.status, "original", show[row._id]);
        return (
          <Button
            disabled={row.status === show[row._id]}
            className={`${
              row.status !== show[row._id]
                ? "bg-primary text-white"
                : "bg-background text-muted-foreground"
            } border border-input `}
            onClick={() => handleChangeStatus(row._id, status)}
          >
            <Check />
            Save
          </Button>
        );
      },
      classNameTitle: "w-24",
    },
  ]);

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage and update customer orders
        </p>
      </div>
      <ManagementTable columns={orderManagement} rows={orders} show={show} status={status}/>
     
    </div>
  );
};

export default OrderManagementPage;
