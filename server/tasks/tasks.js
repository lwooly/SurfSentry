import cron from 'node-cron'
import { surfCheck } from './notify/surfCheck.js';

cron.schedule("* * * * *", () => {
    console.log("A cron job that runs every 15 minutes");
    surfCheck()
  });

