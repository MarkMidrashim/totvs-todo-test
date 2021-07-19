import { MessageService } from './services/message.service';
import { ListGroupComponent } from './components/ListGroup/list-group.component';
import { NavbarComponent } from './components/Navbar/navbar.component';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @ViewChild('navbar', {static: false}) navbar!: NavbarComponent;
    @ViewChild('listGroup', {static: false}) listGroup!: ListGroupComponent;

    public title = 'todo-app';
}
