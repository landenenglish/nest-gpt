import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { OpenaiService } from '../openai/openai.service'
import { FirebaseAuthGuard } from 'src/auth/auth.guard'

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly openaiService: OpenaiService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('ask')
  async askQuestion(@Body('prompt') prompt: string) {
    const response = await this.openaiService.generateResponse(prompt)
    return { response }
  }
}
