import cron from 'node-cron'
import { surfCheck } from './notify/surfCheck.js';

cron.schedule("0 8 * * *", () => {
    console.log("A cron job that runs at 8 am");
    surfCheck()
  });

