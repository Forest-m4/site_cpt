import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Добро пожаловать!</h1>
      <p className="text-lg mb-8">Это главная страница приложения</p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Войти
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
