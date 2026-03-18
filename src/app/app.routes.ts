import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { Location } from './features/location/location';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [authGuard],
        loadComponent: () => LandingLayout,
    },
    {
        path: 'india',
        loadComponent: () => DashboardLayout,
        children: [
            {
                path: '',
                loadComponent: () => Location
            },
            {
                path: ':city',
                loadComponent: () => Dashboard
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
