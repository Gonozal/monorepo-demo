export class RuleNotFoundError extends Error {
  constructor(id: string) {
    super(`Rule with id ${id} not found`);
  }
}

export class DuplicateRuleError extends Error {
  constructor(id: string) {
    super(`Rule with id ${id} already exists`);
  }
}
