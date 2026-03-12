import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Landing } from './features/landing/landing';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => LandingLayout,
        children: [
            {
                path: '',
                loadComponent: () => Landing
            }
        ]
    },

    {
        path: 'auth',
        loadComponent: () => AuthLayout,
    }

];
