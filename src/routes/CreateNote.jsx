import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import { useUser  } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Импортируем Loader

const CreateNote = () => {
  const { user, setUser  } = useUser (); // Добавляем setUser  для выхода
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Состояние загрузки

  const handleSubmit = async (noteData) => {
    setLoading(true); // Устанавливаем состояние загрузки в true
    try {
      await fetch("http://localhost:5002/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...noteData,
          authorId: user.id,
          createdAt: Date.now(),
        }),
      });
      navigate("/notes");
    } catch (error) {
      console.error("Ошибка при создании заметки:", error);
    } finally {
      setLoading(false); // Устанавливаем состояние загрузки в false
    }
  };

  const handleLogout = () => {
    setUser (null);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) {
    return <Loader />; // Показываем лоадер, пока данные загружаются
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex justify-between p-6 border-b border-gray-300">
        <div className="text-gray-700 text-lg">
          Добро пожаловать, {user?.email}
        </div>
        <nav className="flex space-x-6">
          <a href="/" className="text-gray-700 text-lg">
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

      <div className="flex-grow p-8 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/notes")}
            className="bg-black text-white p-2 rounded hover:bg-gray-300 transition duration-200 mr-2"
          >
            Назад
          </button>
          <h1 className="text-2xl font-bold">Создать новую заметку</h1>
        </div>

        <div className="w-full max-w-md">
          <NoteForm onSubmit={handleSubmit} />
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

export default CreateNote;