export class User {
  constructor(
    private username: string = '',
    private name: string = '',
    private password: string = '',
    private phone: string = '',
    private email: string = '',
    private gender: number,
    private birthday: string = ''
  ) {}

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}
