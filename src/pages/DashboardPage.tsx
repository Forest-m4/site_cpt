import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Панель управления</h1>
          <div className="flex items-center space-x-4">
            <span>Привет, {user?.name}!</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Выйти
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Информация о пользователе</h2>
          <div className="space-y-2">
            <p>
              <strong>ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Имя:</strong> {user?.name}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
