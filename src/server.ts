import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import cookieParser from 'cookie-parser';
import { join } from 'node:path';
import dotenv from 'dotenv';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

dotenv.config();

// 🔥 Backend imports
const backendApp = require('../server/app');
const connectDB = require('../server/config/db');

// 🔥 Connect MongoDB
connectDB();

app.use(cookieParser());

// 🔥 Mount backend API
app.use('/api', backendApp);


// ================== EXISTING MAPBOX APIs ==================

app.get('/api/location-search', async (req, res) => {
  const query = req.query['q'];
  if (!query) return res.json([]);

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&autocomplete=true&access_token=${process.env['MAPBOX_TOKEN']}`
    );

    const data = await response.json();
    return res.json(data.features);

  } catch (error) {
    return res.status(500).json({ error: 'Location search failed' });
  }
});


// ================== STATIC ==================

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);


// ================== SSR ==================

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});


// ================== SERVER START ==================

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;

  app.listen(port, (error) => {
    if (error) throw error;

    console.log(`Server running on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);