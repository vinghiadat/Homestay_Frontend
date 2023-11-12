export class User {
  constructor(
    public id: number | null = null,
    public username: string = '',
    public name: string = '',
    public password: string = '',
    public phone: string = '',
    public email: string = '',
    public gender: number,
    public birthday: string = ''
  ) {}

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}
