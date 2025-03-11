const app = require('express')();
const cors = require('cors');
const os = require('os');
const fs = require('fs/promises');
require('dotenv').config();
app.use(cors());

const Redis = require('ioredis');
const DB_PORT = process.env.DB_PORT || 6379;
const DB_HOST = process.env.DB_HOST || 'localhost';
const redis = new Redis({
  port: DB_PORT,
  host: DB_HOST,
})
  .on('ready', () => {
    console.log('Redis is ready');
  })
  .on('reconnecting', () => {
    console.log('Redis is reconnecting');
  });

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  console.log('GET /');
  res.json({
    message: `Hello AWS Copilot from ${os.hostname()}`,
  });
});

app.get('/api/1.0/certifications', async (req, res) => {
  const contents = await fs.readFile('./data/certifications.json', {
    encoding: 'utf8',
  });
  return res.json({
    data: JSON.parse(contents),
  });
});

app.get('/api/1.0/courses', async (req, res, next) => {
  if (redis.status === 'ready') {
    try {
      let keys = await redis.keys('course:*');
      let result = [];
      for (let key of keys) {
        result.push(await redis.hgetall(key));
      }
      res.send({ data: result });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(503).json({
      message: 'Service Unavailable',
    });
  }
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});

function handle(code) {
  console.debug(`${code} signal received: closing HTTP server`);
  server.close(() => {
    console.debug('HTTP server closed');
    redis.quit();
  });
}

process.on('SIGTERM', handle);
process.on('SIGINT', handle);
