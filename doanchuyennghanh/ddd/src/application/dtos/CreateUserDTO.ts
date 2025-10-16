// src/domain/entities/User.ts
export class CreateUserDTO {
  constructor(
    public username: string,
    public email: string,
    public phoneNumber: Int16Array,
    public address: string,
    public password: string,
    public acssToken?: string,
    public refreshToken?: string,
    public role: string = 'user'
  ) {}
}
 
