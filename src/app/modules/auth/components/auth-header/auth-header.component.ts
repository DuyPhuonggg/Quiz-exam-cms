import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-header',
    templateUrl: './auth-header.component.html',
    styleUrls: ['./auth-header.component.css'],
})
export class AuthHeaderComponent implements OnInit {
    constructor(private router: Router) {}

    logButton: {
        text: string;
        href: string;
    } = {
        text: '',
        href: '',
    };

    ngOnInit(): void {
        const path = this.router.url;
        if (path.includes('sign-in')) {
            this.logButton = {
                text: 'Sign up',
                href: '/auth/sign-up',
            };
        }

        if (path.includes('sign-up')) {
            this.logButton = {
                text: 'Log in',
                href: '/auth/sign-in',
            };
        }
    }

    async onRedirect(path: string) {
        await this.router.navigate([path]);
    }
}
