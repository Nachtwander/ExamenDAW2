'use client';
import { Usuario } from "../models/Usuario";
import { UsuariosContext } from "../context/usuariosContext";
import { useContext, useEffect, useState } from "react";

interface VistaReact {
    children: React.ReactNode;
}

export const UsuariosProvider = ({ children }: VistaReact) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

     //cuando recargue la pagina se ejecuta la funcion para obtener los usuarios
     useEffect(()=>{
        cargarUsuarios()
      },[])

    async function cargarUsuarios() {
        try {
            const res= await fetch('http://localhost:5000/usuario') //response espera fetch
            const data=await res.json() //data espera response y la conversion a json
            setUsuarios(data) //usuarios recibe la data
            console.log(data)
          } catch (error) {
            alert('Ocurrio un error en la peticion' + error) //si ocurre un error
          }
    };

    return (
        <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
            {children}
        </UsuariosContext.Provider>
    );
};

//exportamos el contexto para que lo usemos en otros componentes
export function useUsuarioContext(){
    return useContext(UsuariosContext) //retorna el uso de contexto de UsuariosContext
}