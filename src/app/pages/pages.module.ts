
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RxjsComponent } from '../rxjs/rxjs.component';
import { Pag1Component } from './pag1/pag1.component';

@NgModule({
    declarations: [
        DashboardComponent,
        RxjsComponent,
        UsuariosComponent,
        BusquedaComponent,
        Pag1Component

    ],
    exports: [
        DashboardComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,

    ]
})
export class PagesModule { }
