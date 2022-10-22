import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor.model';

import { NgBrazilValidators, MASKS } from 'ng-brazil';
// import * as utilsBr from 'js-brasil';

@Component({
  selector: 'app-form-fornecedor',
  templateUrl: './form-fornecedor.component.html',
  styleUrls: ['./form-fornecedor.component.scss']
})
export class FormFornecedorComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  MASKS = MASKS;

  estados: Array<SelectItem> = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
  ];

  textoDocumento: string = 'CPF (requirido)';
  valRadio: string = '';
  valCheck: string[] = [];
  estadoSelecionado: any;

  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido',
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.configurarFornecedorForm();
  }

  ngAfterViewInit(): void {
    this.getTipoFornecedorForm().valueChanges.subscribe( () => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao();
      this.validarFormulario();
    });
    this.configurarElementosValidacao();
  }

  configurarElementosValidacao(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  validarFormulario(): void {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    if(this.getTipoFornecedorForm().value === '1' && this.displayMessage['documento'].length) {
      this.displayMessage['documento'] = 'CPF em formato inválido';
    }
    else if(this.getTipoFornecedorForm().value === '2' && this.displayMessage['documento'].length) {
      this.displayMessage['documento'] = 'CNPJ em formato inválido';
    }
    this.mudancasNaoSalvas = true;
  }

  trocarValidacaoDocumento(): void {
    if(this.getTipoFornecedorForm().value === '1') {
      this.getDocumentoForm().clearValidators();
      this.getTipoFornecedorForm().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = 'CPF (requerido)';
    }
    else {
      this.getDocumentoForm().clearValidators();
      this.getTipoFornecedorForm().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = 'CNPJ (requerido)';
    }
  }

  getTipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.controls['tipoFornecedor'];
  }

  getDocumentoForm(): AbstractControl {
    return this.fornecedorForm.controls['documento'];
  }

  configurarFornecedorForm(): void {
    this.fornecedorForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      documento: ['', [NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      endereco: this.formBuilder.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });

    this.fornecedorForm.patchValue({ ativo: true, tipoFornecedor: '1' });
  }

  adicionarFornecedor(): void {
    console.log(this.fornecedorForm.value);

  }



}
