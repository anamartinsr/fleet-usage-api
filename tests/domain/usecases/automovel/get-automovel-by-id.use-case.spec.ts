import { GetAutomovelByIdUseCase } from "../../../../src/domain/usecases/automovel/get-automovel-by-id.use-case";
import { AutomovelRepository } from "../../../../src/infrastructure/database/memory/automovel.repository";

describe("GetAutomovelByIdUseCase", () => {
  it("should return a vehicle by id", async () => {
    const repo = new AutomovelRepository();

    const created = await repo.create({
      plate: "XYZ-0000",
      color: "Azul",
      brand: "Ford"
    });

    const useCase = new GetAutomovelByIdUseCase(repo);

    const result = await useCase.execute(created.id);

    expect(result?.id).toBe(created.id);
  });
});
