export interface IUsageRepository {
  findActiveByAutomovel(automovelId: string): Promise<any>;
}

export class CheckAutomovelAvailabilityUseCase {
  constructor(private readonly repo: IUsageRepository) {}

  async execute(automovelId: string) {
    return this.repo.findActiveByAutomovel(automovelId);
  }
}
