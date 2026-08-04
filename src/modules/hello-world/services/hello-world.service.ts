import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloWorldService {
  constructor() {}

  public getHelloWorld(isAdmin: boolean = false): string {
    if (isAdmin) {
      return "Hello, Admin!";
    }
    return "Hello, World!";
  }
}
