import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, JoinComponent, SettingsComponent } from './pages';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: JoinComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'settings', component: SettingsComponent },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JoinRouting {}
