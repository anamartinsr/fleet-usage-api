export class ListAutomoveisUseCase {
  constructor(private readonly repo: any) {}

  async execute(filters?: { color?: string; brand?: string }) {
    return this.repo.findAll(filters);
  }
}