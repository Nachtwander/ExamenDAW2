'use client';
import React, { useState, useEffect } from 'react';
import { useEventosContext } from '@/app/provider/providerEventos';
import { useParams} from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function EditarEvento() {
  const { eventos, actualizarEvento } = useEventosContext();
  const { id } = useParams();
  const router = useRouter();

  const evento = eventos.find((e) => e.id == Number(id));

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [estado, setEstado] = useState(true);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    if (evento) {
      setNombre(evento.nombre);
      setDireccion(evento.direccion);
      setFechaInicio(evento.fechaInicio);
      setFechaFinal(evento.fechaFinal);
      setEstado(evento.estado);
      setComentario(evento.comentario);
    }
  }, [evento]);

  const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inicio = new Date(fechaInicio);
    const final = new Date(fechaFinal);

    if (inicio > final) {
      alert("La fecha de inicio no puede ser mayor que la fecha final.");
      return;
    }

    const eventoActualizado = {
      id: Number(id),
      nombre,
      direccion,
      fechaInicio,
      fechaFinal,
      estado,
      comentario,
    };

    actualizarEvento(eventoActualizado);
    //window.location.href = "/eventos"; // Redirige a la lista de eventos

    router.replace('/eventos')
  };

  return (
    <div className="container mt-4">
      <h2>Editar Evento</h2>
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

