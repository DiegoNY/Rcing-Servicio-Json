export type Operacion = {
    TipoOperacion: number
    Monto: number
}

export type Tributos = {
    TipoTributo: number
    Valor: number
    PorcentajeTributo: number
}

export type Item = {
    CodigoProducto: number
    Valor: number
    PrecioUnitario: number
    ValorUnitario: number
    unidadItem: string
    cantidadItem: number
    descripcionItem: string
    igvItem: number
    Importe: number
    descuentoItem: number
    Placa: string
    numeroItem: number
    TipoOperacion: number
    Monto: number
    Subtotal: number
}

export type Leyenda = {
    TipoLeyenda: number
    Descripcion: string
}

export type Venta = {
    MaquinaRegistradora: string
    Hora: string
    Turno: number
    Cara: number
    Isla: number
    Manguera: number
    Recibo: number
    FechaHora: string,
    FechaProximoMantenimiento: string,
    FechaRevisionCilindro: string,
    Donacion: number,
    Redondeo: number
}

export type Recaudos = {
    Financiera: string
    Porcentaje: number
    Monto: number
}
export type Documento = {
    TipoDocumento: number
    FechaEmision: string
    RucEmisor: string
    Numeracion: string
    TipoDocumentoAdquiriente: number
    NumeroDocumentoAdquiriente: string
    NombreAdquiriente: string
    DireccionAdquiriente: string
    Operacion: Operacion[]
    Tributos: Tributos[]
    OtrosCargos: number
    TotalVenta: number
    TipoMoneda: string
    Item: Item[],
    Leyenda: Leyenda[]
    CodigoNotaCreditoDebito: string,
    DocumentoAfectad: string,
    TipoDocumentoAfectado: string,
    MotivoSustento: string,
    Venta: Venta[]
    Recaudos: Recaudos[]
    MedioPago: null | number | string,
    idSucursal: number
    archivoPath: string
    archivo: string
}

export type RespuestaServicio = {
    estatus: number
    Message: string
    documento: string
}