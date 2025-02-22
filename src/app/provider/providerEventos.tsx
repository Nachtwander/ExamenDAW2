"use client";
import { Evento } from "../models/Evento";
import { EventosContext } from "../context/eventosContext";
import { useContext, useEffect, useState } from "react";

interface VistaReact {
  children: React.ReactNode;
}

export const EventosProvider = ({ children }: VistaReact) => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  //cuando recargue la pagina se ejecuta la funcion para obtener los eventos
  useEffect(() => {
    cargarEventos();
  }, []);

  async function cargarEventos() {
    try {
      const res = await fetch("http://localhost:5000/evento"); //response espera fetch
      const data = await res.json(); //data espera response y la conversion a json
      setEventos(data); //usuarios recibe la data
      console.log(data);
    } catch (error) {
      alert("Ocurrio un error en la peticion" + error); //si ocurre un error
    }
  }

  async function agregarEvento(evento: Evento) {
    try {
      const res = await fetch("http://localhost:5000/evento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evento),
      });
      if (!res) {
        alert("Ocurrio un error");
        return;
      }
      cargarEventos();
      alert("Evento Agregado exitosamente");
    } catch (error) {
      alert("Ocurrio un error en la peticion" + error);
    }
  }

  async function eliminarEvento(id: number) {
    try {
      const res = await fetch("http://localhost:5000/evento/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) {
        alert("Ocurrio un error");
        return;
      }
      cargarEventos();
      alert("Evento eliminado exitosamente");
    } catch (error) {
      alert("Ocurrio un error en la peticion" + error);
    }
  }

  async function actualizarEvento(evento: Evento) {
    try {
      const res = await fetch("http://localhost:5000/evento/" + evento.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evento),
      });
      if (!res) {
        alert("Ocurrio un error");
        return;
      }
      cargarEventos();
      alert("Evento Actualizado exitosamente");
    } catch (error) {
      alert("Ocurrio un error en la peticion" + error);
    }
  }

  return (
    <EventosContext.Provider
      value={{
        eventos,
        setEventos,
        agregarEvento,
        eliminarEvento,
        actualizarEvento,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
};

//exportamos el contexto para que lo usemos en otros componentes
export function useEventosContext() {
  return useContext(EventosContext); //retorna el uso de contexto de UsuariosContext
}
