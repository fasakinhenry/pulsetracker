import express from 'express';
import mongoose from 'mongoose';
import os from 'os';
import fs from 'fs';
import path from 'path';

const healthRouter = express.Router();

// Read package.json once at startup (cheap & safe)
const packageJsonPath = path.resolve(process.cwd(), 'package.json');
let packageInfo = {};

try {
  const raw = fs.readFileSync(packageJsonPath, 'utf-8');
  packageInfo = JSON.parse(raw);
} catch {
  packageInfo = {};
}

const appStartTime = Date.now();

healthRouter.get('/', async (req, res) => {
  let dbStatus = 'unknown';

  try {
    dbStatus =
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  } catch {
    dbStatus = 'error';
  }

  // Event loop lag (basic health signal)
  const start = process.hrtime.bigint();
  await new Promise((r) => setImmediate(r));
  const lagNs = process.hrtime.bigint() - start;

  const dependencies =
    process.env.EXPOSE_DEPENDENCIES === 'true'
      ? Object.entries(packageInfo.dependencies || {}).map(
          ([name, version]) => ({ name, version })
        )
      : {
          count: Object.keys(packageInfo.dependencies || {}).length,
        };

  const healthData = {
    status: dbStatus === 'connected' ? 'ok' : 'degraded',

    service: {
      name: process.env.APP_NAME || packageInfo.name || 'express-api',
      description: packageInfo.description || null,
      environment: process.env.NODE_ENV || 'development',
      version: process.env.APP_VERSION || packageInfo.version || 'unknown',
      commit: process.env.GIT_COMMIT || null,
    },

    time: {
      now: new Date().toISOString(),
      startedAt: new Date(appStartTime).toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    },

    process: {
      pid: process.pid,
      node: process.version,
      memory: {
        rss: process.memoryUsage().rss,
        heapUsed: process.memoryUsage().heapUsed,
        heapTotal: process.memoryUsage().heapTotal,
      },
      eventLoopLagMs: Number(lagNs / 1_000_000n),
    },

    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      cpuCount: os.cpus().length,
      loadAverage: os.loadavg(),
    },

    dependencies: {
      database: dbStatus,
      packages: dependencies,
    },

    render: {
      serviceId: process.env.RENDER_SERVICE_ID || null,
      serviceName: process.env.RENDER_SERVICE_NAME || null,
      region: process.env.RENDER_REGION || null,
      instanceId: process.env.RENDER_INSTANCE_ID || null,
    },
  };

  const statusCode = dbStatus === 'connected' ? 200 : 503;

  res.status(statusCode).json(healthData);
});

export default healthRouter;
