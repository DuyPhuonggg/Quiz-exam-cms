import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './common/button/button.component';
import {
    AnalyticsIconComponent,
    BooksIconComponent,
    ExploreIconComponent,
    FileIconComponent,
    GearIconComponent,
    SignOutIconComponent,
    UserCircleIconComponent,
} from './common/icon';
import { ModalComponent } from './layout/modal/modal.component';

@NgModule({
    declarations: [
        ButtonComponent,
        ExploreIconComponent,
        BooksIconComponent,
        AnalyticsIconComponent,
        GearIconComponent,
        UserCircleIconComponent,
        FileIconComponent,
        SignOutIconComponent,
        ModalComponent,
    ],
    exports: [
        ButtonComponent,
        ExploreIconComponent,
        BooksIconComponent,
        AnalyticsIconComponent,
        GearIconComponent,
        UserCircleIconComponent,
        FileIconComponent,
        SignOutIconComponent,
        ModalComponent,
    ],
    imports: [CommonModule],
})
export class SharedModule {}
