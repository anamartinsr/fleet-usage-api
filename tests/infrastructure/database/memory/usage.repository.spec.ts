import { UsageRepository } from "../../../../src/infrastructure/database/memory/usage.repository";

describe("UsageRepository (in-memory)", () => {
  it("should create a new usage", async () => {
    const repo = new UsageRepository();

    const usage = await repo.create({
      startDate: new Date(),
      reason: "Test",
      driverId: "D1",
      automovelId: "A1",
    });

    expect(usage).toHaveProperty("id");
    expect(usage.endDate).toBeNull();
  });

  it("should end a usage", async () => {
    const repo = new UsageRepository();

    const u = await repo.create({
      startDate: new Date(),
      reason: "Route",
      driverId: "D1",
      automovelId: "A1",
    });

    const ended = await repo.endUsage(u.id);

    expect(ended.endDate).not.toBeNull();
  });

  it("should filter by driverId", async () => {
    const repo = new UsageRepository();

    await repo.create({
      startDate: new Date(),
      reason: "A",
      driverId: "D1",
      automovelId: "A1",
    });

    await repo.create({
      startDate: new Date(),
      reason: "B",
      driverId: "D2",
      automovelId: "A2",
    });

    const result = await repo.findAll({ driverId: "D1" });

    expect(result.length).toBe(1);
    expect(result[0].driverId).toBe("D1");
  });

  it("should filter active usages", async () => {
    const repo = new UsageRepository();

    const u1 = await repo.create({
      startDate: new Date(),
      reason: "Active",
      driverId: "D1",
      automovelId: "A1",
    });

    await repo.endUsage(u1.id);

    const active = await repo.findAll({ active: true });

    expect(active.length).toBe(0);
  });

  it("should find active usage by driver", async () => {
    const repo = new UsageRepository();

    await repo.create({
      startDate: new Date(),
      reason: "X",
      driverId: "D1",
      automovelId: "A1",
    });

    const result = await repo.findActiveByDriver("D1");

    expect(result).not.toBeNull();
    expect(result?.driverId).toBe("D1");
  });

  it("should find active usage by car", async () => {
    const repo = new UsageRepository();

    await repo.create({
      startDate: new Date(),
      reason: "Trip",
      driverId: "D9",
      automovelId: "A9",
    });

    const result = await repo.findActiveByAutomovel("A9");

    expect(result).not.toBeNull();
    expect(result?.automovelId).toBe("A9");
  });
});
