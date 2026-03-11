import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Landing } from './features/landing/landing';
import { Signup } from './features/auth/signup/signup';
import { Login } from './features/auth/login/login';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => LandingLayout,

        children: [
            {
                path: '',
                loadComponent: () =>
                    Landing
            }
        ]
    },

    {
        path: 'auth',
        loadComponent: () => AuthLayout,

        children: [
            {
                path: 'login',
                loadComponent: () => Login
            },
            {
                path: 'signup',
                loadComponent: () => Signup
            }
        ]
    }

];
