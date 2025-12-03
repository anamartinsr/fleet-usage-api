export interface IAutomovelRepository {
  findAll(filters?: { color?: string; brand?: string }): Promise<any[]>;
}
export class ListAutomoveisUseCase {
  constructor(private readonly repo: IAutomovelRepository) {}

  async execute(filters?: { color?: string; brand?: string }) {
    return this.repo.findAll(filters);
  }
}