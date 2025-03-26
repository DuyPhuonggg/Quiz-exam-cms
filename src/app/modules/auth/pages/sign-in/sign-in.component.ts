import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewStep } from '@/app/types';
import { SUBMIT_MODE } from '@/app/contants/auth.constant';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../sign-up/sign-up.component.css'],
})
export class SignInComponent {
    constructor(private router: Router) {}

    mode: string = SUBMIT_MODE.LOGIN;
    viewStep: ViewStep = {
        first: true,
    };

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

    async onRedirect(path: String) {
        await this.router.navigate([path]);
    }
}
