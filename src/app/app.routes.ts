import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SnakeLadderComponent } from './snake-ladder/snake-ladder.component';

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
    },
    {
        path: 'snake-ladder',
        component: SnakeLadderComponent,
    }
];
