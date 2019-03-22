export interface LoginUser {
    name: string;
    email: string;
    accessToken: string
}
// se não tem métodos, ou se é só para tipagem(nosso caso) use interface, não classe