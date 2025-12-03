export class CreateAutomovelUseCase {
  constructor(private readonly repo) {}

  async execute(data) {
    return this.repo.create({
      plate: data.plate,
      color: data.color,
      brand: data.brand,
    });
  }
}
