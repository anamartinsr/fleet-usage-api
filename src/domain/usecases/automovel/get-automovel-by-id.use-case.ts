export class GetAutomovelByIdUseCase {
  constructor(private readonly repo: any) {}

  async execute(id: string) {
    return this.repo.findById(id);
  }
}
