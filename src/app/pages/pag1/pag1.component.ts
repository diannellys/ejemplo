import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { PaisService } from '../../services/service.index';
import { element, by } from 'protractor';
import swal from 'sweetalert';
import { Proveedor } from '../../models/proveedor.model';

@Component({
  selector: 'app-pag1',
  templateUrl: './pag1.component.html',
  styles: ['./pag1.component.css']
})
export class Pag1Component implements OnInit {

  paises: Pais[] = [];
  pais: Pais;
  proveedor: Proveedor[];
  proveedor2: Proveedor[];

  constructor(
    public _paisService: PaisService
  ) { }

  ngOnInit() {
    this.cargarPaises();
  }

  cargarPaises() {
   this._paisService.cargarPaises()
          .subscribe( resp => this.paises = resp );



  }

  busqueda( termino: string ) {



    console.log("Pais ");
this._paisService.busqueda( termino, '1')
           .subscribe( proveedor =>  this.proveedor = proveedor );

console.log("razon social ");
    this._paisService.busqueda( termino, '2')
            .subscribe( proveedor =>  this.proveedor = proveedor );

  console.log("nombre ");
     this._paisService.busqueda( termino, '3')
             .subscribe( proveedor =>  this.proveedor2 = proveedor );







          }






}
