import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import BadgeStatus from "../BadgeStatus";
import DialogOrderHistory from "../DialogOrderHistory";

const OrderHistoryItem = ({ orders }) => {
  const [orderDetail, setOrderDetail] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (order) => {
    setOrderDetail(order);
    setOpen(!open);
  };
  if(!orders) return null
  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      {order.id}
                    </span>
                    <BadgeStatus row={order.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    January 15, 2024 at 05:30 PM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} item(s) • {order.payment_method}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-primary">
                    ${order.total_amount}
                  </span>
                  <Button
                    onClick={() => handleOpen(order)}
                    className="bg-transparent border border-input text-foreground hover:text-accent-foreground hover:bg-accent px-3 py-0 h-[32px]"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <DialogOrderHistory myOrder={orderDetail} open={open} setOpen={setOpen} />
    </>
  );
};

export default OrderHistoryItem;
