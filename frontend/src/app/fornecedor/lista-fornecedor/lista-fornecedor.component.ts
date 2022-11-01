import { Component, OnInit } from '@angular/core'
import { Table } from 'primeng/table'
import { Fornecedor } from '../models/fornecedor.model'
import { FornecedorService } from '../services/fornecedor.service'

@Component({
	selector: 'app-lista-fornecedor',
	templateUrl: './lista-fornecedor.component.html',
	styleUrls: ['./lista-fornecedor.component.scss'],
})
export class ListaFornecedorComponent implements OnInit {

	mostrarDialogExclusao: boolean = false;
	colunas: any[] = [
		{ field: 'nome', header: 'Nome' },
		{ field: 'documento', header: 'Documento' },
		{ field: 'ativo', header: 'Ativo' },
	]

	fornecedor: Fornecedor;
	fornecedores: Array<Fornecedor> = []

	constructor(private fornecedorService: FornecedorService) {}

	ngOnInit(): void {
    this.consultarFornecedores();
  }

  consultarFornecedores(): void {
    this.fornecedorService.obterTodos().subscribe(
      (resposta) => {
        this.fornecedores = resposta;
      },
      (error) => console.log(error)
    )
  }

	excluirFornecedor(fornecedor: Fornecedor): void {
		this.fornecedor = {...fornecedor};
		this.mostrarDialogExclusao = true;
	}

	confirmarExclusaoFornecedor(): void {
		this.fornecedorService.excluirFornecedor(this.fornecedor).subscribe(
			() => {
				this.consultarFornecedores();
				this.mostrarDialogExclusao = false;
			},
			(error) => console.error(error)
		)
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
	}
}
