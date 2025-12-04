export interface IUsageRepository {
  findActiveByDriver(driverId: string): Promise<any>;
}

export class CheckDriverAvailabilityUseCase {
  constructor(private readonly repo: IUsageRepository) {}

  async execute(driverId: string) {
    return this.repo.findActiveByDriver(driverId);
  }
}
