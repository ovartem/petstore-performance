import {AxiosRequestConfig} from "axios";
import {BaseConfig} from "../BaseConfig";
import http from "k6/http";
import { AbstractApiClient } from "ovartem-petstore-api/api/AbstractApiClient";
import { K6CustomResponseType } from "ovartem-petstore-api/utils/customTypes";

export class K6Client extends AbstractApiClient<unknown> {
    private baseURL = BaseConfig.baseUrl;
    private headers = {
        "Content-Type": "application/json"
    }
    readonly instance = http;
    constructor () {
        super();
    }

    protected async processor<T>(config: AxiosRequestConfig): Promise<K6CustomResponseType<T>> {
        let url = `${this.baseURL}${config.url}`;
        if (config.params) {
            const keys = Object.keys(config.params);
            const keyValuePairs = keys.map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(config.params[key]);
            });
            url = url + keyValuePairs.join('&');
        }
        let data;
        if (config.data) {
            data = JSON.stringify(config.data);
        }
        return this.instance.asyncRequest(
            config.method,
            url,
            data,
            { headers: this.headers }) as Promise<K6CustomResponseType<T>>;
    }

}
