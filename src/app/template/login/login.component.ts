import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert';


@Component({
    selector: 'bi-login',
    templateUrl: './login.component.html',
    styleUrls: ['../../../assets/css/main.css', '../../../assets/css/util.css',
        '../../../assets/css/bootstrap.4.3.1.min.css']
})
export class LoginComponent implements OnInit {

    usuario: Usuario;
    resLogin: any;

    @BlockUI() blockUI: NgBlockUI;

    constructor(private usuarioService: UsuarioService, private router: Router) { }

    ngOnInit() {
        this.usuario = {};
    }

    onSubmit(form: NgForm) {

        this.blockUI.start("Cargando...");

        if (form.invalid) {
            this.blockUI.stop();
            return;
        }
        this.usuarioService.verificarUsuario(this.usuario).subscribe(
            res => {
                this.resLogin = res;
                localStorage.setItem('user', this.resLogin.tokenAcceso);
                this.router.navigate(['home']);
                this.blockUI.stop();
            },
            err => {
                this.blockUI.stop();
                swal('Error!', err.error.descripcion, 'error');
            }
        );

    }

}
