export class LocalStorage {
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('usuario') || '');
    }

    public salvarDadosLocaisUsuario(resposta: any) {
        this.salvarTokenUsuario(resposta.accessToken);
        this.salvarUsuario(resposta.userToken);
    }

    public LimparDadosLocaisUsuario() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('token') || '';
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('token', token);
    }

    public salvarUsuario(usuario: string) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
}
