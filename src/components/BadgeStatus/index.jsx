import { Badge } from "../ui/badge";
import React from "react";

const BadgeStatus = ({ row }) => {
  return (
    <Badge
      className={`${
        row === "pending"
          ? "text-yellow-800 bg-yellow-100 border-yellow-200"
          : row === "paid"
          ? "text-blue-800 bg-blue-100 border-blue-200"
          : row === "preparing"
          ? "text-orange-800 bg-orange-100 border-orange-200"
          : row === "shipping"
          ? "text-purple-800 bg-purple-100 border-purple-200"
          : row === "completed"
          ? "text-green-800 bg-green-100 border-green-200"
          : "text-red-800 bg-red-100 border-red-200"
      }`}
    >
      {row === "pending"
        ? "Pending"
        : row === "paid"
        ? "Paid"
        : row === "preparing"
        ? "Preparing"
        : row === "shipping"
        ? "Shipping"
        : row === "completed"
        ? "Completed"
        : "Cancelled"}
    </Badge>
  );
};

export default BadgeStatus;
