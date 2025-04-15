import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
    onLoginSuccess: () => void;
}

export const Login = ({ onLoginSuccess }: Props) => {
    const [id, setId] = useState("aaaa");
  const [pw, setPw] = useState("1234");

  const handleLogin = () => {
    if (id === "aaaa" && pw === "1234") {
      onLoginSuccess()
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl bg-white/80 backdrop-blur">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">ログイン</h2>
          <Input
            placeholder="ユーザーID"
            className="bg-white border border-gray-300 rounded-md"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            placeholder="パスワード"
            type="password"
            className="bg-white border border-gray-300 rounded-md"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <Button className="w-full" onClick={handleLogin}>
            ログイン
          </Button>
        </CardContent>
      </Card>
    </div>
  )
};
