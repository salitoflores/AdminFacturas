import { Catalogo } from './catalogo';

export interface CabeceraPresupuesto {
    cpIdCabecera?: number;
    cpIdCuentaContable?: Catalogo;
    cpIdArea?: Catalogo;
    cpIdCentroCosto?: Catalogo;
    cpIdServicio?: Catalogo;
    cpIdUsuarioResponsable?: Catalogo;
    cpProposito?: string;
    cpDetalles?: string;
    cpPresupuestoAnioAnterior?: number;
    cpPresupuestoPagadoAnioAnterior?: number;
    cpPresupuestoAnioActual?: number;
    cpBaseCero?: number;
    cpCrecimiento?: number;
    cpIdTopologia?: Catalogo;
    cpIdFuncion?: Catalogo;
    cpIdTipoGasto?: Catalogo;
    cpIdEstado?: Catalogo;
    cpIdTipoEjecucion?: Catalogo;
    cpIdAnio?: Catalogo;
    cpProyeccionPagoEnero?: number;
    cpProyeccionPagoFebrero?: number;
    cpProyeccionPagoMarzo?: number;
    cpProyeccionPagoAbril?: number;
    cpProyeccionPagoMayo?: number;
    cpProyeccionPagoJunio?: number;
    cpProyeccionPagoJulio?: number;
    cpProyeccionPagoAgosto?: number;
    cpProyeccionPagoSeptiembre?: number;
    cpProyeccionPagoOctubre?: number;
    cpProyeccionPagoNoviembre?: number;
    cpProyeccionPagoDiciembre?: number;
    valorCancelado?: number;
    diferencia?: number;
}
