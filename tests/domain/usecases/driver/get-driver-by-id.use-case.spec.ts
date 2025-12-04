import { GetDriverByIdUseCase } from "../../../../src/domain/usecases/driver/get-driver-by-id.use-case";
import { DriverRepository } from "../../../../src/infrastructure/database/memory/driver.repository";

describe("GetDriverByIdUseCase", () => {
  it("should return a driver by id", async () => {
    const repo = new DriverRepository();
    const created = await repo.create({ name: "Ana" });

    const useCase = new GetDriverByIdUseCase(repo);

    const result = await useCase.execute(created.id);

    expect(result).toEqual(created);
  });

  it("should return null if driver does not exist", async () => {
    const repo = new DriverRepository();
    const useCase = new GetDriverByIdUseCase(repo);

    const result = await useCase.execute("fake-id");

    expect(result).toBeNull();
  });
});
