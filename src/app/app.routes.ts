import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
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
];
