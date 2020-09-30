import { Catalogo } from "./catalogo";

export interface Proveedor {
    prId?: number;
    prIdProveedor?: Catalogo;
    idProveedor?: number;
    prNombreComercial?: string;
    prRazonSocial?: string;
    prRuc?: string;
    prIdPais?: Catalogo;
    idPais?: number;
    prTelefonos?: string;
    prIdResponsableArea?: Catalogo;
    idResponsableArea?: number;
    prIdCriticidad?: Catalogo;
    idCriticidad?: number;
    prFormularioConozcaProveedor?: any;
    prFechaInicioFormulario?: Date;
    prFechaFinFormulario?: Date;
    prCertificadoResidenciaFiscal?: any;
    prFechaInicioCertificado?: Date;
    prFechaFinCertificado?: Date;
    prEstado?: boolean;
}