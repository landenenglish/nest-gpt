import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('No token found')
    }

    try {
      const decodedToken = await this.authService.verifyToken(token)
      request.user = decodedToken
      return true
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization']
    if (!authHeader) {
      return null
    }
    const [type, token] = authHeader.split(' ')
    return type === 'Bearer' ? token : null
  }
}
