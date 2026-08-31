const https = require('https');
https.get('https://images.unsplash.com/photo-1560769629-975ec94e6a86?fm=jpg&w=10', (res) => {
  console.log(res.headers);
});
