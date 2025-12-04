import { Router } from "express";
import { makeUsageController } from "../../../application/factories/usage.factory";

const router = Router();
const controller = makeUsageController();

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.list(req, res));
router.put("/:id/end", (req, res) => controller.end(req, res));

export default router;
