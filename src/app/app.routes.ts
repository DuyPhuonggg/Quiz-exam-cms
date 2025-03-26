import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@/app/shared';
import { AuthGuard } from '@/app/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/join', pathMatch: 'full' },
    {
        path: 'join',
        loadChildren: () =>
            import('./modules/join/join.module').then((m) => m.JoinModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard],
    },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
