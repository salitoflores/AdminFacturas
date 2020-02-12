import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert';


@Component( {
    selector: 'bi-login',
    templateUrl: './login.component.html',
    styleUrls: ['../../../assets/css/main.css', '../../../assets/css/util.css',
                '../../../assets/css/bootstrap.4.3.1.min.css']
} )
export class LoginComponent implements OnInit {

    usuario: Usuario;
    constructor(private usuarioService: UsuarioService, private router: Router) { }

    ngOnInit() {
        this.usuario = {};
    }

    onSubmit( form: NgForm ) {

        if ( form.invalid ) {
            return;
        }
        this.usuarioService.verificarUsuario(this.usuario).subscribe(
                res => {
                    this.usuario = res;
                    localStorage.setItem('user', JSON.stringify(this.usuario));
                    console.log(this.usuario);
                    this.router.navigate(['home']);
                },
                err => {
                    swal('Error!', err.error.descripcion, 'error');                    
                }
            );

    }

}
