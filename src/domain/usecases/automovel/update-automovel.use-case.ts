export interface IAutomovelRepository {
   update(id: string, data: { plate: string; color: string; brand: string }): Promise<any>;
}

export class UpdateAutomovelUseCase {
  constructor(private readonly repo: IAutomovelRepository) {}

  async execute(data: { id: string; plate: string; color: string; brand: string }) {
    return this.repo.update(data.id, {
      plate: data.plate,
      color: data.color,
      brand: data.brand
    });
  }
}
