import { UpdateDriverUseCase } from "../../../../src/domain/usecases/driver/update-driver.use-case";
import { DriverRepository } from "../../../../src/infrastructure/database/memory/driver.repository";

describe("UpdateDriverUseCase", () => {
  it("should update a driver", async () => {
    const repo = new DriverRepository();
    const created = await repo.create({ name: "Ana" });

    const useCase = new UpdateDriverUseCase(repo);

    const result = await useCase.execute({
      id: created.id,
      name: "Ana Updated",
    });

    expect(result.name).toBe("Ana Updated");
  });

  it("should throw if driver does not exist", async () => {
    const repo = new DriverRepository();
    const useCase = new UpdateDriverUseCase(repo);

    await expect(
      useCase.execute({ id: "fake-id", name: "Test" })
    ).rejects.toThrow("Driver not found");
  });
});
