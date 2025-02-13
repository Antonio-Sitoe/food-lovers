export class CategoryNotExistError extends Error {
  constructor() {
    super('Category does not exist')
  }
}
