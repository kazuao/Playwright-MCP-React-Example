import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Errors = {
  id?: string;
  password?: string;
  email?: string;
  tel?: string;
};

export const ValidationForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const errs: Errors = {};
    if (!id.trim()) errs.id = "IDを入力してください";
    if (!password) {
      errs.password = "パスワードを入力してください";
    } else if (password.length < 6) {
      errs.password = "パスワードは6文字以上で入力してください";
    }
    if (!email) {
      errs.email = "メールアドレスを入力してください";
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      errs.email = "有効なメールアドレスを入力してください";
    }
    if (tel && !/^\d{10,11}$/.test(tel)) {
      errs.tel = "有効な電話番号を入力してください";
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      alert("送信完了！");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold">バリデーション付きフォーム</h2>

      <div>
        <Input
          data-testid="user-id-input"
          placeholder="ユーザーID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {errors.id && (
          <p data-testid="error-message" className="text-red-600 text-sm mt-1">{errors.id}</p>
        )}
      </div>

      <div>
        <Input
          data-testid="password-input"
          placeholder="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p data-testid="error-message" className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <Input
          data-testid="email-input"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p data-testid="error-message" className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          data-testid="tel-input"
          placeholder="電話番号（例: 09012345678）"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        {errors.tel && (
          <p data-testid="error-message" className="text-red-600 text-sm mt-1">{errors.tel}</p>
        )}
      </div>

      <Button type="submit" className="w-full">送信</Button>

      {submitted && Object.keys(errors).length === 0 && (
        <p className="text-green-600 text-sm mt-2">バリデーション成功！</p>
      )}
    </form>
  );
};
