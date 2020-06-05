/**
 * Author: Alper Berber <berber@sabanciuniv.edu>
 * Copyright (c) 2020
*/
const fs = require('fs')


class Wizard {
    /**
     * Constructs class' basic properties.
     * @param  {string} datasheet File where all the courses are stored
     * @param  {[string]} coursesWanted Courses wanted, notated in shortcode (e.g CS 201)
     * @param {{}} options Options specified for the algorithm
     * @returns {[{}]}
     */
    constructor(datasheet, courses, options){
        this.data = JSON.parse(fs.readFileSync(datasheet)).courses
        this.courses = []
        this.coursesWanted = courses
        this.schedule = [[], [], [], [], []]
        this.options = options
        this.requirements = {
            recitDependency: [],
        }
        this.sortCourses()
        this.getSections()
        this.prioritizeCourses()
        this.createSchedule()
        this.rearrangeSchedule()
    }
    /**
     * Modifies the structure of the course objects to a more useful structure.
     */
    sortCourses(){
        let newCourses = [];
        for(let i = 0; i < this.data.length; i++){}
        this.data.forEach(course => {
            if(this.coursesWanted.includes(course.code)){
                var tempCourse = {
                    name: course.name,
                    code: course.code,
                    lectures: course.classes[0],
                    recitations: (course.classes.length == 1 ? null : course.classes[1]),
                    lectureCount: 0,
                    recitCount: 0,
                }
                newCourses.push(tempCourse)
            }
        })
        this.courses = newCourses;
        this.courses.forEach(course => {
            if(course.recitations != null && (course.recitations.type == "R" || course.recitations.type == "D")) this.requirements.recitDependency.push(course.code);
        })
        return true;
    }
    /**
     * Gets the sections of the courses, mutates course objects and 
     * pushes to a property.
     */
    getSections(){
        //TODO Reduce the time it takes 
        this.courses.forEach(course => {
            course.sectionCount = [[0,0],[0,0],[0,0],[0,0],[0,0]] // [lectureCount, recitCount]
            course.lectures.sections.forEach(section => {
                section.schedule.forEach(sched => {
                    course.sectionCount[sched.day][0]++
                })
            })
            if(course.recitations != null){
                course.recitations.sections.forEach(section => {
                    section.schedule.forEach(sched => {
                        course.sectionCount[sched.day][1]++
                    })
                })
            }
        })
    }
    /**
     * Prioritizes courses primarily looking at its lecture count, alternatively its recit count
     */
    prioritizeCourses(){
        var count = []
        this.courses.forEach((course, index) => {
            course.sectionCount.forEach(day => {
                course.lectureCount += day[0]
                course.recitCount += day[1]
            })
            count.push([index, course.lectureCount, course.recitCount])
        })
        count.sort((a, b) => {
            if(a[1] > b[1]) return 1;
            else if(a[1] < b[1]) return -1;
            else{
                if(a[2] > b[2]) return 1;
                else if(a[2] < b[2]) return -1;
                else return 1;
            }
        })
        var modifiedCourses = []
        count.forEach(el => {
            modifiedCourses.push(this.courses[el[0]]);
        })
        this.courses = modifiedCourses
    }
    /**
     * Checks if specified section has a time conflict with any other section already inserted.
     * @param  {{}} section
     * @param  {[]} schedule
     */
    isConflict(section, schedule){
        var check = false;
        if(schedule.length == 0) return false;
        //TODO try to reduce the time it takes, its n^4!!!!
        for(let i = 0; i < schedule.length; i++){
            for(let k = 0; k < section.schedule.length; k++){
                for(let n = 0; n < schedule[i].sections.length; n++){
                    for(let m = 0; m < schedule[i].sections[n].schedule.length; m++){
                        var cSection = schedule[i].sections[n].schedule[m];
                        var sectionClass = section.schedule[k];
                        if(
                            (this.options.freeDay && sectionClass.day == this.options.freeDay) ||
                            (cSection.day == sectionClass.day) && (((sectionClass.start >= cSection.start) && (sectionClass.start < (cSection.start + cSection.duration))) || ((sectionClass.start + sectionClass.duration > cSection.start) && (sectionClass.start + sectionClass.duration <= cSection.start + cSection.duration)))
                        ) {
                            check = true;
                            break;
                        }
                    }
                    if(check) break;
                }
                if(check) break;
            }
            if(check) break;
        }
        return check;
    }
    randomInteger(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    createSchedule(){
        var testSchedule = []


        //TODO this function becomes n^8!!!!!!!!!!
        for(var i = 0; i < this.courses.length; i++){
            var course = this.courses[i];
            var possibleSections = []
            var possibleRSections = []
            
            for(var k = 0; k < course.lectures.sections.length; k++){
                var section = course.lectures.sections[k];
                if(!this.isConflict(section, testSchedule)){
                    possibleSections.push(section);
                }
            }
            if(course.recitations != null){
                for(var l = 0; l < course.recitations.sections.length; l++){
                    var rsection = course.recitations.sections[l];
                    if(!this.isConflict(rsection, testSchedule)){
                        possibleRSections.push(rsection);
                    }
                }
            }
            
            if(possibleSections.length == 0){
                console.log("No available sections for " + course.name);
                i = 0;
                k = 0;
                possibleSections = []
                possibleRSections = []
                continue;
            }
            else{
                var tempCourse = {
                    name: course.name,
                    code: course.code,
                    sections: [possibleSections[this.randomInteger(0, possibleSections.length-1)], possibleRSections[this.randomInteger(0, possibleRSections.length-1)]],
                }
                do {
                    if((tempCourse.code == "SPS 101" || tempCourse.code == "SPS 102") && tempCourse.sections[0].schedule[0].day != tempCourse.sections[1].schedule[0].day){
                        tempCourse.sections = [possibleSections[this.randomIntconsole.logeger(0, possibleSections.length-1)], possibleRSections[this.randomInteger(0, possibleRSections.length-1)]]
                    }
                }
                while((tempCourse.code == "SPS 101" || tempCourse.code == "SPS 102") && tempCourse.sections[0].schedule[0].day != tempCourse.sections[1].schedule[0].day){
                    tempCourse.sections = [possibleSections[this.randomInteger(0, possibleSections.length-1)], possibleRSections[this.randomInteger(0, possibleRSections.length-1)]]
                }
                testSchedule.push(tempCourse)
            }
        }
        this.testSchedule = testSchedule;
    }
    rearrangeSchedule(){
        for(var i = 0; i < this.testSchedule.length; i++){
            for(var k = 0; k < this.testSchedule[i].sections.length; k++){
                if(this.testSchedule[i].sections[k] == undefined) continue;
                for(var n = 0; n < this.testSchedule[i].sections[k].schedule.length; n++){
                    this.schedule[this.testSchedule[i].sections[k].schedule[n].day].push(this.testSchedule[i])
                }
               
            }
        }
    }


}
module.exports = {Wizard};

