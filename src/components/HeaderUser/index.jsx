import {
  ClipboardList,
  LogOut,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getCart } from "@/services/api/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { io } from 'socket.io-client';
import AuthContext from "@/contexts/authContext";

const HeaderUser = () => {
  const { user, logOutContext } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const fetchCart = async () => {
    try {
      const res = await getCart();
      console.log(res);
      setTotal(
        res.data.data.items.reduce((sum, item) => sum + item.quantity, 0)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("data socket",(data) => {
      console.log("Data soket",data)
      fetchCart();
    })
    return () => {
      socket.disconnect();
    };
  },[])
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link to="/menu" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <UtensilsCrossed size={20} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">
            FoodOrder
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/orders">
            <Button className="bg-transparent text-foreground hover:bg-destructive hover:text-primary-foreground">
              <ClipboardList size={16} />
              My Orders
            </Button>
          </Link>
          <Link to="/cart">
            <Button className="relative bg-transparent text-foreground hover:bg-destructive hover:text-primary-foreground w-9 ">
              <ShoppingCart size={16} />
              <span
                className={`${
                  total === 0
                    ? "hidden"
                    : "absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                }`}
              >
                {total}
              </span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=" bg-transparent rounded-full p-0 hover:bg-transparent">
                <Avatar>
                  <AvatarImage
                    src={user.user.avatar}
                    alt="@shadcn"
                    className="size-8 h-9 w-9 rounded-full overflow-hidden"
                  />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarImage
                    src={user.user.avatar}
                    alt="@shadcn"
                    className="size-8 h-9 w-9 rounded-full overflow-hidden"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div class="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user.user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logOutContext()} className="text-destructive text-sm flex items-center px-2 py-1.5 cursor-pointer">
                <LogOut size={16} className="mr-2 text-muted-foreground" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default HeaderUser;
