import { Rol } from './rol';

export interface Usuario {
    usIdUsuario?: number;
    usNombreUsuario?: string;
    usDescripcionUsuario?: string;
    usEstadoUsuario?: boolean;
    usClaveUsuario?: string;
    roIdRol?: Rol;
    idRol?: number;
}
