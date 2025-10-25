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

  static async handleCallback(code: string): Promise<{token: string }> {
    const tokenParams = {
      code,
      redirect_uri: oauthConfig.redirectUri,
      scope: "public",
    };

    const accessToken = await client.getToken(tokenParams);
    const token  = accessToken.token.access_token as string;

    // Pega perfil do usuário
    const response = await fetch(`${oauthConfig.auth.tokenHost}/v2/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profile: IntraProfile = await response.json();

    // Procura ou cria usuário                            //intraId: profile.id
    let cadete = await prisma.cadetes.findUnique({ where: { id: profile.id } });
    if (!cadete) {
      cadete = await prisma.cadetes.create({
        data: {
          id: profile.id,
          email: profile.email,
          username: profile.login,
          //role: "cadete",
        }
      });
    }

    // Gera teu JWT
    const jwtToken = jwt.sign(
      { userId: cadete.id, intraId: cadete.id},
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return {token: jwtToken };
  }
}
