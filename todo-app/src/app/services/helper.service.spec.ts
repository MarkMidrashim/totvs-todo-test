import { inject, TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HelperService]
        });
    });

    it('Validando se foi criado', inject([HelperService], async (service: HelperService) => {
        expect(service).toBeTruthy();
    }));
});
