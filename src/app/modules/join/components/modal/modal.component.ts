import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ModalUser, Toast, ValidateMessage } from '@/app/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, LocalStorageService } from '@/app/services';
import { ValidateHelper } from '@/app/helpers';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges, OnInit {
    @Input() activeModal: boolean = false;
    @Output() activeModalChange: EventEmitter<boolean> = new EventEmitter();

    @Input() modalInfo: ModalUser = {
        title: '',
        firstLabel: '',
        secondLabel: '',
        alias: '',
        loading: false,
        typeInput: 'text',
    };
    @Output() modalInfoChange: EventEmitter<ModalUser> = new EventEmitter();

    userForm = new FormGroup({
        firstName: new FormControl<string | null | undefined>(''),
        lastName: new FormControl<string | null | undefined>(''),
        username: new FormControl<string | null | undefined>(''),
        oldPassword: new FormControl<string | null | undefined>('', [
            Validators.required,
            Validators.minLength(6),
        ]),
        newPassword: new FormControl<string | null | undefined>('', [
            Validators.required,
            Validators.minLength(6),
        ]),
        address: new FormControl<string | null | undefined>(''),
        phoneNumber: new FormControl<string | null | undefined | number>(''),
        gender: new FormControl<string | null | undefined>(''),
    });
    validateMessage: ValidateMessage | any;
    toast: Toast | any;

    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private validateHelper: ValidateHelper
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['activeModal']) {
            this.activeModal = changes['activeModal'].currentValue;
        }

        if (changes['modalInfo']) {
            this.modalInfo = changes['modalInfo'].currentValue;
        }
    }

    ngOnInit() {
        const currentUserInfo = this.localStorageService.getCurrentUser();
        this.userForm.setValue({
            firstName: currentUserInfo.firstName,
            lastName: currentUserInfo.lastName,
            username: currentUserInfo.username,
            oldPassword: '',
            newPassword: '',
            address: currentUserInfo.address,
            phoneNumber: currentUserInfo.phoneNumber,
            gender: currentUserInfo.gender,
        });
        this.modalInfo = {
            title: '',
            typeInput: 'text',
            alias: '',
            loading: false,
        };
    }

    closeModal() {
        this.activeModalChange.emit(!this.activeModal);
        this.modalInfoChange.emit(undefined);
    }

    async onSave(alias: string | null | undefined): Promise<void> {
        const previousValue = this.localStorageService.getCurrentUser();
        this.validateMessage = {
            error: {
                response: '',
            },
        };
        this.toast = {
            active: false,
            message: '',
        };
        switch (alias) {
            case 'username': {
                const { isValid, mess } = this.validateHelper.profileForm(
                    this.userForm.value,
                    previousValue,
                    'username'
                );
                if (!isValid) {
                    this.validateMessage.error.response = mess;
                    return;
                }
                this.modalInfo.loading = true;
                const response = await this.authService.updateProfile({
                    username: this.userForm.value.username,
                });
                this.modalInfo.loading = false;
                if (response.statusCode === 200) {
                    previousValue.username = this.userForm.value.username;
                    this.localStorageService.removeCurrentUser();
                    this.localStorageService.saveCurrentUser(previousValue);
                    this.toast = {
                        active: true,
                        message: 'Username updated successfully!',
                        type: 'success',
                    };
                    this.activeModalChange.emit(!this.activeModal);
                } else {
                    this.toast = {
                        active: true,
                        message:
                            'There was an error in updating username. Please try again!',
                        type: 'error',
                    };
                    this.validateMessage.error.response =
                        'There was an error in updating username. Please try again!';
                }
                break;
            }
            case 'password': {
                const { isValid, mess } = this.validateHelper.profileForm(
                    this.userForm.value,
                    previousValue,
                    'password'
                );

                if (!isValid) {
                    this.validateMessage.error.response = mess;
                    return;
                }

                this.modalInfo.loading = true;
                const response = await this.authService.changePassword({
                    email: previousValue.email,
                    old_password: this.userForm.value.oldPassword,
                    new_password: this.userForm.value.newPassword,
                });
                this.modalInfo.loading = false;
                if (response.statusCode === 200) {
                    this.toast = {
                        active: true,
                        message: 'Password updated successfully!',
                        type: 'success',
                    };
                    this.activeModalChange.emit(!this.activeModal);
                } else {
                    this.toast = {
                        active: true,
                        message:
                            'There was an error in updating password. Please try again!',
                        type: 'error',
                    };
                    this.validateMessage.error.response =
                        'There was an error in updating password. Please try again!';
                }
                break;
            }
            case 'fullName': {
                this.modalInfo.loading = true;
                const response = await this.authService.updateProfile({
                    first_name: this.userForm.value.firstName,
                    last_name: this.userForm.value.lastName,
                });
                this.modalInfo.loading = false;
                if (response.statusCode === 200) {
                    previousValue.firstName = this.userForm.value.firstName;
                    previousValue.lastName = this.userForm.value.lastName;
                    this.localStorageService.removeCurrentUser();
                    this.localStorageService.saveCurrentUser(previousValue);
                    this.toast = {
                        active: true,
                        message: 'Name updated successfully!',
                        type: 'success',
                    };
                    this.activeModalChange.emit(!this.activeModal);
                } else {
                    this.toast = {
                        active: true,
                        message:
                            'There was an error in updating name. Please try again!',
                        type: 'error',
                    };
                    this.validateMessage.error.response =
                        'There was an error in updating name. Please try again!';
                }
                break;
            }
            case 'address': {
                this.modalInfo.loading = true;
                const response = await this.authService.updateProfile({
                    address: this.userForm.value.address,
                });
                this.modalInfo.loading = false;
                if (response.statusCode === 200) {
                    previousValue.address = this.userForm.value.address;
                    this.localStorageService.removeCurrentUser();
                    this.localStorageService.saveCurrentUser(previousValue);
                    this.toast = {
                        active: true,
                        message: 'Address updated successfully!',
                        type: 'success',
                    };
                    this.activeModalChange.emit(!this.activeModal);
                } else {
                    this.toast = {
                        active: true,
                        message:
                            'There was an error in updating address. Please try again!',
                        type: 'error',
                    };
                    this.validateMessage.error.response =
                        'There was an error in updating address. Please try again!';
                }
                break;
            }
            case 'phoneNumber': {
                const { isValid, mess } = this.validateHelper.profileForm(
                    this.userForm.value,
                    previousValue,
                    'phoneNumber'
                );
                if (!isValid) {
                    this.validateMessage.error.response = mess;
                    return;
                }
                this.modalInfo.loading = true;
                const response = await this.authService.updateProfile({
                    phone_number: this.userForm.value.phoneNumber,
                });
                this.modalInfo.loading = false;
                if (response.statusCode === 200) {
                    previousValue.phoneNumber = this.userForm.value.phoneNumber;
                    this.localStorageService.removeCurrentUser();
                    this.localStorageService.saveCurrentUser(previousValue);
                    this.toast = {
                        active: true,
                        message: 'Contact number updated successfully!',
                        type: 'success',
                    };
                    this.activeModalChange.emit(!this.activeModal);
                } else {
                    this.toast = {
                        active: true,
                        message:
                            'There was an error in updating contact number. Please try again!',
                        type: 'error',
                    };
                    this.validateMessage.error.response =
                        'There was an error in updating contact number. Please try again!';
                }
                break;
            }
            case 'gender': {
                this.modalInfo.loading = true;
                const response = await this.authService.updateProfile({
                    gender: this.userForm.value.gender,
                });
                this.modalInfo.loading = false;
                if (response.statusCode === 200) {
                    previousValue.gender = this.userForm.value.gender;
                    this.localStorageService.removeCurrentUser();
                    this.localStorageService.saveCurrentUser(previousValue);
                    this.toast = {
                        active: true,
                        message: 'Gender updated successfully!',
                        type: 'success',
                    };
                    this.activeModalChange.emit(!this.activeModal);
                } else {
                    this.toast = {
                        active: true,
                        message:
                            'There was an error in updating gender. Please try again!',
                        type: 'error',
                    };
                    this.validateMessage.error.response =
                        'There was an error in updating gender. Please try again!';
                }
                break;
            }
        }
    }
}
