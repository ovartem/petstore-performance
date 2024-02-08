import {getEnv} from "./utils/getEnv";

const env = getEnv();

export const BaseConfig = {
    baseUrl: env.BASE_URL ?? "https://petstore.swagger.io/v2",
}
