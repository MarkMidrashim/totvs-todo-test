import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faList, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NavbarComponent } from './components/Navbar/navbar.component';
import { ListGroupComponent } from './components/ListGroup/list-group.component';
import { FooterComponent } from './components/Footer/footer.component';
import { ModalComponent } from './components/Modal/modal.component';

@NgModule({
    declarations: [
        AppComponent,
        ModalComponent,
        NavbarComponent,
        ListGroupComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxSpinnerModule,
        FontAwesomeModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        NgbActiveModal
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    /**
     * CONSTRUCTOR
     * @param library
     */
    constructor(private library: FaIconLibrary) {
        library.addIcons(
            faPlus,
            faList,
            faTrash,
            faPencilAlt
        );
    }
}
