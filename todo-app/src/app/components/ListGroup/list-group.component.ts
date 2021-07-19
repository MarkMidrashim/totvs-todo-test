import { MessageService } from './../../services/message.service';
import { TaskDataService } from './../../services/task-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Subscription, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-list-group',
    templateUrl: './list-group.component.html',
    styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {

    private subscription!: Subscription;
    private listId!: number;
    public tasks: Task[] = [];

    /**
     * CONSTRUCTOR
     * @param apiService
     */
    constructor(
        private taskDataService: TaskDataService,
        private message: MessageService,
        private spinner: NgxSpinnerService
    ) { }

    public ngOnInit() {
        this.subscription = this.message.notifyObservable$
            .subscribe(async (notify) => {
                this.spinner.show();
                if (typeof notify === 'number') {
                    this.listId = notify;
                    await this.taskDataService.getAllTasks(this.listId)
                        .then(response => this.tasks = response);
                    this.spinner.hide();
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
