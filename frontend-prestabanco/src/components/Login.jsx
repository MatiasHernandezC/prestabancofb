import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(email, password);
      const userData = response.data; // Suponiendo que la respuesta tiene la información del usuario
      onLogin(userData); // Llama a la función onLogin con los datos del usuario
      navigate("/home");
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;