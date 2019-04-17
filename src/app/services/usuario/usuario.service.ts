import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];



  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.cargarStorage();
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    recordar=true;
    localStorage.setItem('email', usuario.email );

    if (usuario.email === usuario.password){
    return this.http.get( 'http://rcid.cl/api/sn5/usuarioinfo/Authorized?data=%7B%22username%22:%22demo%22,%22password%22:%22demo%22%7D')
              .map( (resp: any) => {
                this.guardarStorage( "", resp.access_token, usuario, "" );
                return true;
              })
              .catch( err => {

                swal( 'Error en el login', err.error.mensaje, 'error' );
                return Observable.throw( err );
              });

    }
    else{
      swal( 'Error en el login', "Contraseña invalida", 'error' );
      return  Observable.throw( "error" );
    }

  }




  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );                  console.log(this.token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  opcion1() {
    this.router.navigate(['/pag1']);
  }












}
