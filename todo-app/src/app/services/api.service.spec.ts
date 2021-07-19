import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiService]
        });
    });

    it('Validando se foi criado', () => {
        expect(service).toBeTruthy();
    });
});
