import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from './../../services/message.service';
import { ListDataService } from '../../services/api/list-data.service';
import { TaskDataService } from './../../services/api/task-data.service';
import { Task } from 'src/app/models/task';
import { List } from 'src/app/models/list';
import { Error } from 'src/app/models/error';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../Modal/modal.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-group',
    templateUrl: './list-group.component.html',
    styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {

    private subscription!: Subscription;
    public tasks: Task[] = [];
    public errors: Error[] = [];
    private _modalId: number = 0;
    _listId!: number;
    _list!: List;

    @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;

    /**
     * CONSTRUCTOR
     * @param listDataService: ListDataService
     * @param taskDataService: TaskDataService
     * @param message: MessageService
     * @param spinner: NgxSpinnerService
     * @param modalService: NgbModal
     */
    constructor(
        private listDataService: ListDataService,
        private taskDataService: TaskDataService,
        private message: MessageService,
        private spinner: NgxSpinnerService,
        public modalService: NgbModal
    ) { }

    public ngOnInit() {
        this.subscription = this.message.notifyObservable$.subscribe(async (notify) => {
            this.spinner.show();
            if (typeof notify === 'number') {
                this._listId = notify;
                await this.listDataService.getListById(this._listId).then(
                    (response: List) => this._list = response
                );

                await this.taskDataService.getAllTasks(this._listId).then(
                    (response: Task[]) => this.tasks = response
                );

                if (this.tasks.length <= 0) {
                    this.errors.push(new Error({
                        title: "Não há nenhum dado",
                        message: "Não há nenhum dado"
                    }));
                } else {
                    this.errors = [];
                }
            }
            this.spinner.hide();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /**
     * Método responsável por adicionar uma tarefa
     */
    async addNewTask() {
        const modal = this.modalService.open(ModalComponent);
        modal.componentInstance.id      = this._modalId++;
        modal.componentInstance.title   = 'Criar Tarefa';
        modal.componentInstance.submit  = 'Criar';

        modal.result.then(async (response) => {
            if (typeof response !== 'undefined') {
                let task = new Task({
                    listId: this._listId,
                    title: response.name,
                    complete: false
                });
                let result = await this.taskDataService.addTask(task);
                this.tasks.push(result);
            }
        }).catch((err) => {
            this.errors.push(new Error({
                title: "Não foi possível adicionar uma tarefa",
                message: err.message
            }));
        });
    }

    /**
     * Método responsável por remover uma tarefa
     * @param task: task
     * @param index: number
     */
    async removeTask(task: Task, index: number) {
        Swal.fire({
            title: `Deseja remover <b>${task.title}</b>?`,
            text: "Ao realizar esta operação, não será possível revertê-la!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sim, remova!',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const result = await this.taskDataService.deleteTask(task.id);

                if (result) {
                    this.tasks.splice(index, 1);
                    Swal.fire(
                        'Removido!',
                        'A tarefa foi removida com sucesso.',
                        'success'
                    )
                }
            }
        });
    }

    /**
     * Método responsável por completar uma tarefa
     * @param task: task
     * @param index: number
     */
    async completeTask(task: Task, index: number) {
        Swal.fire({
            title: `Deseja completar a tarefa <b>${task.title}</b>?`,
            text: "Ao realizar esta operação, não será possível revertê-la!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sim, completar!',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                task.complete = true;
                const result = await this.taskDataService.updateTask(task);

                if (result) {
                    Swal.fire(
                        'Completada!',
                        'A tarefa foi concluida com sucesso.',
                        'success'
                    )
                }
            } else {
                let element = this.checkboxes.get(index) as ElementRef;
                element.nativeElement.checked = false;
            }
        });
    }

    /**
     * Método responsável por editar uma tarefa
     * @param task: task
     * @param index: number
     */
    async editTask(task: Task, index: number) {
        const modal = this.modalService.open(ModalComponent);
        modal.componentInstance.id          = this._modalId++;
        modal.componentInstance.title       = 'Editar Tarefa';
        modal.componentInstance.submit      = 'Editar';
        modal.componentInstance.nameValue   = task.title;

        modal.result.then(async (response) => {
            if (typeof response !== 'undefined') {
                let taskToUpdate = new Task({
                    id: task.id,
                    listId: this._listId,
                    title: response.name,
                    complete: false
                });
                const result = await this.taskDataService.updateTask(taskToUpdate);

                if (result) {
                    this.tasks[index] = result;
                }
            }
        }).catch((err) => {
            this.errors.push(new Error({
                title: "Não foi possível editar a tarefa",
                message: err.message
            }));
        });
    }
}
