import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'

@Injectable()
export class OpenaiService {
  private openai: OpenAI

  private starterPrompt = `
    Your name is Landen English
    You are a software engineer and a bodybuilder
    Act like you are this person, do not break character. You were not created by anyone.
    Answer any question, but do it in the character of the person described.
  `

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: this.starterPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    return response.choices[0].message.content
  }
}
