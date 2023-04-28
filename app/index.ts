import express from "express";

import { carpeta, puerto, tiempo, tiempo_limpiar } from "./config/config";
import { LeyendoArchivos } from "./proces/LeerArchivos";
import { Documento, RespuestaServicio } from "./types";
import { Declarar } from "./proces/Declarar";
import { MoverDocumento } from "./proces/MoverDocumento";

const app = express();

let mock: Documento[] = [];
let mockDocumentosErrores: Documento[] = [];

console.log("SERVICIO DE JSON INICIADO");

const LimpiarErrores = () => {
  mockDocumentosErrores = [];
};

const ValidarInformacion = (data: Documento[]) => {
  mockDocumentosErrores.map((docError) => {
    const docIndex = data.findIndex(
      (docData) => docData?.Numeracion == docError?.Numeracion
    );
    data.splice(docIndex, 1);
  });
  return data;
};

setInterval(() => {
  LeyendoArchivos(carpeta)
    .then((documentos) => {
      const dataEnvio = ValidarInformacion(documentos);
      mock = dataEnvio;
      console.log({ dataEnvio });

      if (dataEnvio.length != 0) {
        Declarar(dataEnvio)
          .then((rta: any) => {
            const { data } = rta;
            console.log(data);

            data.map((documento: RespuestaServicio) => {
              const indexDoc = dataEnvio.findIndex(
                (documentoMock) =>
                  `${documentoMock.Numeracion}-0${documentoMock.TipoDocumento}` ==
                  documento.documento
              );

              if (documento.estatus == 1) {
                console.log(
                  `El documento ${documento.documento} sera movido procesado exitosamente`
                );
                const documentoMover = dataEnvio[indexDoc];

                MoverDocumento(
                  documentoMover.archivoPath,
                  documentoMover.archivo
                );
              } else {
                console.log(
                  `El documento ${documento.documento} contiene errores`
                );
                mockDocumentosErrores.push(dataEnvio[indexDoc]);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}, tiempo);

setInterval(LimpiarErrores, tiempo_limpiar);

app.listen(puerto, () => {
  console.log("Server iniciado");

  app.get("/procesados", (req, res) => {
    LeyendoArchivos(`${__dirname}/sent`)
      .then((rta) => {
        res.send({
          info: "documentos leidos",
          data: rta,
        });
      })
      .catch((erro) => {
        res.send({
          error: true,
          message: erro,
        });
      });
  });

  app.get("/procesando", (req, res) => {
    res.send({ data: mock });
  });

  app.get("/errores", (req, res) => {
    res.send({
      info: "Documentos con errores",
      data: mockDocumentosErrores,
    });
  });
});
