export class ListAutomoveisUseCase {
  constructor(private readonly repo) {}

  async execute(filters) {
    return this.repo.findAll(filters);
  }
}
