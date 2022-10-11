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
	colunas: any[] = [
		{ field: 'nome', header: 'Nome' },
		{ field: 'documento', header: 'Documento' },
		{ field: 'ativo', header: 'Ativo' },
	]

	fornecedores: Array<Fornecedor> = []

	constructor(private fornecedorService: FornecedorService) {}

	ngOnInit(): void {
    this.obterTodos();
  }

  obterTodos(): void {
    this.fornecedorService.obterTodos().subscribe(
      (resposta) => {
        this.fornecedores = resposta;
      },
      (error) => console.log(error)
    )
  }

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
	}
}
