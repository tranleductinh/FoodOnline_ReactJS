import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
const OrderDetailItem = ({ cart, total, payment, setPayment, handleCreateOrder, loading }) => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-6 soace-y-6">
        <div className="space-y-2 mb-6">
          {cart.items.map((item) => (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.food_id.name} x {item.quantity}
              </span>
              <span>${(item.quantity * item.food_id.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <Label className="font-semibold">Payment Method</Label>
          <RadioGroup value={payment} onValueChange={setPayment} className="gap-3 space-y-2">
            <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="Bank" id="r1" />
              <Label className="text-sm leading-none font-medium">
                Bank Transfer / Card
              </Label>
            </div>
            <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="Cash" id="r2" />
              <Label className=" text-sm leading-none font-medium">
                Cash on Delivery
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Button disabled={loading} onClick={() => handleCreateOrder()} className="w-full text-base py-6">{loading ? "Processing..." : "Create Order"}</Button>
      </CardContent>
    </Card>
  );
};

export default OrderDetailItem;
