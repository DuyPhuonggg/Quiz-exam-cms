import { Injectable } from '@angular/core';
import { environment } from '@/environments';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from '@/app/services/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) {}

    async login(body: any): Promise<any> {
        try {
            return await lastValueFrom(
                this.http.post(`${environment.API_SERVER}/auth/login`, {
                    email: body.email,
                    password: body.password,
                })
            );
        } catch (error: any) {
            return error?.error;
        }
    }

    async register(body: any): Promise<any> {
        try {
            return await lastValueFrom(
                this.http.post(`${environment.API_SERVER}/auth/register`, body)
            );
        } catch (error: any) {
            return error?.error;
        }
    }

    async updateProfile(body: any): Promise<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.localStorageService.getToken()}`,
            },
        };
        try {
            return await lastValueFrom(
                this.http.post(
                    `${environment.API_SERVER}/auth/profile`,
                    body,
                    options
                )
            );
        } catch (error: any) {
            return error?.error;
        }
    }

    async changePassword(body: any): Promise<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.localStorageService.getToken()}`,
            },
        };
        try {
            return await lastValueFrom(
                this.http.post(
                    `${environment.API_SERVER}/auth/change-password`,
                    body,
                    options
                )
            );
        } catch (error: any) {
            return error?.error;
        }
    }
}
