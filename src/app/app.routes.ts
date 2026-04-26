import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Matricula } from './pages/matricula/matricula';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home },
    {path: 'matricula', component: Matricula },
    {path: '**', redirectTo: 'home'}
];
