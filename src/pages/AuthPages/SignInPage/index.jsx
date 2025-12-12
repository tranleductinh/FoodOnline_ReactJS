import React, { useContext, useState } from "react";
import AuthCard from "@/components/AuthCard";
import { signInWithPopup } from "firebase/auth";
import { googleLogin } from "@/services/api/auth";
import { auth, googleProvider } from "@/firebase";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/authContext";
import toast from "react-hot-toast";
const SignInPage = () => {
  const navigate = useNavigate();
  const {  setUser, signInUser } = useContext(AuthContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const res = await googleLogin(idToken);
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/menu");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đăng nhập thất bại!");
    }
  };
  const handleLoginAdmin = async () => {
    try {
      setLoading(true);
      console.log("email",email)
      const res = await signInUser({ email:email.trim(), password:password.trim() });
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://fe-order-food.vercel.app/delicious-food-spread-restaurant.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <AuthCard loading={loading} handle={handleLogin} handleLoginAdmin={handleLoginAdmin} setEmail={setEmail} setPassword={setPassword}/>
    </div>
  );
};

export default SignInPage;
