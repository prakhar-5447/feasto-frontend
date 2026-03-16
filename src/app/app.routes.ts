import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Landing } from './features/landing/landing';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
        {
            path: '',
            // canActivate: [authGuard],
            loadComponent: () => LandingLayout,
            children: [
                {
                    path: '',
                    loadComponent: () => Landing
                }
            ]
        },
    {
        path: '',
        loadComponent: () => DashboardLayout,
        children: [
            {
                path: '',
                loadComponent: () => Dashboard
            },
        ]
    }
];
