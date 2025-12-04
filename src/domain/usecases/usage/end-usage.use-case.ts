export interface IUsageRepository {
  endUsage(id: string): Promise<any>;
}

export class EndUsageUseCase {
  constructor(private readonly repo: IUsageRepository) {}

  async execute(id: string) {
    return this.repo.endUsage(id);
  }
}
