export class TimeHelper {
    constructor() {}

    sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
