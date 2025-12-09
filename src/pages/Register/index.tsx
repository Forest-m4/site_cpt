import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/layout/InputField";
import RoleSwitch from "../../components/layout/RoleSwitch";
import DarkButton from "../../components/layout/DarkButton";
import Typography from "../../components/ui/Typography";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState<"reader" | "author">("reader");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) return alert("Пароли не совпадают");
    console.log({ email, password, role });
  };

  return (
    <div className="w-[416px] h-[486px] mx-auto mt-20 p-4 flex flex-col">
      {/* Заголовок */}
      <Typography variant="h4" color="primary">
        Создать аккаунт
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

        <InputField
          label="Повторите пароль"
          type="password"
          placeholder="Повторите пароль"
          value={repeatPassword}
          onChange={setRepeatPassword}
        />

        <Typography variant="subtitle-medium" color="primary" className="mt-2">
          Выберите роль
        </Typography>

        <RoleSwitch value={role} onChange={setRole} />

        <DarkButton type="submit" className="mt-4">
          <Typography variant="subtitle-medium" color="white">
            Создать аккаунт
          </Typography>
        </DarkButton>
      </form>

      <Typography variant="body" color="primary" className="mt-4 ">
        Уже есть аккаунт?{" "}
        <Link to="/login" className="text-accent">
          Войти
        </Link>
      </Typography>
    </div>
  );
};

export default Register;
