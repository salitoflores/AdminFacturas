import { CabeceraPresupuesto } from './cabecera-presupuesto';
import { Catalogo } from './catalogo';
import { Usuario } from './usuario';

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
    dpFechaRegistro?: Date;
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
    usIdUsuario?: Usuario;
    idUsuario?: number;
    dpImgFactura?: any;
    dpImgXmlFactura?: any;
    dpImgAnexos?: any;
    dpComentarioRechazo?: string;
    dpTipoDocumento?: number;
}
