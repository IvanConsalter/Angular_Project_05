export class Produto {
  id?: string;
  nome: string;
  descricao: string;
  imagemUpload: string;
  imagem: string;
  valor: number;
  dataCadastro?: string;
  ativo: boolean;
  fornecedorForm: any;
  fornecedorId: string;
  nomeFornecedor: string;
}

export interface IFornecedor{
  fornecedorId: string;
  nomeFornecedor: string;
}
