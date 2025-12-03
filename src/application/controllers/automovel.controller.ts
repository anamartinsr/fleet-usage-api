import { Request, Response } from "express";
import {
  AutomovelData,
  AutomovelFilters,
  Automovel
} from "../../infrastructure/database/memory/automovel.repository";

export class AutomovelController {
  constructor(
    private readonly createUseCase: { execute(data: AutomovelData): Promise<Automovel> },
    private readonly updateUseCase: { execute(data: { id: string } & AutomovelData): Promise<Automovel> },
    private readonly deleteUseCase: { execute(id: string): Promise<void> },
    private readonly getByIdUseCase: { execute(id: string): Promise<Automovel | null> },
    private readonly listUseCase: { execute(filters: AutomovelFilters): Promise<Automovel[]> }
  ) {}

  async create(req: Request, res: Response) {
    const body = req.body as AutomovelData;

    const result = await this.createUseCase.execute(body);
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const body = req.body as AutomovelData;

    const result = await this.updateUseCase.execute({
      id: req.params.id,
      ...body,
    });

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
    const filters: AutomovelFilters = {
      color: req.query.color as string,
      brand: req.query.brand as string,
    };

    const result = await this.listUseCase.execute(filters);
    return res.json(result);
  }
}
