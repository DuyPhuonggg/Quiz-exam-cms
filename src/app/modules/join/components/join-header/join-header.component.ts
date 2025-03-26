import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@/app/services';
import { CurrentUser } from '@/app/types';

@Component({
    selector: 'app-join-header',
    templateUrl: './join-header.component.html',
    styleUrls: ['./join-header.component.css'],
})
export class JoinHeaderComponent implements OnInit {
    currentInfo: CurrentUser | undefined;
    username: string | undefined | null = '';
    isLogin: boolean = false;

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit() {
        this.currentInfo = this.localStorageService.getCurrentUser();
        this.username =
            this.currentInfo.username ||
            this.currentInfo.email?.split('@')[0] ||
            this.currentInfo.firstName ||
            this.currentInfo.lastName;
        this.isLogin = !!this.localStorageService.getToken();
    }

    async onRedirect() {
        await this.router.navigate(['join', 'dashboard']);
    }
}
