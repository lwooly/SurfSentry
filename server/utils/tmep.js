const axios = require('axios');

exports.onExecutePostUserRegistration = async (event, api) => {
  try {
    // Fetch credentials
    const tokenResponse = await axios.post(`https://${event.secrets.AUTH0_DOMAIN}/oauth/token`, {
      client_id: event.secrets.CLIENT_ID,
      client_secret: event.secrets.CLIENT_SECRET,
      audience: event.secrets.AUTH0_AUDIENCE,
      grant_type: "client_credentials",
    }, {
      headers: { 'content-type': 'application/json' }
    });

    console.log('Token fetched:', tokenResponse.data);

    // Send user data
    const userResponse = await axios.post(event.secrets.API_URL, {
      user: event.user
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenResponse.data.access_token}`
      }
    });

    console.log('User registered:', userResponse.data);

  } catch (error) {
    console.error("An error occurred during the PostUserRegistration process:", error);
    // Additional error handling logic can be added here
  }
};
