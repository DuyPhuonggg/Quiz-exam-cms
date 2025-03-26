import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AdminComponent } from './pages/admin.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminRouting } from './admin.route';
import { AdminBodyComponent } from './components/admin-body/admin-body.component';
import { SharedModule } from '@/app/shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from '@/app/modules/admin/components/settings/settings.component';

@NgModule({
    declarations: [
        AdminComponent,
        NavigationComponent,
        AdminHeaderComponent,
        AdminBodyComponent,
        ProfileComponent,
        SettingsComponent,
    ],
    imports: [CommonModule, AdminRouting, NgOptimizedImage, SharedModule],
})
export class AdminModule {}
