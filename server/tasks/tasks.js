import cron from 'node-cron'
import { surfCheck } from './notify/surfCheck.js';

cron.schedule("*/45 * * * *", () => {
    console.log("A cron job that runs every 45 minutes");
    surfCheck()
  });

