import { Module } from '@nestjs/common'
import { OpenaiService } from './openai/openai.service'
import { ChatbotController } from './chatbot/chatbot.controller'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [ChatbotController],
  providers: [OpenaiService],
})
export class AppModule {}
