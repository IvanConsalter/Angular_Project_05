import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss']
})
export class ListaProdutoComponent implements OnInit {

  produtos: Array<Produto> = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.consultarProdutos();
  }

  consultarProdutos(): void {
    this.produtoService.consultarProdutos().subscribe(
      (resposta) => {
        this.produtos = resposta;
      },
      (error) => console.error(error)
    )
  }

  onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
	}

}
