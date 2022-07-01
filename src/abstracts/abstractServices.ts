import { Response } from "express";
import db from "../model/db";

class abstractServices extends db {
    constructor() {
        super();
    }
}

export default abstractServices;