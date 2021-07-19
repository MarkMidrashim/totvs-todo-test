import { MessageService } from './../../services/message.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ListDataService } from './../../services/list-data.service';
import { List } from 'src/app/models/list';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public listIcon = faList;
    public plusIcon = faPlus;

    public lists: List[] = [];

    /**
     * CONSTRUCTOR
     * @param listDataService
     */
    constructor(
        private listDataService: ListDataService,
        private messageService: MessageService
    ) { }

    async ngOnInit() {
        await this.listDataService.getAllLists()
            .then(response => this.lists = response);
    }

    /**
     * Método responsável por emitir evento para componente de tasks
     * @param id
     */
    async showTasks(id: number): Promise<void> {
        this.messageService.setNotify(id);
    }
}
