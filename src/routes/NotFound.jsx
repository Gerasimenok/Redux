import React from "react";
import { useUser } from "../components/UserContextProvider";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold">404 - Страница не найдена</h1>
        <p className="mt-4">Извините, такой страницы не существует.</p>
        {user ? (
          <Link to="/" className="mt-4 text-blue-500 hover:underline">
            Вернуться на главную страницу
          </Link>
        ) : (
          <Link to="/login" className="mt-4 text-blue-500 hover:underline">
            Войти
          </Link>
        )}
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

export default NotFound;
