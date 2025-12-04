import { UsageRepository } from "../../../../src/infrastructure/database/memory/usage.repository";
import { ListUsagesUseCase } from "../../../../src/domain/usecases/usage/list-usage.use-case";

describe("ListUsagesUseCase", () => {
  it("should list all usages", async () => {
    const repo = new UsageRepository();
    const useCase = new ListUsagesUseCase(repo);

    await repo.create({
      startDate: new Date(),
      reason: "Trip",
      driverId: "D1",
      automovelId: "A1",
    });

    const result = await useCase.execute();

    expect(result.length).toBe(1);
  });

  it("should filter by driverId", async () => {
    const repo = new UsageRepository();
    const useCase = new ListUsagesUseCase(repo);

    await repo.create({
      startDate: new Date(),
      reason: "X",
      driverId: "D1",
      automovelId: "A1",
    });

    await repo.create({
      startDate: new Date(),
      reason: "Y",
      driverId: "D2",
      automovelId: "A2",
    });

    const result = await useCase.execute({ driverId: "D1" });

    expect(result.length).toBe(1);
    expect(result[0].driverId).toBe("D1");
  });

  it("should filter only active usages", async () => {
    const repo = new UsageRepository();
    const useCase = new ListUsagesUseCase(repo);

    const u1 = await repo.create({
      startDate: new Date(),
      reason: "Active",
      driverId: "D1",
      automovelId: "A1",
    });

    await repo.create({
      startDate: new Date(),
      reason: "Other",
      driverId: "D2",
      automovelId: "A2",
    });

    await repo.endUsage(u1.id);

    const result = await useCase.execute({ active: true });

    expect(result.every(u => u.endDate === null)).toBe(true);
  });
});
