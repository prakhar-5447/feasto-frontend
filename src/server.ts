import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import cookieParser from 'cookie-parser'
import { isAbsolute, join } from 'node:path';
import dotenv from 'dotenv';
const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
dotenv.config();
app.use(cookieParser())

app.get('/api/location-search', async (req, res) => {
  const query = req.query['q'];
  if (!query) {
    return res.json([]);
  }
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&autocomplete=true&access_token=${process.env['MAPBOX_TOKEN']}`
    );
    const data = await response.json();
    return res.json(data.features);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Location search failed' });
  }
});

app.get('/api/location/reverse', async (req, res) => {
  const lat = req.query['lat'];
  const lng = req.query['lng'];
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and Longitude required' });
  }
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env['MAPBOX_TOKEN']}`
    );
    const data = await response.json();
    return res.json(data.features[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Reverse geocoding failed' });
  }
});
/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  // const city = req.cookies?.city
  // const isRoot = req.path === '/'
  // const isIndiaBsae = req.path === '/india'

  // if ((isRoot || isIndiaBsae) && city) {
  //   return res.redirect(`/india/${city}`)
  // }
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
