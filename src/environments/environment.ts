// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlSrvUsuario: '/srvPresupuestoTi-web/rest/usuario',
  urlSrvRol: '/srvPresupuestoTi-web/rest/rol',
  urlSrvAccion: '/srvPresupuestoTi-web/rest/accion',
  urlSrvMenu: '/srvPresupuestoTi-web/rest/menu',
  urlSrvCatalogo: '/srvPresupuestoTi-web/rest/catalogo',
  urlSrvCabeceraPresupuesto: '/srvPresupuestoTi-web/rest/cabeceraPresupuesto',
  urlSrvDetallePresupuesto: '/srvPresupuestoTi-web/rest/detallePresupuesto',
  urlSrvFechasAutorizadas: '/srvPresupuestoTi-web/rest/fechasAutorizadas'
}; 

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
