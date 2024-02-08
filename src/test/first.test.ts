import { PetService } from "ovartem-petstore-api/api/services/pet/PetService";
import {K6Client} from "../api/K6Client";
import { petBody } from "ovartem-petstore-api/api/services/pet/BodyHelper";
import {check, sleep} from "k6";

export const options = {
    scenarios: {
        login: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1,
            maxDuration: '1s',
        },
    },
};

export default async function () {
    const petService = new PetService(new K6Client());
    const requestBody = petBody().init().build();
    const resp = (await petService.addPet(requestBody));
    check(resp, {
        'Status Code - ok': () => resp.status === 200,
        'Pet Name - ok': () => resp.json().name !== undefined,
    });
    sleep(1);
}
