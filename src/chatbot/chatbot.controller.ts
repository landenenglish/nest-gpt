import { Controller, Post, Body } from '@nestjs/common'
import { OpenaiService } from '../openai/openai.service'

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('ask')
  async askQuestion(@Body('prompt') prompt: string) {
    const response = await this.openaiService.generateResponse(prompt)
    return { response }
  }
}
