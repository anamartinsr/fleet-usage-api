import { ListAutomoveisUseCase } from "../../../../src/domain/usecases/automovel/list-automoveis-use-case";
import { AutomovelRepository } from "../../../../src/infrastructure/database/memory/automovel.repository";

describe("ListAutomoveisUseCase", () => {
  it("should list and filter by color", async () => {
    const repo = new AutomovelRepository();

    await repo.create({ plate: "A1", color: "Black", brand: "Honda" });
    await repo.create({ plate: "A2", color: "Silver", brand: "Toyota" });

    const useCase = new ListAutomoveisUseCase(repo);

    const result = await useCase.execute({ color: "Black" });

    expect(result.length).toBe(1);
    expect(result[0].color).toBe("Black");
  });

  it("should list and filter by brand", async () => {
    const repo = new AutomovelRepository();

    await repo.create({ plate: "B1", color: "Gray", brand: "BMW" });
    await repo.create({ plate: "B2", color: "Gray", brand: "Honda" });

    const useCase = new ListAutomoveisUseCase(repo);

    const result = await useCase.execute({ brand: "Honda" });

    expect(result.length).toBe(1);
    expect(result[0].brand).toBe("Honda");
  });
});
