import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { JoinRouting } from './join.routes';
import { DashboardComponent, JoinComponent, SettingsComponent } from './pages';
import {
    JoinFooterComponent,
    JoinHeaderComponent,
    DashboardHeaderComponent,
    RecentActivitiesComponent,
    GameCardComponent,
} from './components';
import { TimeHelper, ValidateHelper } from '@/app/helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '@/app/shared';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { SharedModule } from '@/app/shared/shared.module';

@NgModule({
    declarations: [
        JoinComponent,
        JoinFooterComponent,
        DashboardComponent,
        DashboardHeaderComponent,
        JoinHeaderComponent,
        RecentActivitiesComponent,
        GameCardComponent,
        SettingsComponent,
        ToastComponent,
        DashboardMainComponent,
        DashboardFooterComponent,
    ],
    imports: [
        CommonModule,
        JoinRouting,
        NgOptimizedImage,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
    ],
    providers: [TimeHelper, ValidateHelper],
})
export class JoinModule {}
