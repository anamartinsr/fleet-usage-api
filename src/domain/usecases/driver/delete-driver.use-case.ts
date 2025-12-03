export interface IDriverRepository {
  delete(id: string): Promise<void>;
}

export class DeleteDriverUseCase {
  constructor(private readonly repo: IDriverRepository) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}
