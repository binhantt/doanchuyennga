// src/domain/entities/User.ts
export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public password: string,
    public address: string,
    public phoneNumber: Int16Array,
    public acssToken?: string,
    public refreshToken?: string,
    public role: string = 'user'
  ) {}
}
