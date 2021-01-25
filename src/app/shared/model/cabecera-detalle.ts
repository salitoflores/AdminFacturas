import { Catalogo } from './catalogo';
import { CabeceraPresupuesto } from './cabecera-presupuesto';

export interface CabeceraDetalle {

    cdIdCabeceraDetalle?: number;
    cdIdCabeceraPresupuesto?: CabeceraPresupuesto;
    idCabeceraPresupuesto?: number;
    cdIdAnio?: Catalogo;
    idAnio?: number;
    cdPresupuestoAnioAnterior?: number;
    cdPresupuestoPagadoAnioAnterior?: number;
    cdPresupuestoAnioActual?: number;
    cdBaseCero?: number;
    cdCrecimiento?: number;
    cdProyeccionPagoEnero?: number;
    cdProyeccionPagoFebrero?: number;
    cdProyeccionPagoMarzo?: number;
    cdProyeccionPagoAbril?: number;
    cdProyeccionPagoMayo?: number;
    cdProyeccionPagoJunio?: number;
    cdProyeccionPagoJulio?: number;
    cdProyeccionPagoAgosto?: number;
    cdProyeccionPagoSeptiembre?: number;
    cdProyeccionPagoOctubre?: number;
    cdProyeccionPagoNoviembre?: number;
    cdProyeccionPagoDiciembre?: number;
    valorCancelado?: number;
    diferencia?: number;
}
