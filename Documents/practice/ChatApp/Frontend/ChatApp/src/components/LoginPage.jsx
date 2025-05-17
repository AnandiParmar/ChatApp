import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({ socket, setConnected }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/login", data);
    if (res.status == 200) {
      localStorage.setItem("token", res.data["accessToken"]);
      localStorage.setItem("name", res.data.user);
      localStorage.setItem("id", res.data.id);
      navigate("/");
      setConnected(true);
    }
  }

  return (
    <>
      <Card className="w-[550px] mx-auto mt-[15%] h-[40vh]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="mt-10">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="username">UserName</Label>
                <Input
                  id="username"
                  placeholder="Enter username..."
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="framework">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password..."
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleLogin} className="w-[100px]">
            Login
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default LoginPage;
