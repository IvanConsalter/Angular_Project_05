export class LocalStorage {
	public obterUsuario(): any {
		return JSON.parse(localStorage.getItem('usuario')!);
	}

	public salvarDadosLocaisUsuario(resposta: any) {
		this.salvarTokenUsuario(resposta.accessToken)
		this.salvarUsuario(resposta.userToken)
	}

	public limparDadosLocaisUsuario() {
		localStorage.removeItem('token')
		localStorage.removeItem('usuario')
	}

	public obterTokenUsuario(): any {
		return localStorage.getItem('token');
	}

	public salvarTokenUsuario(token: string) {
		localStorage.setItem('token', token)
	}

	public salvarUsuario(usuario: string) {
		localStorage.setItem('usuario', JSON.stringify(usuario))
	}
}
