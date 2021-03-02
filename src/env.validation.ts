import { number, object, string } from 'joi';

export const ValidationSchema = object({
  NODE_ENV: string()
    .valid('development', 'production', 'test')
    .default('development'),
  ENV_PORT: number().port().default(3000),
  TYPEORM_HOST: string().default('localhost'),
  TYPEORM_PORT: number().port().default(3306),
  TYPEORM_USERNAME: string().default('root'),
  TYPEORM_PASSWORD: string().default('root'),
  TYPEORM_DATABASE: string().default('chats'),
});
