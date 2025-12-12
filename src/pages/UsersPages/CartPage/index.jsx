import CartItem from "@/components/CartItem";
import OrderDetailItem from "@/components/OrderDetailItem";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  deleteAllCart,
  deleteCart,
  getCart,
  minusCart,
} from "@/services/api/cart";
import { addOrder } from "@/services/api/order";
import { ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState("Bank");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      const res = await getCart();
      console.log(res);
      setCart(res.data.data);
      setTotal(
        res.data.data.items.reduce(
          (total, item) => total + item.quantity * item.food_id.price,
          0
        )
      );
      console.log("total", total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const handleAddCart = async (_id) => {
    try {
      const res = await addToCart({ _id });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const handleMinusCart = async (_id) => {
    try {
      const res = await minusCart({ _id });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCart = async (_id) => {
    try {
      const res = await deleteCart(_id);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      const items = [
        ...cart.items.map((item) => ({
          food_id: item.food_id._id,
          quantity: item.quantity,
        })),
      ];
      const data = {
        items,
        payment_method: payment,
        total,
      };
      const res = await addOrder(data);
      
      if (res.status === 201) {
        try {
          await deleteAllCart();
          fetchCart()
          navigate("/orders");
        } catch (error) {
          console.log(error);
        }
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag size={48} className="text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-md">
            Looks like you haven't added any items to your cart yet. Start
            exploring our delicious menu!
          </p>
          <Link to="/menu">
            <Button className="mt-4">Browse Menu</Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          <div className="grid lg:grid-cols-3 gap-6">
            <CartItem
              cart={cart}
              handleAddCart={handleAddCart}
              handleMinusCart={handleMinusCart}
              handleDeleteCart={handleDeleteCart}
            />
            <OrderDetailItem
              cart={cart}
              total={total}
              payment={payment}
              setPayment={setPayment}
              handleCreateOrder={handleCreateOrder}
              loading={loading}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
