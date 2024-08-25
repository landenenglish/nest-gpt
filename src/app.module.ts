import { Module } from '@nestjs/common'
import { OpenaiService } from './openai/openai.service'
import { ChatbotController } from './chatbot/chatbot.controller'

@Module({
  imports: [],
  controllers: [ChatbotController],
  providers: [OpenaiService],
})
export class AppModule {}
