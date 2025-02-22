'use client';
import { useState } from "react";
import { useUsuarioContext } from "./provider/providerUsuarios";


export default function Login() {
  const [nombre , setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { usuarios } = useUsuarioContext(); // Obtener los usuarios del contexto

  const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Buscar usuario con el correo y password ingresados
    const usuarioEncontrado = usuarios.find((usuario) => usuario.nombre === nombre && usuario.contraseña === contraseña);

    if (usuarioEncontrado) {
      alert('Inicio de sesión exitoso'); 
      //redirigir al usuario
      window.location.href = "/eventos"
    } else {
      alert('nombre o contraseña incorrectos');
    }
    //limpiar los campos de entrada
    setNombre('');
    setContraseña('');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "300px" }}>
        <h3 className="text-center">Login</h3>
        <form onSubmit={manejarSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
