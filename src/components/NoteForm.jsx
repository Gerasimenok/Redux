import React, { useState } from "react";

const NoteForm = ({ onSubmit, note }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [body, setBody] = useState(note ? note.body : "");
  const [errors, setErrors] = useState({ title: "", body: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { title: "", body: "" };

    if (!title) {
      newErrors.title = "Название заметки не может быть пустым.";
    }

    setErrors(newErrors);

    if (!newErrors.title) {
      onSubmit({ title, body });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold">
          Название заметки
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название заметки"
          className="border border-gray-300 p-2 rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="body" className="font-semibold">
          Тело заметки
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Введите тело заметки"
          className="border border-gray-300 p-2 rounded"
        />
        {errors.body && <p className="text-red-500">{errors.body}</p>}
      </div>
      <button type="submit" className="bg-black text-white p-2 rounded">
        {note ? "Сохранить" : "Создать"}
      </button>
    </form>
  );
};

export default NoteForm;
