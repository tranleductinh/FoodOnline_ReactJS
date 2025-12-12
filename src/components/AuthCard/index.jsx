import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Users, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";

const AuthCard = ({
  loading,
  handle,
  handleLoginAdmin,
  setEmail,
  setPassword,
  email,
  password,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="w-full max-w-md relative z-10 shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg bg-primary ">
          <UtensilsCrossed size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center">Food Order System</h1>
          <p className="text-muted-foreground mt-1 text-center">
            Delicious meals delivered to your door
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 space-y-4 pt-6">
        <Button
          onClick={() => handle()}
          className="w-full text-base h-12 bg-transparent text-card-foreground border-2 rounded-md shadow-xs hover:text-accent-foreground hover:bg-secondary"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            ></path>
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            ></path>
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            ></path>
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            ></path>
          </svg>
          Sign in with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="border-t w-full"></span>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>
        </div>
        <Button
          onClick={() => setOpen(!open)}
          className="w-full text-base h-12 bg-secondary text-card-foreground rounded-md hover:bg-secondary/80"
        >
          <Users />
          Sign in as Admin
        </Button>
        <Card
          className={`duration-300 ease-in-out ${
            open ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="email"> Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email"> Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <Button
              disabled={loading}
              onClick={() => handleLoginAdmin()}
              className="mt-4 w-full"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-xs text-muted-foreground text-center">
          By logging in, you agree to our{" "}
          <Link
            to="#"
            className="underline hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="#"
            className="underline hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
