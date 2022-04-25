import { EXCEPTION } from "exceptions";

export default class SuraException extends Error {
    constructor(public message: EXCEPTION) {
        super(message);
    }
}