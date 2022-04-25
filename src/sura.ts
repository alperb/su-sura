import { EXCEPTION } from 'exceptions';
import { Course, STATUS } from 'sura';
import data from './data/data.json';
import SuraException from './helpers/exception';
import { SuraOption } from './helpers/options';

export default class Sura {
    selectedCourses: Course[] = [];
    status: STATUS = STATUS.NOT_STARTED;
    options: SuraOption[] = [];
    
    constructor(){}

    addCourse(code: string): Sura {
        const matchedCourses = data.courses.filter((course: Course) => course.code === code);
        if(matchedCourses.length == 1) this.selectedCourses.push(matchedCourses[0]);
        else throw new SuraException(EXCEPTION.INVALID_COURSE_CODE);
        return this;
    }

    addOption(option: SuraOption): Sura {
        if(option.validate()) this.options.push(option);
        else throw new SuraException(EXCEPTION.INVALID_OPTION);

        return this;
    }

}