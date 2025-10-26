import { oauthConfig } from "./auth.config";
import OAuth2 from "simple-oauth2";
//import prisma from "../../plugins/prisma"; // ou import { PrismaClient } from "@prisma/client";
//import { IntraProfile, IUser } from "./user.interface";
import {IntraProfile, IUser} from "../cadetes/cadete.interface"
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const client = new OAuth2.AuthorizationCode({
  client: {
    id: oauthConfig.client.id,
    secret: oauthConfig.client.secret,
  },
  auth: {
    tokenHost: oauthConfig.auth.tokenHost,
    tokenPath: oauthConfig.auth.tokenPath,
    authorizePath: oauthConfig.auth.authorizePath,
  },
});

export class AuthService {
  static async generateAuthUrl(): Promise<string> {
    const authorizationUri = client.authorizeURL({
      redirect_uri: oauthConfig.redirectUri,
      scope: "public",
      state: "42IntraState",
    });
    return authorizationUri;
  }

    static async handleCallback(code: string) {
      try {
        const tokenParams = {
          code,
          redirect_uri: oauthConfig.redirectUri, // Esta deve estar EXACTAMENTE igual ao painel da 42
          grant_type: "authorization_code",
        };

        const accessToken: any = await client.getToken(tokenParams);
        const token = accessToken.token.access_token as string;

        const response = await fetch("https://api.intra.42.fr/v2/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar perfil no Intra 42");
        }

        const profile = await response.json();

        return {
          name: profile.usual_full_name,
          username: profile.login,
          email: profile.email,
          id: profile.id,
        };

      } catch (error: any) {
        console.error("Erro no callback OAuth:", error.response?.data || error);
        throw new Error("Falha na autenticação com o Intra 42");
      }
  }
}
