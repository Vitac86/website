type RedisPrimitive = string | number;

type RedisCommand = [string, ...RedisPrimitive[]];

type UpstashResponse<T> = {
  result: T;
  error?: string;
};

function getRedisConfig(): { url: string; token: string } {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('Redis is not configured');
  }

  return { url, token };
}

async function callPipeline<T>(commands: RedisCommand[]): Promise<T[]> {
  const { url, token } = getRedisConfig();
  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commands)
  });

  if (!response.ok) {
    throw new Error('Redis request failed');
  }

  const payload = (await response.json()) as Array<UpstashResponse<T>>;
  if (payload.some((item) => item.error)) {
    throw new Error('Redis command failed');
  }

  return payload.map((item) => item.result);
}

async function callCommand<T>(command: RedisCommand): Promise<T> {
  const [result] = await callPipeline<T>([command]);
  return result;
}

export const leadRedis = {
  command: callCommand,
  pipeline: callPipeline
};
