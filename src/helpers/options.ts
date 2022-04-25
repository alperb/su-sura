export abstract class SuraOption {
    constructor(public name: string) { }

    abstract validate(): boolean;
}

export class FreeDayOption extends SuraOption {
    day!: number;

    constructor() {
        super(`free_day`);
    }

    setDay(day: number): FreeDayOption {
        this.day = day;
        return this;
    }

    validate(): boolean {
        return this.day !== undefined;
    }
}