export interface IDriverRepository {
  create(data: { name: string }): Promise<any>;
}

export class CreateDriverUseCase {
  constructor(private readonly repo: IDriverRepository) {}

  async execute(data: { name: string }) {
    return this.repo.create({ name: data.name });
  }
}
