let _env = {};

export function getEnv(): { [key: string]: string } {
    // if (_env === undefined) {
    //     try {
    //         _env = JSON.parse(open('../env.json'));
    //     } catch (err) {
    //         console.log(err);
    //         return {};
    //     }
    // }
    return _env;
}
