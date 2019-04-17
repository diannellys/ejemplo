import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Pais } from '../../models/pais.model';
import swal from 'sweetalert';
import { Proveedor } from '../../models/proveedor.model';

@Injectable()
export class PaisService {
  [x: string]: any;
  paises: any[] = [];
  pais:Pais;
  resultado: any[] = [];
  proveedor:Proveedor[];

  url:string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPaises() {
    let httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer '+this._usuarioService.token })};
    let url = 'http://rcid.cl/api/sn5/pais/All';

    return this.http.get( url, httpOptions)
              .map( (resp: any) => {
               console.log(resp);

               this.paises = resp;
               for (let i = 0; i < this.paises.length; i++) {
                console.log(i);

                this.paises[i].index = i;
                 console.log(this.paises[i].nombre);
               }
                return resp;
              });

  }




  busqueda(termino: string, caso: string) {
    let httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer '+this._usuarioService.token })};


   if (caso==='1'){

          for (let i = 0; i < this.paises.length; i++) {

            if(this.paises[i].nombre=== termino )
            {termino=this.paises[i].pais_id;
            console.log("coincidencia "+this.paises[i].nombre + "   id  "+this.paises[i].pais_id );
          }else{termino='-1';}

          }

          this.url = 'http://rcid.cl/api/sn5/proveedor/Search?data={"pais_id":"'
          +termino+ '","razon_social":"","nombre_fantasia":""}' ;

    }



   if (caso==='2'){
     console.log("busqueda por razon social  "+ termino);

    this.url = 'http://rcid.cl/api/sn5/proveedor/Search?data={"pais_id":"","razon_social":"'
                +termino+ '","nombre_fantasia":""}' ;
              //  console.log("url  "+ this.url);

   }

   if (caso==='3'){
    console.log("busqueda por Nombre  "+ termino);
    this.url =  'http://rcid.cl/api/sn5/proveedor/Search?data={"pais_id":"","razon_social":"",'
     +'"razon_social":"","nombre_fantasia":"'+termino+'"}' ;

   }

    return this.http.get( this.url, httpOptions)
              .map( (resp: any) => {
                console.log(resp);
                for (let i = 0; i < this.resultado.length; i++) {
                  this.proveedor[i].cliente_id = resp[i].cliente_id;
                  this.proveedor[i].razon_social = resp[i].razon_social;
                  this.proveedor[i].nombre_fantasia = resp[i].nombre_fantasia;
                  this.proveedor[i].region_nombre = resp[i].region.nombre;

             }

                return resp;
              });

  }






}
