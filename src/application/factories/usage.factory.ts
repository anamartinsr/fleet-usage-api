import { usageRepository } from "../../infrastructure/database/memory/usage.repository";

import { CreateUsageUseCase } from "../../domain/usecases/usage/create-usage.use-case";
import { EndUsageUseCase } from "../../domain/usecases/usage/end-usage.use-case";
import { ListUsagesUseCase } from "../../domain/usecases/usage/list-usage.use-case";
import { CheckDriverAvailabilityUseCase } from "../../domain/usecases/usage/check-driver-usage.use-case";
import { CheckAutomovelAvailabilityUseCase } from "../../domain/usecases/usage/check-automovel-usage.use-case";

import { UsageController } from "../../application/controllers/usage.controller";

export function makeUsageController() {
  const checkDriver = new CheckDriverAvailabilityUseCase(usageRepository);
  const checkCar = new CheckAutomovelAvailabilityUseCase(usageRepository);

  return new UsageController(
    new CreateUsageUseCase(usageRepository, checkDriver, checkCar),
    new EndUsageUseCase(usageRepository),
    new ListUsagesUseCase(usageRepository)
  );
}
