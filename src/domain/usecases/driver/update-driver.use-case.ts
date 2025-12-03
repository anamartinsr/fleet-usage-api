export interface IDriverRepository {
  update(id: string, data: { name: string }): Promise<any>;
}

export class UpdateDriverUseCase {
  constructor(private readonly repo: IDriverRepository) {}

  async execute(data: { id: string; name: string }) {
    return this.repo.update(data.id, { name: data.name });
  }
}
