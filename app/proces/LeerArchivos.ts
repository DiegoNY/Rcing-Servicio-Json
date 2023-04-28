import fs from "fs";
import path from "path";
import { Documento } from "../types";
import { ProcesarArchivo } from "./ProcesarArchivo";
import { idSucursal } from "../config/config";

export const LeyendoArchivos = (carpeta: string): Promise<Documento[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(carpeta, (error, archivos) => {
      if (error) {
        console.error(`Error al leer la carpeta ${error}`);
        reject("Error al leer carpeta" + error);
        return;
      }

      archivos.map((carpeta_cliente) => {
        console.log(carpeta_cliente);
        const carpeta_documento = carpeta + "/" + carpeta_cliente;
        const archivosEnviar: Documento[] = [];

        fs.readdir(carpeta_documento, (error, json_enviar) => {
          if (error) {
            console.error(`Error al leer la carpeta_cliente ${error}`);
          }
          //   console.log(json_enviar);
          json_enviar.forEach((archivo) => {
            const archivoPath = path.join(carpeta_documento, archivo);

            console.log(`Procesando archivo ${archivo}`);
            const documento = ProcesarArchivo(archivoPath);
            archivosEnviar.push({
              ...documento,
              archivoPath,
              archivo,
              idSucursal: idSucursal,
            });
            // Registrar el archivo como procesado
          });

          if (archivosEnviar.length != 0) {
            resolve(archivosEnviar);
          }
        });
      });
    });
  });
};
