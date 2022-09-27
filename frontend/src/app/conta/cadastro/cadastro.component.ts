import { fromEvent, merge, Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import {
    ValidationMessages,
    GenericValidator,
    DisplayMessage,
} from './../../shared/utils/generic-form-validation';

import { Usuario } from '../models/usuario.model';

import { ContaService } from '../services/conta.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputsElements: Array<ElementRef>;

    validationMessages: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage;

    erros: Array<any> = [];

    cadastroForm: FormGroup;
    usuario: Usuario;

    constructor(
        private formBuilder: FormBuilder,
        private contaService: ContaService
    ) {
        this.validationMessages = {
            email: {
                required: 'Informe o e-mail',
                email: 'Email inválido',
            },
            password: {
                required: 'Informe a senha',
                rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
            },
            confirmPassword: {
                required: 'Informe a senha novamente',
                rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
                equalTo: 'As senhas não conferem',
            },
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.configurarCadastroForm();
    }

    ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formInputsElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
        });
    }

    configurarCadastroForm(): void {
        this.cadastroForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    adicionarConta() {
        if (this.cadastroForm.dirty && this.cadastroForm.valid) {
            this.usuario = Object.assign(
                {},
                this.usuario,
                this.cadastroForm.value
            );

            this.usuario.confirmPassword = this.cadastroForm.get('password')?.value;
            this.contaService.registarUsuario(this.usuario).subscribe(
                (resposta) => { this.processarSucesso(resposta) },
                (error) => console.log(error)
            );
        }
    }

    processarSucesso(resposta: any): void {
        this.cadastroForm.reset();
        this.contaService.LocalStorage.salvarDadosLocaisUsuario(resposta);
    }
}
