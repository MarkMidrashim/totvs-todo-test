import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from './../../services/message.service';
import { ListDataService } from '../../services/api/list-data.service';
import { List } from 'src/app/models/list';
import { Error } from 'src/app/models/error';
import { ModalComponent } from '../Modal/modal.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input() title?: string = 'ToDo';
    private _modalId: number = 0;
    public lists: List[] = [];
    public errors: Error[] = [];

    /**
     * CONSTRUCTOR
     * @param listDataService: ListDataService
     * @param messageService: MessageService
     * @param modalService: NgbModal
     */
    constructor(
        private listDataService: ListDataService,
        private messageService: MessageService,
        public modalService: NgbModal
    ) { }

    async ngOnInit() {
        await this.listDataService.getAllLists().then(response => this.lists = response);
    }

    /**
     * Método responsável por emitir evento para componente de tasks
     * @param id
     */
    async showTasks(id: number): Promise<void> {
        this.messageService.setNotify(id);
    }

    /**
     * Método responsável por adicionar uma lista
     */
    async addNewList() {
        const modal = this.modalService.open(ModalComponent);
        modal.componentInstance.id      = this._modalId++;
        modal.componentInstance.title   = 'Criar Lista';
        modal.componentInstance.submit  = 'Criar';

        modal.result.then(async (response) => {
            let list = new List({title: response.name});
            let result = await this.listDataService.addList(list);
            this.lists.push(result);
        }).catch((err) => {
            this.errors.push(new Error({
                title: "Não foi possível criar a lista",
                message: err.message
            }));
        });
    }
}
