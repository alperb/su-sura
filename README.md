# 📕 sura

Schedule wizard for Sabancı University. \
[![Build Status](https://travis-ci.com/alperb/sura.svg?token=Yf4w6vpgA18wTdJ9UoCf&branch=master)](https://travis-ci.com/alperb/sura)

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
var options = []

const Sura = require('su-sura')
var Wizard = new Sura.Wizard('data.json', courses, options)
```

As its constructor generates an schedule, you can access it by ```schedule``` property:

```js
SUWizard.schedule // is an array with 5 sub-arrays each corresponds to a day
```
