import { DeleteDriverUseCase } from "../../../../src/domain/usecases/driver/delete-driver.use-case";
import { DriverRepository } from "../../../../src/infrastructure/database/memory/driver.repository";

describe("DeleteDriverUseCase", () => {
  it("should delete a driver", async () => {
    const repo = new DriverRepository();
    const create = await repo.create({ name: "Ana" });

    const useCase = new DeleteDriverUseCase(repo);

    await useCase.execute(create.id);

    const all = await repo.findAll();
    expect(all.length).toBe(0);
  });

  it("should throw if driver does not exist", async () => {
    const repo = new DriverRepository();
    const useCase = new DeleteDriverUseCase(repo);

    await expect(useCase.execute("fake-id")).rejects.toThrow("Driver not found");
  });
});
