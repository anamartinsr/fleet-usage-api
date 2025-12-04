import { DriverRepository } from "../../../../src/infrastructure/database/memory/driver.repository";

describe("DriverRepository (in-memory)", () => {
  it("should store and return drivers", async () => {
    const repo = new DriverRepository();

    const driver = await repo.create({
      name: "John Doe",
    });

    const result = await repo.findAll(undefined);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("John Doe");
    expect(result[0]).toHaveProperty("id");
  });

  it("should update a driver", async () => {
    const repo = new DriverRepository();

    const created = await repo.create({
      name: "Ana",
    });

    await repo.update(created.id, {
      name: "Ana Paula",
    });

    const updated = await repo.findById(created.id);

    expect(updated?.name).toBe("Ana Paula");
  });

  it("should delete a driver", async () => {
    const repo = new DriverRepository();

    const created = await repo.create({
      name: "Test User",
    });

    await repo.delete(created.id);

    const result = await repo.findAll();

    expect(result.length).toBe(0);
  });

  it("should throw when updating a non-existing driver", async () => {
    const repo = new DriverRepository();

    await expect(
      repo.update("invalid-id", { name: "Does not matter" })
    ).rejects.toThrow("Driver not found");
  });

  it("should throw when deleting a non-existing driver", async () => {
    const repo = new DriverRepository();

    await expect(repo.delete("invalid-id")).rejects.toThrow("Driver not found");
  });

  it("should filter drivers by name (case insensitive)", async () => {
    const repo = new DriverRepository();

    await repo.create({ name: "Ana Paula" });
    await repo.create({ name: "Carla" });
    await repo.create({ name: "Anabelle" });

    const result = await repo.findAll({ name: "ana" });

    expect(result.length).toBe(2);
    expect(result[0].name).toContain("Ana");
  });
});
