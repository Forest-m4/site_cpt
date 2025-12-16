import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/layout/InputField";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Введите email и пароль");
      return;
    }

    try {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", "reader");

      navigate("/posts", { state: { email, role: "reader" } });
    } catch {
      alert("Ошибка при входе");
    }
  };

  return (
    <div className="w-[416px] h-[320px] mx-auto mt-20 p-4 flex flex-col">
      <Typography variant="h4">Войти</Typography>

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

        <UIButton
          type="submit"
          size="md"
          color="primary"
          fullWidth
          className="mt-4"
        >
          Войти
        </UIButton>
      </form>

      <Typography variant="body" className="mt-4">
        Нет аккаунта?{" "}
        <Link to="/register" className="text-accent">
          Создать аккаунт
        </Link>
      </Typography>
    </div>
  );
};

export default Login;
