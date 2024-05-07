// import cron from 'node-cron'
// import { surfCheck } from './notify/surfCheck.js';

import { surfCheck } from "./notify/surfCheck"

// cron.schedule("* */2 * * *", () => {
//     console.log("A cron job that runs at 8 am");
//     surfCheck()
//   });

export const cron = () => {
  surfCheck()
}