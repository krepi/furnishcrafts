import './config/config.js'
import app from './api/v1/app.js';

const port = process.env.PORT || 3000;

/**
 * Starts the Express application and listens on the specified port.
 * The port is retrieved from the environment variables or defaults to 3000.
 */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
