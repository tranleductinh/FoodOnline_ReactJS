import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Heart, Plus } from "lucide-react";
const MenuFoodCard = ({ food, handleAddCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {food.map((item) => (
        <Card className="group shadow-md hover:shadow-xl">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={item.image_url}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`${item.is_available ? "hidden" : "absolute inset-0 bg-background/80 flex items-center justify-center"}`}>
              <span className="text-muted-foreground font-medium">Unavailable</span>
            </div>
            <Button className="bg-background/80 rounded-md size-9 absolute top-2 right-2 text-foreground hover:bg-background">
              <Heart size={20} />
            </Button>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground line-clamp-1">
                {item.name}
              </h3>
              <span className="text-primary font-bold whitespace-nowrap">
                ${item.price}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {item.description}
            </p>
            <Button onClick={() => handleAddCart(item._id)} className="w-full" disabled={!item.is_available}>
              <Plus size={16} />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuFoodCard;
