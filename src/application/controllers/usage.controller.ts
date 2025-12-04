import { Request, Response } from "express";
import {
  Usage,
  UsageData,
  UsageFilters
} from "../../infrastructure/database/memory/usage.repository";

export class UsageController {
  constructor(
    private readonly createUseCase: { execute(data: UsageData): Promise<Usage> },
    private readonly endUseCase: { execute(id: string): Promise<Usage> },
    private readonly listUseCase: { execute(filters: UsageFilters): Promise<Usage[]> }
  ) {}

  async create(req: Request, res: Response) {
    const body = req.body as UsageData;

    const result = await this.createUseCase.execute({
      startDate: new Date(body.startDate),
      reason: body.reason,
      driverId: body.driverId,
      automovelId: body.automovelId,
    });

    return res.status(201).json(result);
  }

  async end(req: Request, res: Response) {
    const result = await this.endUseCase.execute(req.params.id);
    return res.json(result);
  }

  async list(req: Request, res: Response) {
    const filters: UsageFilters = {
      driverId: req.query.driverId as string,
      automovelId: req.query.automovelId as string,
      active: req.query.active ? req.query.active === "true" : undefined,
    };

    const result = await this.listUseCase.execute(filters);
    return res.json(result);
  }
}
