import { UsageRepository } from "../../../../src/infrastructure/database/memory/usage.repository";
import { EndUsageUseCase } from "../../../../src/domain/usecases/usage/end-usage.use-case";

describe("EndUsageUseCase", () => {
  it("should end a usage and set endDate", async () => {
    const repo = new UsageRepository();
    const useCase = new EndUsageUseCase(repo);

    const created = await repo.create({
      startDate: new Date(),
      reason: "Route",
      driverId: "D1",
      automovelId: "A1",
    });

    const ended = await useCase.execute(created.id);

    expect(ended.endDate).not.toBeNull();
  });

  it("should throw when usage does not exist", async () => {
    const repo = new UsageRepository();
    const useCase = new EndUsageUseCase(repo);

    await expect(useCase.execute("invalid-id")).rejects.toThrow(
      "Usage not found"
    );
  });
});
