import { inject, TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MessageService]
        });
    });

    it('Validando se foi criado', inject([MessageService], async (service: MessageService) => {
        expect(service).toBeTruthy();
    }));
});
