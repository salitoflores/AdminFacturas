import { JwtHelperService } from '@auth0/angular-jwt';

export function obtenerAcciones () {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('user'));
    return decodedToken.lstAcciones;
}

export function validarAccion( nombreAccion: string ): boolean {
    const lstAcciones = obtenerAcciones();
    const accionEncontrada = lstAcciones.filter( accion => accion.acNombreAccion === nombreAccion );
    let respuesta = false;
    if ( accionEncontrada.length > 0 ) {
        respuesta = true;
    }
    // console.log(accionEncontrada);
    // console.log(respuesta);
    return respuesta;
}

export function obtenerIdUsuario () {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('user'));
    return decodedToken.idUsuario;
}

export function obtenerIdArea () {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('user'));
    console.log(decodedToken.idArea);
    return decodedToken.idArea;
}

