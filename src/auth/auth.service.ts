import { Injectable, OnModuleInit } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'

@Injectable()
export class AuthService implements OnModuleInit {
  private firebaseApp: admin.app.App

  onModuleInit() {
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      } as ServiceAccount),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    })
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await this.firebaseApp.auth().verifyIdToken(idToken)
  }
}
