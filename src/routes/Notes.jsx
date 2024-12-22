import React, { useEffect, useState } from "react";
import { useUser  } from "../components/UserContextProvider";
import NoteList from "../components/NoteList";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../components/NoteContextProvider";

const Notes = () => {
  const { user, setUser  } = useUser ();
  const { notes, setNotes } = useNotes();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:5002/notes?authorId=${user.id}`);
        if (!response.ok) {
          throw new Error("Ошибка при загрузке заметок");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [user.id, setNotes]);

  const handleLogout = () => {
    setUser (null);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) {
    return <Loader />;
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
          <a href="/notes" className="text-gray-700 text-lg font-bold">
            Заметки
          </a>
          <button onClick={handleLogout} className="text-gray-700 text-lg">
            Выйти
          </button>
        </nav>
      </header>

      <div className="flex-grow p-8">
         <header className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Ваши заметки</h1>
           <button
             onClick={() => navigate("/create")}
             className="bg-black text-white p-2 rounded hover:bg-gray-800 transition duration-200"
           >
             Создать новую заметку
           </button>
         </header>

        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <p className="text-center text-lg">У вас пока нет заметок.</p>
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

export default Notes;