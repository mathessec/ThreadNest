import express from 'express';
const router = express.Router();

import userRoutes from './user.js'; // Imports the user router
// import tailorRoutes from './tailor.routes.js'; // STILL COMMENTED OUT

router.use('/user', userRoutes); // Mounts userRoutes like /user/createUser
// router.use('/tailor', tailorRoutes); // STILL COMMENTED OUT
// router.get('*',(req,res)=>res.send(`<div style="text-align-center"><h1>404 NOT FOUND</h1></div>`))
// router.get('*', (req, res) =>
//   res.send(`<div style="text-align:center"><h1>404 NOT FOUND</h1></div>`)
// );

export default router;
