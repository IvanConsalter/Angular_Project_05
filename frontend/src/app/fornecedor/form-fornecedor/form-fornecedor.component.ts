import { StringUtils } from './../../shared/utils/string-utils';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor.model';

import { NgBrazilValidators, MASKS } from 'ng-brazil';
import { CepConsulta } from '../models/cep-consulta.model';
import { FornecedorService } from '../services/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService
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
    console.log(this.activateRoute.snapshot.data['fornecedor']);
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
      this.getDocumentoForm().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = 'CPF (requerido)';
    }
    else {
      this.getDocumentoForm().clearValidators();
      this.getDocumentoForm().setValidators([Validators.required, NgBrazilValidators.cnpj]);
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
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
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
    if(this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);

      this.fornecedor.endereco.cep = StringUtils.onlyNumber(this.fornecedor.endereco.cep);
      this.fornecedor.documento = StringUtils.onlyNumber(this.fornecedor.documento);
      this.fornecedor.tipoFornecedor = +this.fornecedor.tipoFornecedor;

      this.fornecedorService.novoFornecedor(this.fornecedor).subscribe(
        () => {
          this.router.navigate(['/fornecedores']);
        },
        (error) => console.error(error)
      )
    }
  }

  buscarCep(event: any): void {
    let cep = event.value;

    cep = StringUtils.onlyNumber(cep);
    if(cep.length < 8) return;

    this.fornecedorService.consultarCep(cep).subscribe(
      (resposta) => {
        this.preencherEnderecoConsulta(resposta);
      },
      (error) => console.log(error)
    )
  }

  preencherEnderecoConsulta(cep: CepConsulta): void {
    this.fornecedorForm.patchValue({
      endereco: {
        logradouro: cep.logradouro,
        bairro: cep.bairro,
        cep: cep.cep,
        cidade: cep.localidade,
        estado: cep.uf
      }
    })
  }

}
