/**
 * Author: Alper Berber <berber@sabanciuniv.edu>
 * Copyright (c) 2020
*/
const fs = require('fs')

var data;
fs.readFile('data.json', (err, content) => {
    if (err) throw err
    data = JSON.parse(content)
    var SUWizard = new Wizard(data, ["CS 201", "SPS 102", "MATH 102", "NS 102", "TLL 102"], []);
})
class Wizard {
    /**
     * Constructs class' basic properties.
     * @param  {Object} datasheet File where all the courses are stored
     * @param  {[string]} coursesWanted Courses wanted, notated as shortcode (e.g CS 201)
     * @param {[Object]} options Options specified for the algorithm
     * @returns {[any]}
     */
    constructor(datasheet, courses, options){
        this.data = datasheet.courses
        this.courses = []
        this.coursesWanted = courses
        this.schedule = [[], [], [], [], []]
        this.options = options
        this.requirements = {
            recitDependency: [],
        }
        this.sortCourses()
        this.getSections()
    }
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
    prioritizeCourses(){
        this.courses.forEach(course => {
            course.sectionCount.forEach(day => {
                course.lectureCount += day[0]
                course.recitCount += day[1]
            })
        })


    }


}

module.exports = {
    Wizard: Wizard
};

