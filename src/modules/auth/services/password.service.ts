import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class PasswordService {
  public async compare(plainText: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plainText, encrypted);
  }
}
