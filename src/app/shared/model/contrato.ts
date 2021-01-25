import { Catalogo } from './catalogo';

export interface Contrato {
    coIdContrato?: number;
    idProveedor?: number;
    coIdProveedor?: Catalogo;
    idEstado?: number;
    coIdEstado?: Catalogo;
    idTipoContrato?: number;
    coIdTipoContrato?: Catalogo;
    idAreaTi?: number;
    coIdAreaTi?: Catalogo;
    idTipoPago?: number;
    coIdTipoPago?: Catalogo;
    coFechaInicio?: Date;
    coFechaFin?: Date;
    coPorcentajeImpuestos?: number;
    coCondiciones?: string;
    coBeneficios?: string;
    coComentarios?: string;
    coObservaciones?: string;
    coDocumento?: any;
}
