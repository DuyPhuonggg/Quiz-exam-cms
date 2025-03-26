import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ViewStep } from '@/app/types';
import { SUBMIT_MODE } from '@/app/contants/auth.constant';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
    constructor(private router: Router) {}

    mode: string = SUBMIT_MODE.REGISTER;
    viewStep: ViewStep = {
        first: true,
    };

    async onRedirect(path: String) {
        await this.router.navigate([path]);
    }

    nextStep(type: string, viewStep: ViewStep) {
        switch (type) {
            case 'email':
                viewStep.first = false;
                break;
            case 'first-step':
                viewStep.first = true;
                break;
            default:
                break;
        }
    }
}
