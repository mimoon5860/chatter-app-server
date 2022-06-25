import db from "../model/db";

class abstractServices {
    protected db: db;
    constructor() {
        this.db = new db();
    }
    public async connect(collection: string) {
        const connection = await this.db.getDbAccess(collection);
        return connection;
    }
    public close() {
        this.db.pool.close();
    }
}

export default abstractServices;