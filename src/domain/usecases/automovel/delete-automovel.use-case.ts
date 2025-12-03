export class DeleteAutomovelUseCase {
  constructor(private readonly repo) {}

  async execute(id) {
    await this.repo.delete(id);
  }
}
