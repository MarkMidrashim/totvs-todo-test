import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from "ngx-spinner";
import { NavbarComponent } from './components/Navbar/navbar.component';
import { ListGroupComponent } from './components/ListGroup/list-group.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ListGroupComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxSpinnerModule,
        FontAwesomeModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
