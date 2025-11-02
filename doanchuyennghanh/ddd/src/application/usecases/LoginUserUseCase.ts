
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { TokenService } from "../../infrastructure/security/TokenService";
export class LoginUserUseCase {
    private userRepository: UserRepository;
    private tokenService: TokenService;
    constructor(userRepository: UserRepository, tokenService: TokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (password !== user.password) throw new Error("Mật khẩu không chính xác.");
        if (user.role != "admin") {
            throw new Error("không có quyền  truy cập vào trang admin ");
        }
        const accessToken = this.tokenService.generateToken({ id: user.id, email: user.email, password: user.password });
        const refreshToken = this.tokenService.regenerateRefreshToken({ id: user.id, email: user.email, password: user.password });
        await this.userRepository.updateTokens(user.id, accessToken, refreshToken);
        console.log(user);
        if (user.role === "admin") {
            return {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    token: accessToken,
                },

            };
        } else {
            return { user: "khong phai admin" }
        }
    }
}
