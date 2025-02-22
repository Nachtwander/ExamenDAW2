'use client';
import { createContext } from "react";
import { Evento } from "../models/Evento";

export const EventosContext = createContext({
    eventos: [] as Evento[],//array para almacenar los eventos
    setEventos: (eventos: Evento[]) => {},//funcion para actualizar el array de Eventos
    agregarEvento: (evento: Evento) => {},//funcion para agregar un evento
    eliminarEvento: (id: number) => {},//funcion para eliminar un evento
    actualizarEvento: (evento: Evento) => {},//funcion para actualizar un evento
});