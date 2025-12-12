import { getMe, logOut, signIn } from "@/services/api/auth";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();
  const signInUser = async (payload) => {
    try {
      const user = await signIn(payload);
      console.log("user",user)
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      try {
        if (user.status === 200) {
          const me = await getMe();
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user.data.data, ...me.data })
          );
          setUser({ ...user.data.data, ...me.data });
        }
      } catch (err) {
        console.error(err);
      }
      toast.success("Sign in successfully");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  const logOutContext = async () => {
    await logOut();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
    return (
        <AuthContext.Provider value={{user, setUser, signInUser, logOutContext}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext