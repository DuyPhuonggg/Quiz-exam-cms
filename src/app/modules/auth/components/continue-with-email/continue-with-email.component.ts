import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateMessage } from '@/app/types';
import { TimeHelper, ValidateHelper } from '@/app/helpers';
import { AuthService } from '@/app/services/auth.service';
import { Router } from '@angular/router';
import { SUBMIT_MODE } from '@/app/contants/auth.constant';
import { LocalStorageService } from '@/app/services';

@Component({
    selector: 'app-continue-with-email',
    templateUrl: './continue-with-email.component.html',
    styleUrls: ['./continue-with-email.component.css'],
})
export class ContinueWithEmailComponent {
    @Input() mode: string | any;
    @Input() onNextStep: Function | any;
    @Input() viewStep: any;

    constructor(
        private validateHelper: ValidateHelper,
        private timeHelper: TimeHelper,
        private router: Router,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
        private localStorageService: LocalStorageService
    ) {}

    userForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
        ]),
    });

    validateMessage: ValidateMessage | any;

    async onSubmit(mode: string) {
        // reset message form
        this.validateMessage = {
            error: {
                email: '',
                password: '',
                response: '',
            },
            success: {
                response: '',
            },
        };

        // validate fields
        const { isValid, errorsMap } = this.validateHelper.userForm(
            this.userForm.value
        );
        if (!isValid) {
            Object.keys(this.userForm.value).forEach((key) => {
                switch (key) {
                    case 'email':
                        this.validateMessage.error.email = errorsMap.get(key);
                        break;
                    case 'password':
                        this.validateMessage.error.password =
                            errorsMap.get(key);
                        break;
                    default:
                        break;
                }
            });
            return;
        }

        let response;
        if (mode === SUBMIT_MODE.LOGIN) {
            response = await this.authService.login(this.userForm.value);
        }

        if (mode === SUBMIT_MODE.REGISTER) {
            response = await this.authService.register(this.userForm.value);
        }

        if (response?.statusCode !== 200) {
            this.validateMessage.error.response = response.message;
            this.cdr.detectChanges();
            return;
        }

        this.validateMessage.success.response = response.message;
        this.cdr.detectChanges();
        await this.timeHelper.sleep(1500);

        if (mode === SUBMIT_MODE.LOGIN) {
            this.localStorageService.saveToken(response.payload.accessToken);
            this.localStorageService.saveCurrentUser(response.payload.userInfo);
            await this.router.navigate(['/join']);
        }

        if (mode === SUBMIT_MODE.REGISTER) {
            await this.router.navigate(['/auth/sign-in']);
        }
    }
}
