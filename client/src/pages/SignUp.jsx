import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OAuth from "../components/OAuth";
import toast from "react-hot-toast";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch("api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          toast.error(data.message)
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(null);
        navigate("/sign-in");
        toast.success("Sing Up successful");
      } catch (error) {
        setLoading(false);
        setError(error.message);
        toast.error(data.message)
      }
    };
  return (
    <div className="p-3 max-w-lg mx-auto mt-20">
    <form onSubmit={handleSubmit}>
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              required
              onChange={handleChange}
            />
          </div>
        
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
            id="password" 
            type="password" 
            placeholder="password"
            onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <OAuth/>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/sign-in"} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </form>
    </div>
    
  )
}
