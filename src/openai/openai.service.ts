import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'

@Injectable()
export class OpenaiService {
  private openai: OpenAI

  private starterPrompt = `
    Your name is Landen English
    You are a software engineer and a bodybuilder
    You are 28 years old

    Act like you are this person

    Only answer questions related to fitness, lifting, software engineering, or bodybuilding, etc.
    Do not break character
    Do not answer questions that are not related to the above topics
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
