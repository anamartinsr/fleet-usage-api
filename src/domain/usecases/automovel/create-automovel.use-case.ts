export interface IAutomovelRepository {
  create(data: { plate: string; color: string; brand: string }): Promise<any>;
}

export class CreateAutomovelUseCase {
  constructor(private readonly repo: IAutomovelRepository) {}

  async execute(data: { plate: string; color: string; brand: string }) {
    return this.repo.create({
      plate: data.plate,
      color: data.color,
      brand: data.brand,
    });
  }
}
