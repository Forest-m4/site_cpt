import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      id: "1",
      email: email,
      name: "Тестовый пользователь",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Вход в систему</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* Добавьте htmlFor и id */}
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="test@example.com"
              required
            />
          </div>
          <div>
            {/* Добавьте htmlFor и id */}
            <label htmlFor="password" className="block mb-1">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Любой пароль"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Войти
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Для демо используйте любой email и пароль
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
