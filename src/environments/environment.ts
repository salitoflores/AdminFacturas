// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlSrvUsuario: 'http://172.16.72.129:9082/srvPresupuestoTi-web/rest/usuario',
  urlSrvRol: 'http://172.16.72.129:9082/srvPresupuestoTi-web/rest/rol',
  urlSrvAccion: 'http://172.16.72.129:9082/srvPresupuestoTi-web/rest/accion',
  urlSrvMenu: 'http://172.16.72.129:9082/srvPresupuestoTi-web/rest/menu',
  urlSrvCatalogo: 'http://172.16.72.129:9082/srvPresupuestoTi-web/rest/catalogo',
  urlSrvCabeceraPresupuesto: 'http://172.16.72.129:9082/srvPresupuestoTi-web/rest/cabeceraPresupuesto',
  urlSrvDetallePresupuesto: 'http://172.16.72.129:9082/srvPresupuestoTi-web/rest/detallePresupuesto'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
