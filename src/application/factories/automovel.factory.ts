import { AutomovelController } from "../../application/controllers/automovel.controller";
import { automovelRepository } from "../../infrastructure/database/memory/repositories";

import { CreateAutomovelUseCase } from "../../domain/usecases/automovel/create-automovel.use-case";
import { UpdateAutomovelUseCase } from "../../domain/usecases/automovel/update-automovel.use-case";
import { DeleteAutomovelUseCase } from "../../domain/usecases/automovel/delete-automovel.use-case";
import { GetAutomovelByIdUseCase } from "../../domain/usecases/automovel/get-automovel-by-id.use-case";
import { ListAutomoveisUseCase } from "../../domain/usecases/automovel/list-automoveis-use-case";

export function makeAutomovelController() {
  return new AutomovelController(
    new CreateAutomovelUseCase(automovelRepository),
    new UpdateAutomovelUseCase(automovelRepository),
    new DeleteAutomovelUseCase(automovelRepository),
    new GetAutomovelByIdUseCase(automovelRepository),
    new ListAutomoveisUseCase(automovelRepository)
  );
}
