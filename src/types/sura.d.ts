export interface Course {
    name: string;
    code: string;
    classes: ClassType[];
}

export interface ClassType{
    type: string;
    sections: Section[];
}

export interface Section{
    crn: string;
    schedule: SectionSchedule[];
    group: string;
    instructors: number;
}

export interface SectionSchedule{
    day: number;
    place: number;
    start: number;
    duration: number;
}

export const enum STATUS {
    NOT_STARTED,
    PREPARING,
    STARTED,
    FINISHED,
    ERROR
}