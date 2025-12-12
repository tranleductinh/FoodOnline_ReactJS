import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";
import BadgeStatus from "../BadgeStatus";
const StatusFoodManagement = ({ row, setOrders, setStatus  }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-[128px] border border-input justify-between"
        >
          <BadgeStatus row={row.status} />
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[128px] border border-input rounded-lg bg-white mt-1">
        <DropdownMenuRadioGroup
          value={row.status}
          onValueChange={(value) => {
            setOrders((prev) =>
              prev.map((order) =>
                order._id === row._id ? { ...order, status: value } : order
              )
            );
            setStatus(value);
          }}
        >
          <DropdownMenuRadioItem
            value="pending"
            className={`p-2 rounded-lg hover:bg-accent relative ${
              row.status === "pending" ? "bg-accent" : ""
            }`}
          >
            <BadgeStatus row={"pending"} />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="paid"
            className={`p-2 rounded-lg hover:bg-accent relative ${
              row.status === "paid" ? "bg-accent" : ""
            }`}
          >
            <BadgeStatus row={"paid"} />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="preparing"
            className={`p-2 rounded-lg hover:bg-accent relative ${
              row.status === "preparing" ? "bg-accent" : ""
            }`}
          >
            <BadgeStatus row={"preparing"} />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="shipping"
            className={`p-2 rounded-lg hover:bg-accent relative ${
              row.status === "shipping" ? "bg-accent" : ""
            }`}
          >
            <BadgeStatus row={"shipping"} />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="completed"
            className={`p-2 rounded-lg hover:bg-accent relative ${
              row.status === "completed" ? "bg-accent" : ""
            }`}
          >
            <BadgeStatus row={"completed"} />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="cancelled"
            className={`p-2 rounded-lg hover:bg-accent relative ${
              row.status === "cancelled" ? "bg-accent" : ""
            }`}
          >
            <BadgeStatus row={"cancelled"} />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusFoodManagement;
