import { Injectable } from '@angular/core';
import { CurrentUser } from '@/app/types';
import { Observable, Subject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {}

    token_key: string = 'quiz-token';
    current_user: string = 'quiz-current-user';

    private storageSub = new Subject<string>();

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    saveToken(value: string): void {
        localStorage.setItem(this.token_key, JSON.stringify(value));
    }

    getToken(): string {
        const token = localStorage.getItem(this.token_key);
        if (!token) return '';
        return JSON.parse(token);
    }

    removeToken(): void {
        localStorage.removeItem(this.token_key);
    }

    saveCurrentUser(value: any): void {
        localStorage.setItem(this.current_user, JSON.stringify(value));
        this.storageSub.next('added');
    }

    getCurrentUser(): CurrentUser {
        const user = localStorage.getItem(this.current_user);
        if (!user)
            return {
                email: null,
                lastName: null,
                firstName: null,
                phoneNumber: null,
                address: null,
                gender: null,
                username: null,
                role: null,
            };

        const userInfo = JSON.parse(user);
        return {
            email: userInfo.email,
            lastName: userInfo.last_name || userInfo.lastName,
            firstName: userInfo.first_name || userInfo.firstName,
            phoneNumber: userInfo.phone_number || userInfo.phoneNumber,
            address: userInfo.address,
            gender: userInfo.gender,
            username: userInfo.username,
            role: userInfo.role,
        };
    }

    removeCurrentUser(): void {
        localStorage.removeItem(this.current_user);
        this.storageSub.next('removed');
    }

    decodeToken(token: string) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Invalid token format:', error);
            return null;
        }
    }
}
