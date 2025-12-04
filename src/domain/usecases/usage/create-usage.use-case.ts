import { CheckDriverAvailabilityUseCase } from "./check-driver-usage.use-case";
import { CheckAutomovelAvailabilityUseCase } from "./check-automovel-usage.use-case";

export interface IUsageRepository {
  create(data: {
    startDate: Date;
    reason: string;
    driverId: string;
    automovelId: string;
  }): Promise<any>;
}

export class CreateUsageUseCase {
  constructor(
    private readonly repo: IUsageRepository,
    private readonly checkDriverAvailability: CheckDriverAvailabilityUseCase,
    private readonly checkAutomovelAvailability: CheckAutomovelAvailabilityUseCase
  ) {}

  async execute(data: {
    startDate: Date;
    reason: string;
    driverId: string;
    automovelId: string;
  }) {
    const driverInUse = await this.checkDriverAvailability.execute(data.driverId);
    if (driverInUse) {
      throw new Error("Driver already using another vehicle");
    }

    const carInUse = await this.checkAutomovelAvailability.execute(data.automovelId);
    if (carInUse) {
      throw new Error("Car already in use");
    }

    return this.repo.create({
      startDate: data.startDate,
      reason: data.reason,
      driverId: data.driverId,
      automovelId: data.automovelId,
    });
  }
}
