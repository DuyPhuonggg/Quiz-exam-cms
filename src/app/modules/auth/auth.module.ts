import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TimeHelper, ValidateHelper } from '@/app/helpers';
import { AuthService } from '@/app/services/auth.service';

import { SignInComponent, SignUpComponent } from './pages';
import { AuthRouting } from './auth.routes';
import { AuthHeaderComponent, ContinueWithEmailComponent } from './components';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        AuthHeaderComponent,
        ContinueWithEmailComponent,
    ],
    imports: [
        CommonModule,
        AuthRouting,
        NgOptimizedImage,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [AuthService, ValidateHelper, TimeHelper],
})
export class AuthModule {}
