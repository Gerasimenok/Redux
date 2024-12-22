import React from "react";
import { useNotes } from "./NoteContextProvider";
import { useNavigate } from "react-router-dom";

const NoteList = () => {
  const { notes, setNotes } = useNotes();
  const navigate = useNavigate();

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5002/notes/${id}`, {
      method: "DELETE",
    });
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleNoteClick = (id) => {
    navigate(`/note/${id}`);
  };

  const sortedNotes = [...notes].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      {sortedNotes.length === 0 ? (
        <p>У вас нет заметок.</p>
      ) : (
        sortedNotes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div
              onClick={() => handleNoteClick(note.id)}
              className="cursor-pointer"
            >
              <h2 className="text-blue-500">{note.title}</h2>
              <p>{new Date(note.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <a href={`/edit/${note.id}`} className="text-blue-500">
                ✍️
              </a>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500"
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
