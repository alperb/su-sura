# 📕 sura

Schedule wizard for SUchedule. 

---

## Installation

You can use **sura** install npm:

```
npm install su-sura
```

## How to use

First we need to require **sura**:

```js
var data = fs.readFileSync('data.json')
var courses =  ["MATH 102"]
var options = []

const Sura = require('su-sura')
var Wizard = new Sura.Wizard(data, courses, options)
```
