import { ListDriversUseCase } from "../../../../src/domain/usecases/driver/list-driver-use-case";
import { DriverRepository } from "../../../../src/infrastructure/database/memory/driver.repository";

describe("ListDriversUseCase", () => {
  it("should list drivers with name filter", async () => {
    const repo = new DriverRepository();
    await repo.create({ name: "Ana" });
    await repo.create({ name: "Paula" });

    const useCase = new ListDriversUseCase(repo);

    const result = await useCase.execute({ name: "ana" });

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Ana");
  });

  it("should return all drivers if no filter is provided", async () => {
    const repo = new DriverRepository();
    await repo.create({ name: "Ana" });
    await repo.create({ name: "Paula" });

    const useCase = new ListDriversUseCase(repo);

    const result = await useCase.execute({});

    expect(result.length).toBe(2);
  });
});
