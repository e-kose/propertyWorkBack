import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as path from 'path'
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
dotenv.config();


export default registerAs('dbConfig.dev',(): MysqlConnectionOptions =>({
	type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'mydatabase',
  entities: [path.resolve(__dirname, ".."), 'dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
})
)