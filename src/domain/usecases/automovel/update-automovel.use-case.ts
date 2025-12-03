export class UpdateAutomovelUseCase {
  constructor(private readonly repo) {}

  async execute(data) {
    return this.repo.update(data.id, {
      plate: data.plate,
      color: data.color,
      brand: data.brand,
    });
  }
}
