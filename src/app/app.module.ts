import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from '@/app/app.component';
import { FooterComponent, PageNotFoundComponent } from '@/app/shared';
import { AppRoutingModule } from '@/app/app.routes';
import { AuthService, LocalStorageService } from '@/app/services';
import { HttpClientModule } from '@angular/common/http';
import { GameCardComponent } from './shared/layout/game-card/game-card.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        PageNotFoundComponent,
        GameCardComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [AuthService, LocalStorageService],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {}
