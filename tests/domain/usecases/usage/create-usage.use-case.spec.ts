import { UsageRepository } from "../../../../src/infrastructure/database/memory/usage.repository";
import { CreateUsageUseCase } from "../../../../src/domain/usecases/usage/create-usage.use-case";
import { CheckDriverAvailabilityUseCase } from "../../../../src/domain/usecases/usage/check-driver-usage.use-case";
import { CheckAutomovelAvailabilityUseCase } from "../../../../src/domain/usecases/usage/check-automovel-usage.use-case";

describe("CreateUsageUseCase", () => {
  it("should create a new usage when driver and car are free", async () => {
    const repo = new UsageRepository();
    const checkDriver = new CheckDriverAvailabilityUseCase(repo);
    const checkCar = new CheckAutomovelAvailabilityUseCase(repo);

    const useCase = new CreateUsageUseCase(repo, checkDriver, checkCar);

    const data = {
      startDate: new Date(),
      reason: "Delivery",
      driverId: "D1",
      automovelId: "A1",
    };

    const created = await useCase.execute(data);

    expect(created).toHaveProperty("id");
    expect(created.reason).toBe("Delivery");
    expect(created.endDate).toBeNull();
  });

  it("should throw if driver already has active usage", async () => {
    const repo = new UsageRepository();
    const checkDriver = new CheckDriverAvailabilityUseCase(repo);
    const checkCar = new CheckAutomovelAvailabilityUseCase(repo);

    const useCase = new CreateUsageUseCase(repo, checkDriver, checkCar);

    await repo.create({
      startDate: new Date(),
      reason: "Test",
      driverId: "D1",
      automovelId: "A1",
    });

    await expect(
      useCase.execute({
        startDate: new Date(),
        reason: "New",
        driverId: "D1",
        automovelId: "A2",
      })
    ).rejects.toThrow("Driver already using another vehicle");
  });

  it("should throw if car is already in use", async () => {
    const repo = new UsageRepository();
    const checkDriver = new CheckDriverAvailabilityUseCase(repo);
    const checkCar = new CheckAutomovelAvailabilityUseCase(repo);

    const useCase = new CreateUsageUseCase(repo, checkDriver, checkCar);

    await repo.create({
      startDate: new Date(),
      reason: "Test",
      driverId: "D2",
      automovelId: "A1",
    });

    await expect(
      useCase.execute({
        startDate: new Date(),
        reason: "New",
        driverId: "D3",
        automovelId: "A1",
      })
    ).rejects.toThrow("Car already in use");
  });
});
