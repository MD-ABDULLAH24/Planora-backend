import { Router } from 'express';

const router = Router();

// Module routes configuration
const moduleRoutes: {path: string, route: Router}[] = [
  // {
  //   path: '/users',
  //   route: userRoutes,
  // },
  // {
  //   path: '/events',
  //   route: eventRoutes,
  // },
  // {
  //   path: '/auth',
  //   route: authRoutes,
  // },
];

// Register module routes dynamically
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
