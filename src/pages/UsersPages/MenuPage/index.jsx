import MenuFoodCard from "@/components/MenuFoodCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addToCart } from "@/services/api/cart";
import { getAllFoods } from "@/services/api/food";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [food, setFood] = useState([]);
  const [foodFilter, setFoodFilter] = useState([]);
  const [search, setSearch] = useState("");
  const fetchFoods = async () => {
    try {
      const res = await getAllFoods();
      setFood(res.data.data);
      setFoodFilter(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFoods();
  }, []);
  const handleAddCart = async (_id) => {
    try {
      const res = await addToCart({ _id });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            onChange={(e) =>
              setFoodFilter(
                food.filter((item) =>
                  item.name.toLowerCase().includes(e.target.value.toLowerCase())
                )
              )
            }
            placeholder="Search for food..."
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {setFoodFilter(food); setSearch("")}}
            className={`hover:bg-accent hover:text-accent-foreground rounded-full border border-input text-foreground px-3 ${search === "" ? "bg-primary text-primary-foreground" : "bg-transparent"}`}
          >
            All
          </Button>
          {[...new Set(food.map((item) => item.category))].map((category) => (
            <Button
              onClick={() => {
                setFoodFilter(
                  food.filter((item) => item.category === category)
                );
                setSearch(category);
              }}
              className={`hover:bg-accent hover:text-accent-foreground rounded-full border border-input text-foreground px-3 ${search === category ? "bg-primary text-primary-foreground" : "bg-transparent"}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <MenuFoodCard food={foodFilter} handleAddCart={handleAddCart} />
    </>
  );
};

export default MenuPage;
