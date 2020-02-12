import { CabeceraPresupuesto } from '../model/cabecera-presupuesto';
import { Catalogo } from './catalogo';

export interface DetallePresupuesto {
    dpIdDetalle?: number;
    dpIdCabecera?: CabeceraPresupuesto;
    idCabecera?: number;
    cpIdProveedor?: Catalogo;
    idProveedor?: number;
    cpIdFabricante?: Catalogo;
    idFabricante?: number;
    cpFacturaLocal?: boolean;
    idMes?: number;
    cpMes?: Catalogo;
    dpNumeroFactura?: string;
    dpFechaRegistro?: string;
    dpComentario?: string;
    dpSubtotal?: number;
    dpIva?: number;
    dpRetencion?: number;
    dpIce?: number;
    dpIsd?: number;
    dpValorTransferencia?: number;
    dpValorPresupuesto?: number;
    dpFechaFactura?: Date;
    dpEstadoLote?: number;
    usIdUsuario?: number;
}
