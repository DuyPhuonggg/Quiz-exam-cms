import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUser, ModalType } from '@/app/types';
import { Router } from '@angular/router';
import { LocalStorageService } from '@/app/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
    currentInfo: CurrentUser = {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        phoneNumber: '',
        role: '',
    };
    isLogin: boolean = false;
    modalInfo: ModalType = {
        title: '',
        subtitle: '',
        alias: '',
        loading: false,
        active: false,
    };
    validateMessage = {
        error: {
          response: ''
        },
    }
    storageSub$: Subscription | undefined;

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit() {
        this.currentInfo = this.localStorageService.getCurrentUser();
        this.isLogin = !!this.localStorageService.getToken();

        this.storageSub$ = this.localStorageService
            .watchStorage()
            .subscribe((status) => {
                if (status === 'added' || status === 'removed') {
                    this.currentInfo =
                        this.localStorageService.getCurrentUser();
                }
            });
    }

    ngOnDestroy() {
        if (this.storageSub$) {
            this.storageSub$.unsubscribe();
        }
    }

    async toggleSetting(type: string) {
        this.modalInfo.active = true;
        switch (type) {
            case 'log-out': {
                this.localStorageService.removeToken();
                this.localStorageService.removeCurrentUser();
                await this.router.navigate(['join']);
                break;
            }
            case 'username': {
                this.modalInfo.subtitle = `Pick a username that's fun and unique!`;
                this.modalInfo.alias = 'username';
                break;
            }
            case 'password': {
              this.modalInfo.subtitle = ``;
              this.modalInfo.alias = 'password';
                break;
            }
            case 'fullName': {
                this.modalInfo.subtitle = ``;
                this.modalInfo.alias = 'fullName';
                break;
            }
            case 'address': {
                this.modalInfo.subtitle = ``;
                this.modalInfo.alias = 'address';
                break;
            }
            case 'phoneNumber': {
                this.modalInfo.subtitle = ``;
                this.modalInfo.alias = 'phoneNumber';
                break;
            }
            case 'gender': {
                this.modalInfo.subtitle = ``;
                this.modalInfo.alias = 'gender';
                break;
            }
            default:
                this.modalInfo.active = false;
                break;
        }
    }

    handleCloseModal() {
        this.modalInfo.active = false;
        this.modalInfo.subtitle = ``;
        console.log(this.modalInfo);
    }

    handleSaveModal() {}
}
