import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";
import React from "react";

const DialogOrderHistory = ({ myOrder, open, setOpen }) => {
  console.log("myorder", myOrder);
  if (!myOrder || !myOrder.items) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="text-lg leading-none font-semibold">
          Order {myOrder.id}
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            {myOrder.items.map((item) => (
              <div className="flex justify-between py-2 border-b last:border-0">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    x {item.quantity}
                  </span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">${myOrder.total_amount}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOrderHistory;
