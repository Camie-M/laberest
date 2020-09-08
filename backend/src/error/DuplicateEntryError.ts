import { BaseError } from "./BaseError";

export class DuplicateEntryError extends BaseError {
  constructor(message: string) {
    super(message, 409);
  }
}
