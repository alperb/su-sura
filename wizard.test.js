const mocha = require('mocha')
const expect = require('chai').expect
const wizard = require('./wizard').Wizard
const fs = require('fs')

var data, SUWizard;
var content = fs.readFileSync('data.json');
data = JSON.parse(content)
SUWizard = new wizard(data, ["CS 201"], []);

describe('Wizard class fn test', () => {
    
    context('tests for sorting big data', () => {
        
        it('should sort the courses', () => {
            expect(SUWizard.sortCourses()).to.equal(true); 
        })
        it('should have a courses property with length > 0', () => { 
            expect(SUWizard.courses).to.be.an('array');
            expect(SUWizard.courses.length).to.be.greaterThan(0);
        })
    })

    context('test for gettings sections', () => {
        it('should set modify courses', () => {
            SUWizard.courses.forEach(course => {
                expect(course.sectionCount).to.not.deep.equal([[0,0],[0,0],[0,0],[0,0],[0,0]])
            })
        })
    })
})
