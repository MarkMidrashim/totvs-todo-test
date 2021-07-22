import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskDataService } from './../../services/api/task-data.service';
import { ListGroupComponent } from './list-group.component';

describe('ListGroupComponent', () => {
    let component: ListGroupComponent;
    let fixture: ComponentFixture<ListGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskDataService],
            declarations: [ListGroupComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Validando se foi criado', () => {
        expect(component).toBeTruthy();
    });
});
