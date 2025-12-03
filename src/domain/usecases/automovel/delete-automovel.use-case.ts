export interface IAutomovelRepository {
  delete(id: string): Promise<void>;
}

export class DeleteAutomovelUseCase {
  constructor(private readonly repo: IAutomovelRepository) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}
