export class UserNotFound extends Error {
  constructor(email: string) {
    super(`The user with email ${email} not found.`);
    this.name = "UserNotFound";
  }
}
