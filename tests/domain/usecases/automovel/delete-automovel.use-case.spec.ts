import { DeleteAutomovelUseCase } from "../../../../src/domain/usecases/automovel/delete-automovel.use-case";
import { AutomovelRepository } from "../../../../src/infrastructure/database/memory/automovel.repository";

describe("DeleteAutomovelUseCase", () => {
  it("should delete a vehicle", async () => {
    const repo = new AutomovelRepository();

    const created = await repo.create({
      plate: "BBB-2222",
      color: "Black",
      brand: "Hyundai",
    });

    const useCase = new DeleteAutomovelUseCase(repo);

    await useCase.execute(created.id);

    const result = await repo.findById(created.id);
    expect(result).toBeNull();
  });

  it("should throw if vehicle does not exist", async () => {
    const repo = new AutomovelRepository();
    const useCase = new DeleteAutomovelUseCase(repo);

    await expect(useCase.execute("invalid")).rejects.toThrow("Vehicle not found");
  });
});
