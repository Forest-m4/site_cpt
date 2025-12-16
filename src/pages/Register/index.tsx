import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/layout/InputField";
import RoleSwitch from "../../components/layout/RoleSwitch";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState<"reader" | "author">("reader");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);

      navigate("/posts", { state: { email, role } });
    } catch {
      alert("Ошибка при регистрации");
    }
  };

  return (
    <div className="w-[416px] h-[486px] mx-auto mt-20 p-4 flex flex-col">
      <Typography variant="h4">Создать аккаунт</Typography>

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
        <InputField
          label="Повторите пароль"
          type="password"
          placeholder="Повторите пароль"
          value={repeatPassword}
          onChange={setRepeatPassword}
        />

        <Typography variant="subtitle-medium" className="mt-2">
          Выберите роль
        </Typography>
        <RoleSwitch value={role} onChange={setRole} />

        <UIButton
          type="submit"
          size="md"
          color="primary"
          fullWidth
          className="mt-4"
        >
          Создать аккаунт
        </UIButton>
      </form>

      <Typography variant="body" className="mt-4">
        Уже есть аккаунт?{" "}
        <Link to="/login" className="text-accent">
          Войти
        </Link>
      </Typography>
    </div>
  );
};

export default Register;
