import React from "react";
import { Card, CardContent } from "../ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const CartItem = ({ cart, handleAddCart, handleMinusCart, handleDeleteCart }) => {
  return (
    <div className="lg:col-span-2 space-y-4">
      {cart.items.map((item) => (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                className="w-20 h-20 rounded-lg object-cover"
                src={item.food_id.image_url}
                alt=""
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {item.food_id.name}
                </h3>
                <p className="text-primary font-bold mt-1">${item.food_id.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button onClick={() => handleMinusCart(item.food_id._id)} className="border border-input bg-transparent text-foreground hover:bg-destructive hover:text-primary-foreground">
                    <Minus size={16} />
                  </Button>
                  <span className="w-9 text-center font-medium">{item.quantity}</span>
                  <Button onClick={() => handleAddCart(item.food_id._id)} className="border border-input bg-transparent text-foreground hover:bg-destructive hover:text-primary-foreground">
                    <Plus size={16} />
                  </Button>
                  <Button onClick={() => handleDeleteCart(item.food_id._id)} className="bg-transparent text-destructive hover:bg-destructive hover:text-primary-foreground ml-auto">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CartItem;
