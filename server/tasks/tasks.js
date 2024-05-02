import cron from 'node-cron'
import { surfCheck } from './notify/surfCheck.js';

cron.schedule("0 8 * * *", () => {
    console.log("A cron job that runs every 1 minutes");
    surfCheck()
  });

