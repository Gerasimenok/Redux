import React, { useContext } from "react";
import { useUser } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex justify-between p-6 border-b border-gray-300">
        <div className="text-gray-700 text-lg">
          Добро пожаловать, {user?.email}
        </div>
        <nav className="flex space-x-6">
          <a href="/" className="text-gray-700 text-lg font-bold">
            Главная
          </a>
          <a href="/notes" className="text-gray-700 text-lg">
            Заметки
          </a>
          <button onClick={handleLogout} className="text-gray-700 text-lg">
            Выйти
          </button>
        </nav>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="p-8 rounded shadow-md text-center">
          <p className="mb-6 text-xl">Email: {user?.email}</p>
          <p className="mb-6 text-xl">
            Дата регистрации:{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Дата недоступна"}
          </p>
          <button
            onClick={() => navigate("/notes")}
            className="bg-black text-white text-lg p-3 rounded hover:bg-gray-800 transition duration-200"
          >
            Перейти к заметкам
          </button>
        </div>
      </div>
      <footer className="mt-8 w-full border-t border-gray-300 pt-4">
        <div className="flex justify-between px-6 text-lg">
          <span>Created by: Violetta Gerasimenok</span>
          <span>BSU: 2024</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
