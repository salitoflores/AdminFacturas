import { Component, OnInit } from '@angular/core';
import { DetallePresupuesto } from '../../shared/model/detalle-presupuesto';
import { validarAccion, obtenerIdArea } from '../../shared/util/seguridad-acceso';
import { DetallePresupuestoService } from '../../services/detalle-presupuesto.service';
import { UsuarioService } from '../../services/usuario.service';
import { Catalogo } from '../../shared/model/catalogo';
import { ImFactura } from '../../shared/model/im-factura';
import { CatalogoService } from '../../services/catalogo.service';
import { HttpResponse } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import swal from 'sweetalert';

@Component({
    selector: 'bi-aprobacion',
    templateUrl: './aprobacion.component.html',
    styles: []
})
export class AprobacionComponent implements OnInit {

    lstFacturasPendientes: DetallePresupuesto[] = [];
    lstFacturasAprobar: DetallePresupuesto[] = [];
    lstCatalogoArea: Catalogo[] = [];
    areaSeleccion: Catalogo = {};
    imgFactura: ImFactura = {};
    flagMensajePendientes: boolean;
    display: boolean = false;
    factura: DetallePresupuesto;

    constructor(private detalleService: DetallePresupuestoService,
        private usuarioService: UsuarioService,
        private catalogoService: CatalogoService) {
        this.flagMensajePendientes = false;
    }

    ngOnInit() {
        if (validarAccion('APRFAC2')) {
            console.log('Carga catalogos');
            this.cargarCatalogoArea();
        } if (validarAccion('APRFAC1')) {
            this.cargarFacturasPendientes();
        }
    }

    cargarCatalogoArea() {
        this.catalogoService.buscarCatalogos(401).subscribe(res => {
            this.lstCatalogoArea = res;
            console.log(this.lstCatalogoArea);
        },
            err => {
                console.error(err);
            });
    }

    cargarFacturasPendientes() {
        if (validarAccion('APRFAC1')) {
            const idArea = obtenerIdArea();
            console.log(idArea);
            this.detalleService.recuperarFacturasEstado0(idArea).subscribe(
                res => {
                    this.lstFacturasPendientes = res;
                    if (this.lstFacturasPendientes.length > 0) {
                        this.flagMensajePendientes = false;
                    } else {
                        this.flagMensajePendientes = true;
                    }
                    console.log(this.lstFacturasPendientes);
                },
                err => {
                    if (err.status == 401) {
                        swal(':(', 'Sesión Caducada', 'info');
                        this.usuarioService.logout();
                    } else {
                        swal('Error!', err.error.descripcion, 'error');
                    }
                }
            );
        } else if (validarAccion('APRFAC2')) {
            this.detalleService.recuperarFacturasEstado1(this.areaSeleccion.cpIdCatalogo).subscribe(
                res => {
                    this.lstFacturasPendientes = res;
                    if (this.lstFacturasPendientes.length > 0) {
                        this.flagMensajePendientes = false;
                    } else {
                        this.flagMensajePendientes = true;
                    }
                    console.log(this.lstFacturasPendientes);
                },
                err => {
                    if (err.status == 401) {
                        swal(':(', 'Sesión Caducada', 'info');
                        this.usuarioService.logout();
                    } else {
                        swal('Error!', err.error.descripcion, 'error');
                    }
                }
            );
        } else {
            swal('Error!', ' Usuario no autorizado ', 'error');
        }
    }

    agregarFactura(e, item: DetallePresupuesto, index: number) {
        const marked = e.target.checked;
        if (marked === true) {
            this.lstFacturasAprobar.push(item);
        } else if (marked === false) {
            this.lstFacturasAprobar.splice(index, 1);
        }
    }

    aprobarFacturas() {
        console.log(this.lstFacturasAprobar);
        if (validarAccion('APRFAC1')) {
            this.detalleService.aprobarFacturasAprobador1(this.lstFacturasAprobar).subscribe(
                res => {
                    swal('OK!', 'Registro exitoso', 'success');
                    this.cargarFacturasPendientes();
                },
                err => {
                    if (err.status == 401) {
                        swal(':(', 'Sesión Caducada', 'info');
                        this.usuarioService.logout();
                    } else {
                        swal('Error!', err.error.descripcion, 'error');
                    }
                }
            );
        } else if (validarAccion('APRFAC2')) {
            this.detalleService.aprobarFacturasAprobador2(this.lstFacturasAprobar).subscribe(
                res => {
                    swal('OK!', 'Registro exitoso', 'success');
                    this.cargarFacturasPendientes();
                },
                err => {
                    if (err.status == 401) {
                        swal(':(', 'Sesión Caducada', 'info');
                        this.usuarioService.logout();
                    } else {
                        swal('Error!', err.error.descripcion, 'error');
                    }
                }
            );
        }
        this.cargarFacturasPendientes();
    }

    rechazarFactura(comentario: string) {
        this.factura.dpComentarioRechazo = comentario;
        console.log(this.factura);
        this.detalleService.rechazarFactura(this.factura).subscribe(
            res => {
                this.display = false;
                swal('OK!', 'Factura rechazada', 'success');
                this.cargarFacturasPendientes();

            },
            err => {
                if (err.status == 401) {
                    swal(':(', 'Sesión Caducada', 'info');
                    this.usuarioService.logout();
                } else {
                    swal('Error!', err.error.descripcion, 'error');
                }
            }
        );
    }

    verFactura(id: number) {
        this.detalleService.buscarFactura(id).subscribe(
            data => {
                console.log(data);
                this.imgFactura.dpImgFactura = data;
                console.log(this.imgFactura.dpImgFactura);
                const blob = new Blob([this.imgFactura.dpImgFactura], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            }, error => {
                console.log(error);
                console.log('Error downloading the file.');
            }
        );
    }

    showDialog(id: number) {
        this.display = true;
        this.factura = {};
        this.factura.dpIdDetalle = id;
    }

}
