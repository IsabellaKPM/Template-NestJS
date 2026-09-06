import "reflect-metadata";
import { config } from "dotenv";
import { createDataSource } from "./data-source";

config();

const dataSource = createDataSource();
export default dataSource;
