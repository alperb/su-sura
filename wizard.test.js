const mocha = require('mocha')
const expect = require('chai').expect
const wizard = require('./wizard').Wizard
const fs = require('fs')

var SUWizard;
SUWizard = new wizard("data.json", ["CS 201"], {"freeDay": 1});

describe('Wizard class fn test', () => {
    
    context('tests for sorting big data', () => {
        
        it('should sort the courses', () => {
            expect(SUWizard.sortCourses()).to.equal(true); 
        })
        it('should have a data property with length > 0', () => { 
            expect(SUWizard.data).to.be.an('array');
            expect(SUWizard.data.length).to.be.greaterThan(0);
        })
    })

    context('test for gettings sections', () => {
        it('should set modify courses', () => {
            SUWizard.courses.forEach(course => {
                expect(course.sectionCount).to.not.deep.equal([[0,0],[0,0],[0,0],[0,0],[0,0]])
            })
        })
    })

    context('test for time conflict function', () => {
        it('should find whether there\'s a conflict or not', () => {
            var time_table = [
                {
                    // Course here
                    sections: [
                        // Lecture and recit sections here
                        {
                            // Details about the section here
                            "schedule": [{ "day": 1, "start": 4, "duration": 2 }],
                        }
                    ]
                }
            ]
            var testSection = {
                "schedule": [
                    { "day": 1, "start": 5, "duration": 1 }
                ],
            }
            var textSection2 = {
                "schedule": [{ "day": 3, "start": 4, "duration": 2 }],
            }
            expect(SUWizard.isConflict(testSection, time_table)).to.be.equal(true);
            expect(SUWizard.isConflict(textSection2, time_table)).to.be.equal(false);
        })
    })
})
