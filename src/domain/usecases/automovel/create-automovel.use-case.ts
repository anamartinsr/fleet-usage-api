export class CreateAutomovelUseCase {
  constructor(private readonly repo: any) {}

  async execute(data: { plate: string; color: string; brand: string }) {
    return this.repo.create({
      plate: data.plate,
      color: data.color,
      brand: data.brand,
    });
  }
}
