import abstractRouter from "../../abstracts/abstractRouters";

class chatRouter extends abstractRouter {
    constructor() {
        super();
        this.callRouters();
    }

    private callRouters() {
        this.router.post('/send/msg',)
    }
}

export default chatRouter;