import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input() id!: number;
    @Input() title!: string;
    @Input() submit!: string;
    @Input() nameValue?: string = '';

    public submitted = false;
    public modalForm!: FormGroup;

    /**
     * CONSTRUCTOR
     * @param activeModal: NgbActiveModal
     * @param formBuilder: FormBuilder
     */
    constructor(
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.modalForm = this.formBuilder.group({
            name: new FormControl(this.nameValue, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100),
            ])
        });
    }

    get form() { return this.modalForm.controls; }

    /**
     * Método responsável por enviar os dados após o submit
     */
    submitForm() {
        if (this.modalForm.valid) {
            this.submitted = true;
            this.activeModal.close(this.modalForm.value);
        }
    }

    /**
     * Método responsável por fechar o modal
     */
    closeModal() {
        this.activeModal.close();
    }
}
