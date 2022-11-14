import { StringUtils } from './../../shared/utils/string-utils';
import { ActivatedRoute, Router } from '@angular/router'
import {
	Component,
	OnInit,
	ElementRef,
	ViewChildren,
	AfterViewInit,
} from '@angular/core'
import {
	FormBuilder,
	FormControlName,
	FormGroup,
	Validators,
} from '@angular/forms'
import { SelectItem } from 'primeng/api'
import { fromEvent, merge, Observable } from 'rxjs'
import { FornecedorService } from 'src/app/fornecedor/services/fornecedor.service'
import {
	DisplayMessage,
	GenericValidator,
	ValidationMessages,
} from 'src/app/shared/utils/generic-form-validation'
import { IFornecedor, Produto } from '../models/produto.model'
import { Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper'
import { ProdutoService } from '../services/produto.service'

@Component({
	selector: 'app-form-produto',
	templateUrl: './form-produto.component.html',
	styleUrls: ['./form-produto.component.scss'],
})
export class FormProdutoComponent implements OnInit, AfterViewInit {
	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;

	fornecedor: IFornecedor
	fornecedores: Array<SelectItem> = []

	produto: Produto
	produtoForm: FormGroup

	validationMessages: ValidationMessages
	genericValidator: GenericValidator
	displayMessage: DisplayMessage = {}
	mudancasNaoSalvas: boolean

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private fornecedorService: FornecedorService,
		private produtoService: ProdutoService
	) {
		this.validationMessages = {
			fornecedor: {
				required: 'Informe um Fornecedor',
			},
			nome: {
				required: 'Informe o Nome',
				minLength: 'Deve ter mais de 2 caracteres.',
				maxLength: 'O limite é de 200 caracteres.',
			},
			descricao: {
				required: 'Informe o Logradouro',
				minLength: 'Deve ter mais de 2 caracteres.',
				maxLength: 'O limite é de 1000 caracteres.',
			},
			valor: {
				required: 'Informe um valor.',
			},
		}

		this.genericValidator = new GenericValidator(this.validationMessages)
	}

	ngOnInit(): void {
		this.configurarProdutoForm()
		this.carregarDropdownFornecedores()
		if (this.activatedRoute.snapshot.data['produto']) {
			this.produto = this.activatedRoute.snapshot.data['produto']
			this.produtoForm.patchValue(this.produto)
			this.fornecedor = {
				nomeFornecedor: this.produto.nomeFornecedor,
				fornecedorId: this.produto.fornecedorId,
			}
			this.produtoForm.controls['fornecedorForm'].patchValue({
				fornecedor: this.fornecedor,
			})
			console.log(this.produtoForm.value)
		} else {
			this.produto = new Produto()
		}
	}

	ngAfterViewInit(): void {
		this.configurarElementosValidacao()
	}

	configurarProdutoForm(): void {
		this.produtoForm = this.formBuilder.group({
			id: [],
			fornecedorId: [''],
			nome: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(200),
				],
			],
			descricao: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(1000),
				],
			],
			imagemUpload: [''],
			imagem: [''],
			valor: ['', [Validators.required]],
			dataCadastro: [''],
			ativo: [''],
			nomeFornecedor: [''],
			fornecedorForm: this.formBuilder.group({
				fornecedor: [null, Validators.required],
			}),
		})

		this.produtoForm.patchValue({ ativo: true })
	}

	configurarElementosValidacao(): void {
		let controlBlurs: Observable<any>[] = this.formInputElements.map(
			(formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
		)

		merge(...controlBlurs).subscribe(() => {
			this.validarFormulario()
		})
	}

	validarFormulario(): void {
		this.displayMessage = this.genericValidator.processarMensagens(
			this.produtoForm
		)
		this.mudancasNaoSalvas = true
	}

	carregarDropdownFornecedores(): void {
		this.fornecedorService.obterTodos().subscribe(
			(resposta) => {
				this.fornecedores = resposta.map((fornecedor) => {
					return {
						label: fornecedor.nome,
						value: {
							nomeFornecedor: fornecedor.nome,
							fornecedorId: fornecedor.id,
						},
					}
				})
			},
			(error) => console.error(error)
		)
	}

	adicionarProduto(): void {
		this.produto = Object.assign(this.produto, this.produtoForm.value);

		this.produto.fornecedorId = this.produtoForm.controls['fornecedorForm'].value.fornecedor.fornecedorId;
		this.produto.nomeFornecedor = this.produtoForm.controls['fornecedorForm'].value.fornecedor.nomeFornecedor;
		delete this.produto.id;
		delete this.produto.dataCadastro;
		delete this.produto.fornecedorForm;
		this.produto.imagem = this.imagemNome;
		this.produto.imagemUpload = this.croppedImage.split(',')[1];
		this.produto.valor = StringUtils.StringParaDecimal(this.produto.valor);

		this.produtoService.novoProduto(this.produto).subscribe(
			() => {
				this.router.navigate(['produtos']);
			},
			(error) => console.error(error)
		)
	}

	fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
		console.log('erro');

    // this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }

}
