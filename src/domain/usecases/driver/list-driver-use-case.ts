export interface IDriverRepository {
  findAll(filters: { name?: string }): Promise<any[]>;
}

export class ListDriversUseCase {
  constructor(private readonly repo: IDriverRepository) {}

  async execute(filters: { name?: string }) {
    return this.repo.findAll(filters);
  }
}
