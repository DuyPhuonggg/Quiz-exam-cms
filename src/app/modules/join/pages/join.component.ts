import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@/app/services';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.css'],
})
export class JoinComponent implements OnInit {
    isLogin: boolean = false;

    constructor(private localStorageService: LocalStorageService) {}

    ngOnInit() {
        this.isLogin = !!this.localStorageService.getToken();
    }
}
