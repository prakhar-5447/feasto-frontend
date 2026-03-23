import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { Location } from './features/location/location';
import { Restaurant } from './features/restaurant/restaurant';
import { TabMenu } from './features/restaurant/tab-menu/tab-menu';
import { TabReviews } from './features/restaurant/tab-reviews/tab-reviews';
import { TabCart } from './features/restaurant/tab-cart/tab-cart';

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
                children: [
                    {
                        path: '',
                        loadComponent: () => Dashboard
                    },
                    {
                        path: ':restaurant',
                        loadComponent: () => Restaurant,
                        children: [
                            {
                                path: '',
                                redirectTo: 'order', pathMatch: 'full'
                            },
                            {
                                path: 'order',
                                loadComponent: () => TabMenu
                            },
                            {
                                path: 'reviews',
                                loadComponent: () => TabReviews
                            },
                            {
                                path: 'cart',
                                loadComponent: () => TabCart
                            },
                        ]

                    },
                ]
            },

        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
