import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser  } from "../components/UserContextProvider";
import Loader from "../components/Loader"; // Импортируем Loader

const NoteView = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const { user, setUser  } = useUser ();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5002/notes/${id}`);
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error(error);
 } finally {
        setLoading(false); // Устанавливаем состояние загрузки в false
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5002/notes/${id}`, {
      method: "DELETE",
    });
    navigate("/notes");
  };

  const handleLogout = () => {
    setUser (null);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) {
    return <Loader />; // Показываем лоадер, пока данные загружаются
  }

  if (!note) return <div>Загрузка...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex justify-between p-6 border-b border-gray-300">
        <h1 className="text-gray-700 text-lg">Просмотр заметки</h1>
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

      <div className="flex-grow p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
          <p className="mb-4">{note.body}</p>
          <p className="text-gray-600 mb-4">
            Создано: {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
            >
              🗑️ Удалить
            </button>
            <a
              href={`/edit/${note.id}`}
              className="bg-black text-white p-2 rounded hover:bg-gray-700 transition duration-200"
            >
              ✍️ Редактировать
            </a>
            <a href="/notes" className="text-black hover:underline">
              Назад
            </a>
          </div>
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

export default NoteView;