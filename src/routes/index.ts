// routes/index.ts
import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
// import other module routes when needed
// import { UserRoutes } from '../modules/user/user.route';
// import { EventRoutes } from '../modules/event/event.route';

const router = Router();

// Module routes configuration
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  // Uncomment and add other routes when ready
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  // {
  //   path: '/events',
  //   route: EventRoutes,
  // },
];

// Register module routes dynamically
moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;