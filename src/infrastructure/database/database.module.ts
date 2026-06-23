import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { ENTITIES } from "./config/entities";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get("NODE_ENV") === "production";

        return {
          type: "postgres",
          url: config.get<string>("DB_URL"),

          autoLoadEntities: false,
          entities: isProd ? ["dist/**/*.entity.js"] : ENTITIES,

          synchronize: false,
          logging: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
