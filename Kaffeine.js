const http = require('http');
const https = require('https');

// Define the URL you want to ping every 10 minutes
const targetURL = `http://localhost:${process.env.PORT}/campgrounds`; // Replace with the actual URL

// Function to send an HTTP request to the specified URL
function pingWebsite() {
  const protocol = targetURL.startsWith('https') ? https : http;

  const req = protocol.get(targetURL, (res) => {
    const { statusCode } = res;
    if (statusCode === 200) {
      console.log(`Successfully pinged ${targetURL}`);
    } else {
      console.error(`Failed to ping ${targetURL}. Status code: ${statusCode}`);
    }
  });

  // Handle errors in the request
  req.on('error', (error) => {
    console.error(`Error while pinging ${targetURL}: ${error.message}`);
  });
}

module.exports = {
    setup : (intervalInMinutes=10)=>{
        // Call pingWebsite every 10 minutes (in milliseconds)
        interval = intervalInMinutes * 60 * 1000; // Default 10 minutes
        // Initialize the first ping immediately, then set up the interval
        pingWebsite();
        setInterval(pingWebsite, interval);
    }
}

