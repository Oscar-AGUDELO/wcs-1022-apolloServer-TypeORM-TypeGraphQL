import { Skill } from "../entities/Skill";
import { Upvote } from "../entities/Upvote";
import { Wilder } from "../entities/Wilder";
import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "superKeyDev",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Wilder, Skill, Upvote],
});

export default datasource;
