import { Request, Response } from "express";

export class AutomovelController {
  constructor(private readonly createUseCase,
              private readonly updateUseCase,
              private readonly deleteUseCase,
              private readonly getByIdUseCase,
              private readonly listUseCase) {}

  async create(req: Request, res: Response) {
    const result = await this.createUseCase.execute(req.body);
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.updateUseCase.execute({
      id: req.params.id,
      ...req.body,
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
    const filters = {
      color: req.query.color as string,
      brand: req.query.brand as string,
    };
    const result = await this.listUseCase.execute(filters);
    return res.json(result);
  }
}
