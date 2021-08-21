# 📕 sura ![](https://img.shields.io/badge/version-0.2.0-blue) [![Build Status](https://travis-ci.com/alperb/su-sura.svg?branch=master)](https://travis-ci.com/alperb/su-sura)


Schedule wizard for Sabancı University. 

---

## Installation

You can use **sura** via npm:

```
npm install su-sura
```

## How to use

First we need to require **sura**:

```js
var courses =  ["MATH 102"]
var options = {}

const Sura = require('su-sura')
var SUWizard = new Sura(courses, options)
```

As the constructor generates a schedule, you can access it with the ```schedule``` property:

```js
SUWizard.schedule // is an 2d array with 5 sub-arrays each corresponds to a day
```

# API Reference

Sura's constructor does all the job for you as you construct it, however, if you'd like to access specific functions and variable you can call them anytime you want.

## Properties

### state

---

state property defines the program's current position. As the constructor starts its value is set to ```"STARTING"```. Then ```sortCourses()``` sets its value to ```"WORKING"```. At the end when a schedule is created ```rearrangeSchedule()``` sets its value to ```"SUCCESS"```. However, if it fails to create one, in ```createSchedule()``` its value is altered to ```"FAILED"```.

### data

---

data property is the courses object in the ```data.json``` file. Obtained with ``fs.readFileSync()`` function.

### schedule

---

schedule property is an 2d array with 5 sub-arrays each corresponds to a day in the weekdays. It starts as empty in the beginning of execution. Its altered if a schedule is created.

### requirements

--- 

requirements property is an object with just one property ```recitDependency``` which stores all course codes which has a requirement to have a recitation/discussion.

## Functions

### sortCourses()

---

Modifies the structure of the course objects to more useful structure.

### getSections()

---

Gets the sections of the courses, mutates course objects and pushes to a property.

### prioritizeCourses()

---

Prioritizes courses primarily looking at its lecture count, alternatively its recitation count.

### isConflict(*section*, *schedule*)

---

Checks if specified section has a time conflict with any other section already inserted.

| Property | Type | Description |
| --- | --- | --- |
| section | Object{} | Section object which has a schedule property to contain its timesheet. |
| schedule | Array[] | Schedule array which contains section objects. |
| @returns | Boolean | Returns true or false |

### randomInteger(*min*, *max*)

---

Generates a random integer in the range of *min* and *max* including endpoints.

| Property | Type | Description |
| --- | --- | --- |
| min | Integer | Left endpoint of the wanted range. |
| max | Integer | Right endpoint of the wanted range. |
| @returns | Integer | Returns an integer |

### checkOptionConflict(*section*)

---

Checks if given section conflicts with any given option.

| Property | Type | Description |
| --- | --- | --- |
| section | Object{} | Section object which has a schedule property to contain its timesheet |
| @returns | Boolean | Returns true or false |

### createSchedule()

---

Creates a schedule with the given courses, tests all the sections and randomly generates testschedules.


### rearrangeSchedule()

---

Rearranges section in the test schedule into ```schedule``` property.

