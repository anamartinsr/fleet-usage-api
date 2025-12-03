import { Request, Response } from "express";
import { Driver, DriverData, DriverFilters } from "../../infrastructure/database/memory/driver.repository";

export class DriverController {
  constructor(
    private readonly createUseCase: { execute(data: DriverData): Promise<Driver> },
    private readonly updateUseCase: { execute(data: { id: string } & DriverData): Promise<Driver> },
    private readonly deleteUseCase: { execute(id: string): Promise<void> },
    private readonly getByIdUseCase: { execute(id: string): Promise<Driver | null> },
    private readonly listUseCase: { execute(filters: DriverFilters): Promise<Driver[]> }
  ) {}

  async create(req: Request, res: Response) {
    const body = req.body as DriverData;
    const result = await this.createUseCase.execute(body);
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const body = req.body as DriverData;
    const result = await this.updateUseCase.execute({ id: req.params.id, ...body });
    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    await this.deleteUseCase.execute(req.params.id);
    return res.status(204).send();
  }

  async getById(req: Request, res: Response) {
    const result = await this.getByIdUseCase.execute(req.params.id);
    return res.json(result);
  }

  async list(req: Request, res: Response) {
    const filters: DriverFilters = { name: req.query.name as string };
    const result = await this.listUseCase.execute(filters);
    return res.json(result);
  }
}
