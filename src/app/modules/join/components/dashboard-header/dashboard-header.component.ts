import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TimeHelper } from '@/app/helpers';
import { CurrentUser } from '@/app/types';
import { LocalStorageService } from '@/app/services';

@Component({
    selector: 'app-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent implements OnChanges {
    @Input() isLogin: boolean = false;
    @Input() currentInfo: CurrentUser | undefined;
    activeDropMenu: boolean = false;
    animationDropDown: { active: string; inactive: string; current: string } = {
        active: 'zoomIn v-enter-to',
        inactive: 'zoomOut v-leave-to',
        current: '',
    };

    constructor(
        private router: Router,
        private timeHelper: TimeHelper,
        private localStorageService: LocalStorageService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['isLogin']) {
            this.isLogin = changes['isLogin'].currentValue;
        }

        if (changes['currentInfo']) {
            this.currentInfo = changes['currentInfo'].currentValue;
        }
    }

    async onRedirect(path: string) {
        await this.router.navigate([path]);
    }

    async toggleDropMenu() {
        if (this.activeDropMenu) {
            this.animationDropDown.current = this.animationDropDown.inactive;
            await this.timeHelper.sleep(200);
            this.activeDropMenu = !this.activeDropMenu;
        } else {
            this.animationDropDown.current = this.animationDropDown.active;
            this.activeDropMenu = !this.activeDropMenu;
        }
    }

    async onLogged(mode: string) {
        if (mode === 'login') {
            await this.router.navigate(['auth', 'sign-in']);
        }

        if (mode === 'register') {
            await this.router.navigate(['auth', 'sign-up']);
        }

        if (mode === 'log-out') {
            this.localStorageService.removeToken();
            this.localStorageService.removeCurrentUser();
            await this.router.navigate(['join']);
        }

        if (mode === 'setting') {
            await this.router.navigate(['join', 'settings']);
        }
    }
}
