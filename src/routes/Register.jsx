import React, { useState } from "react";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email("Некорректный email"),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      schema.parse({ email, password, confirmPassword });
      const newUser = { email, password, createdAt: Date.now() };
      await fetch("http://localhost:5002/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      window.location.href = "/login";
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Подтверждение пароля"
          required
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleRegister}
          className="bg-black text-white p-2 rounded w-full"
        >
          Зарегистрироваться
        </button>
      </div>
      <footer className="mt-6 w-full border-t border-gray-300 pt-2">
        <div className="flex justify-between px-4">
          <span>Created by: Violetta Gerasimenok</span>
          <span>BSU: 2024</span>
        </div>
      </footer>
    </div>
  );
};

export default Register;
