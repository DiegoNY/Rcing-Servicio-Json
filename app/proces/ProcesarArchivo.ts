import fs from 'fs';
import { Documento } from '../types';

export const ProcesarArchivo = (archivoPath: string): Documento => {
    const data = fs.readFileSync(archivoPath, 'utf8');
    const documento = JSON.parse(data);
    return documento;
}
