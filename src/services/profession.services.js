import httpService from "./http.service";

const ProfessionEndpoint = "profession/";

const ProfessionService = {
    get: async () => {
        const { data } = await httpService.get(ProfessionEndpoint);
        return data;
    }
};

export default ProfessionService;
