import { Component, OnInit } from '@angular/core';
import { LANGUAGE } from '@/app/contants/common.constant';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
    private _languages: Array<string> = LANGUAGE;
    private _mainLanguages: string = LANGUAGE[0];

    get languages(): Array<string> {
        return this._languages;
    }
    set languages(languages: Array<string>) {
        this._languages = languages;
    }

    get mainLanguages(): string {
        return this._mainLanguages;
    }
    set mainLanguages(languages: string) {
        this._mainLanguages = languages;
    }

    isExpandLanguage: boolean = false;
    constructor() {}

    ngOnInit() {
        this._languages = LANGUAGE;
        this._mainLanguages = LANGUAGE[0];
    }

    handleClick(): void {
        console.log('hihi');
    }

    handleExpandLanguage(value: boolean): void {
        this.isExpandLanguage = value;
    }
}
