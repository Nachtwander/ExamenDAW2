'use client';
import { createContext } from "react";
import { Usuario } from "../models/Usuario";

export const UsuariosContext = createContext({
    usuarios: [] as Usuario[],//array para almacenar los usuarios
    setUsuarios: (usuarios: Usuario[]) => {},//funcion para actualizar el array de usuarios
});