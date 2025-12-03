export class GetAutomovelByIdUseCase {
  constructor(private readonly repo) {}

  async execute(id) {
    return this.repo.findById(id);
  }
}
