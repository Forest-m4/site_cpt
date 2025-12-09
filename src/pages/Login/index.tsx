import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/layout/InputField";
import DarkButton from "../../components/layout/DarkButton";
import Typography from "../../components/ui/Typography";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="w-[416px] h-[320px] mx-auto mt-20 p-4 flex flex-col">
      {/* Заголовок */}
      <Typography variant="h4" color="primary">
        Войти
      </Typography>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <InputField
          label="Почта"
          placeholder="Введите почту"
          value={email}
          onChange={setEmail}
        />

        <InputField
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={setPassword}
        />

        <DarkButton type="submit" className="mt-4">
          <Typography variant="subtitle-medium" color="white">
            Войти
          </Typography>
        </DarkButton>
      </form>

      <Typography variant="body" color="primary" className="mt-4">
        Нет аккаунта?{" "}
        <Link to="/register" className="text-accent">
          Создать аккаунт
        </Link>
      </Typography>
    </div>
  );
};

export default Login;
