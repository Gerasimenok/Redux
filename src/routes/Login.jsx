import React, { useState } from "react";
import { useUser } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5002/users");
    const users = await response.json();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("userId", foundUser.id);
      navigate("/");
    } else {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Вход</h2>
        <form onSubmit={handleLogin}>
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
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white p-2 rounded w-full"
          >
            Войти
          </button>
        </form>
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

export default Login;
