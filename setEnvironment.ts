const REQUIRED_ENV_VARIABLES = ['NODE_ENV', 'TG_TOKEN', 'CRYPTOMUS_API_KEY'];

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `${process.env.ENV_FILE || '.env'}`,
});

for (const requiredEnvVariable of REQUIRED_ENV_VARIABLES) {
  if (!process.env[requiredEnvVariable]) {
    throw new Error(
      `Missing required environment variable - ${requiredEnvVariable}`,
    );
  }
}
