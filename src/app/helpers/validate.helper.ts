import { CurrentUser, RegisterValues } from '@/app/types';

export class ValidateHelper {
    constructor() {}

    emailRegex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    userForm(values: RegisterValues): {
        isValid: boolean;
        errorsMap: Map<string, string>;
    } {
        let isValid: boolean = true;
        const errorsMap = new Map();
        Object.keys(values).forEach((key) => {
            switch (key) {
                case 'email': {
                    if (!values.email?.trim()) {
                        isValid = false;
                        errorsMap.set(key, 'Please enter an email address');
                        break;
                    }

                    if (!this.validateEmail(values?.email)) {
                        isValid = false;
                        errorsMap.set(
                            key,
                            'Please enter a valid email address'
                        );
                        break;
                    }

                    errorsMap.set(key, '');
                    break;
                }
                case 'password': {
                    if (!values.password?.trim()) {
                        isValid = false;
                        errorsMap.set(key, 'Please enter password');
                        break;
                    }

                    if (values?.password.length < 6) {
                        isValid = false;
                        errorsMap.set(
                            key,
                            'Password should be at least 6 characters'
                        );
                        break;
                    }

                    errorsMap.set(key, '');
                    break;
                }
                default: {
                    errorsMap.set(key, '');
                }
            }
        });

        return { isValid, errorsMap };
    }

    profileForm(curValues: CurrentUser, preValues: CurrentUser, alias: string) {
        let isValid: boolean = true;
        let mess: string = '';
        switch (alias) {
            case 'username': {
                if (curValues['username']) {
                    if (curValues['username']?.trim().length <= 0)
                        isValid = false;
                    mess = 'Field is required';
                }
                if (curValues['username'] === preValues['username']) {
                    isValid = false;
                    mess = 'The username provided is same as your current.';
                }
                break;
            }
            case 'password': {
                if (
                    curValues['oldPassword']?.trim() ===
                    curValues['newPassword']?.trim()
                ) {
                    isValid = false;
                    mess = 'The new password provided is same as old password';
                }

                if (curValues['oldPassword']) {
                    if (curValues['oldPassword'].trim().length < 6) {
                        isValid = false;
                        mess = 'The old password must be at least 6 characters';
                    }
                }

                if (curValues['newPassword']) {
                    if (curValues['newPassword'].trim().length < 6) {
                        isValid = false;
                        mess = 'The new password must be at least 6 characters';
                    }
                }

                break;
            }
            case 'phoneNumber': {
                if (
                    curValues['phoneNumber'] &&
                    isNaN(<number>curValues['phoneNumber'])
                ) {
                    isValid = false;
                    mess = 'The contact number provided is require number.';
                }
                break;
            }
            default: {
            }
        }

        return { isValid, mess };
    }

    validateEmail(email: string): boolean {
        return this.emailRegex.test(email);
    }
}
