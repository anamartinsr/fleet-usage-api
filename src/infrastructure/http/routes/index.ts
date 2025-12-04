import { Router } from "express";
import automovelRoutes from "./automovel.routes";
import driverRoutes from "./driver.routes";
import usageRoutes from "./usage.routes";

const router = Router();

router.use("/automoveis", automovelRoutes);
router.use("/driver", driverRoutes);
router.use("/usage", usageRoutes);

export default router;
