'use client';
import React, { useState } from 'react';
import { useEventosContext } from '@/app/provider/providerEventos';
import { useRouter } from 'next/navigation';
import { useUsuarioContext } from '@/app/provider/providerUsuarios';

export default function Page() {
  const { usuarios } = useUsuarioContext(); 
  const { eventos, agregarEvento, eliminarEvento } = useEventosContext();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [estado, setEstado] = useState(true);
  const [comentario, setComentario] = useState("");
  const router = useRouter();

  const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usuarioLogueado = usuarios.values().next().value;

    // Convertir fechas a objetos Date para compararlas
  const inicio = new Date(fechaInicio);
  const final = new Date(fechaFinal);

  // Validar que la fecha de inicio no sea mayor que la fecha final
  if (inicio > final) {
    alert("La fecha de inicio no puede ser mayor que la fecha final.");
    return;
  }
    
    const nuevoEvento = {
      nombre,
      direccion,
      fechaInicio,
      fechaFinal,
      estado,
      comentario,
    };
  
    agregarEvento(nuevoEvento);

    // Limpiar los campos de entrada
    setNombre('');
    setDireccion('');
    setFechaInicio('');
    setFechaFinal('');
    setEstado(true);
    setComentario('');
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Eventos</h2>
      {eventos.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Estado</th>
              <th>Comentario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td>{evento.id}</td>
                <td>{evento.nombre}</td>
                <td>{evento.direccion}</td>
                <td>{new Date(evento.fechaInicio).toLocaleDateString()}</td>
                <td>{new Date(evento.fechaFinal).toLocaleDateString()}</td>
                <td>{evento.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{evento.comentario}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => router.push(`/editarEvento/${evento.id}`)}>Editar</button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => evento.id !== undefined && eliminarEvento(evento.id)}
                  >
                    {/*verifica primero si el evento tiene un id numerico, si lo tiene entocnes && da la pauta de continuar con la funcion*/}
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay eventos disponibles</p>
      )}
      
      <h3>Agregar Nuevo Evento</h3>
      <form onSubmit={manejarSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del evento</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label className="form-label">Dirección del evento</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
          <label className="form-label">Fecha Inicio</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
          <label className="form-label">Fecha Final</label>
          <input
            type="date"
            className="form-control"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
            required
          />
          <label className="form-label">Activo: </label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={estado}
            onChange={(e) => setEstado(e.target.checked)}
          ></input>
          <label className="form-label d-block">Comentario</label>
          <input
            type="text"
            className="form-control"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Guardar Evento
        </button>
      </form>
    </div>
  );
}
