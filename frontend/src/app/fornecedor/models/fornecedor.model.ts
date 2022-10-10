import { Endereco } from './endereco.model';

export class Fornecedor {
  id: string;
  nome: string;
  documento: string;
  ativo: string;
  tipoFornecedor: number;
  endereco: Endereco;
}
