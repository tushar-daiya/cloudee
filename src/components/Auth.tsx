"use client";

import React from "react";
import { Button } from "./ui/button";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Auth() {
  const [isSignIn, setIsSignIn] = React.useState(true);
  return (
    <div className="lg:w-1/2 w-full h-full">
      <div className="max-w-xl w-full mx-auto flex flex-col justify-center h-full">
        <div className="flex gap-4 my-10 w-full">
          <Button
            variant={isSignIn ? "default" : "outline"}
            className="w-full h-10"
            onClick={() => {
              setIsSignIn(true);
            }}
          >
            Sign In
          </Button>
          <Button
            variant={!isSignIn ? "default" : "outline"}
            className="w-full h-10"
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </Button>
        </div>
        {isSignIn ? <Signin /> : <Signup />}
      </div>
    </div>
  );
}
