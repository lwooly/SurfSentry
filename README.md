# SurfSentry - Surf Forecast Notification App
SurfSentry simplifies the surfing experience by delivering timely surf forecast notifications directly to users, enhancing their engagement without the need to constantly check complex apps. Built with modern technologies, SurfSentry provides a user-friendly interface and reliable notifications about optimal surfing conditions.

**Live demo:** [SurfSentry Demo](https://surf-sentry.vercel.app/)

## Key Features
- **Real-time Notifications**: Leveraging the WebPush API, SurfSentry sends push notifications to users about surf conditions, ensuring they never miss the perfect wave.
- **User Authentication**: Incorporates Auth0 for secure user authentication, maintaining a safe and personalised user experience.
- **Data Management**: Utilises a robust backend to manage user data, subscription details, and the latest surf forecasts.
- **Automated Updates**: Runs a scheduled cron job every morning at 8 AM to fetch the latest surf data and notify users accordingly.
- **Intuitive User Interface**: Designed with a Vite React frontend hosted on Vercel, offering a fast and responsive user interface.

## Technology Stack
- **Frontend**: Built using Vite and React, hosted on Vercel for rapid loading and optimal performance.
- **Backend**: A Node.js server with Express, running in a Docker container hosted on Fly.io, queries surf forecast data from the Surfline API.
- **Authentication**: Auth0 integration manages user sessions and secures endpoints.
- **Database**: Stores user data, service worker subscriptions, and current forecast information.
- **Notifications**: Utilises the WebPush API for sending real-time notifications through service workers.

SurfSentry stands out by providing a seamless and interactive way for surf enthusiasts to stay connected with the sea conditions, making every surf session as thrilling as the waves themselves.
