import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo : 'home',
        pathMatch : 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'tic-tac-toe',
        component: TicTacToeComponent,
    }
];
