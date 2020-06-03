# 📕 sura

Schedule wizard for Sabancı University. \
[![Build Status](https://travis-ci.com/alperb/sura.svg?token=Yf4w6vpgA18wTdJ9UoCf&branch=master)](https://travis-ci.com/alperb/sura)

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
