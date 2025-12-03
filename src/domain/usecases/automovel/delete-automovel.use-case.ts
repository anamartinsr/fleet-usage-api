export class DeleteAutomovelUseCase {
  constructor(private readonly repo: any) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}
