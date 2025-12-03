export class UpdateAutomovelUseCase {
  constructor(private readonly repo: any) {}

  async execute(data: { id: string; plate: string; color: string; brand: string }) {
    return this.repo.update(data.id, {
      plate: data.plate,
      color: data.color,
      brand: data.brand
    });
  }
}
