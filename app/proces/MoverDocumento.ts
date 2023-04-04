import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const MoverDocumento = (archivoPath: string | undefined, archivo: string | undefined) => {

    const id = uuidv4();
    let carpeta_mover = `${__dirname}/../sent/${id}-${archivo}`


    if (archivoPath == undefined || archivo == undefined) {
        return console.log("El nombre de archivo no se a encontrado posible error procesarArchivo");
    }

    fs.rename(archivoPath, carpeta_mover, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('El archivo ha sido movido exitosamente!');
    });
}