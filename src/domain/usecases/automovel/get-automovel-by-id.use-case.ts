export interface IAutomovelRepository {
  findById(id: string): Promise<any>;
}

export class GetAutomovelByIdUseCase {
  constructor(private readonly repo: IAutomovelRepository) {}

  async execute(id: string) {
    return this.repo.findById(id);
  }
}
