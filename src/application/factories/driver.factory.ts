import { DriverController } from "../../application/controllers/driver.controller";
import { driverRepository } from "../../infrastructure/database/memory/driver.repository";

import { CreateDriverUseCase } from "../../domain/usecases/driver/create-driver.use-case";
import { UpdateDriverUseCase } from "../../domain/usecases/driver/update-driver.use-case";
import { DeleteDriverUseCase } from "../../domain/usecases/driver/delete-driver.use-case";
import { GetDriverByIdUseCase } from "../../domain/usecases/driver/get-driver-by-id.use-case";
import { ListDriversUseCase } from "../../domain/usecases/driver/list-driver-use-case";

export function makeDriverController() {
  return new DriverController(
    new CreateDriverUseCase(driverRepository),
    new UpdateDriverUseCase(driverRepository),
    new DeleteDriverUseCase(driverRepository),
    new GetDriverByIdUseCase(driverRepository),
    new ListDriversUseCase(driverRepository)
  );
}
