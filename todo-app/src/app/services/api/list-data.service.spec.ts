import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListDataService } from './list-data.service';
import { List } from 'src/app/models/list';

describe('ListDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ListDataService]
        });
    });

    it('Validando se foi criado', inject([ListDataService], (service: ListDataService) => {
        expect(service).toBeTruthy();
    }));

    describe('#getAllLists()', () => {
        it('Testando a listagem (vazio) de listas', inject([ListDataService], (service: ListDataService) => {
            service.getAllLists().then(value => expect(value).toEqual([]));
        }));

        it('Testando a listagem de listas', inject([ListDataService], (service: ListDataService) => {
            let todo1 = new List({ title: 'Hello 1' });
            let todo2 = new List({ title: 'Hello 2' });
            service.addList(todo1);
            service.addList(todo2);

            service.getAllLists().then(value => {
                expect(value).toEqual([todo1, todo2]);
            });
        }));
    });

    describe('#addList(todo)', () => {
        it('Testando a inclusão e a recuperação das listas criadas', inject([ListDataService], (service: ListDataService) => {
            let todo1 = new List({ title: 'Hello 1' });
            let todo2 = new List({ title: 'Hello 2' });
            service.addList(todo1);
            service.addList(todo2);
            service.getListById(1).then(value => expect(value).toEqual(todo1));
            service.getListById(2).then(value => expect(value).toEqual(todo2));
        }));
    });
});
