/*
 * Author: Alper Berber <berber@sabanciuniv.edu>
 * Copyright (c) 2020
*/
const fs = require('fs')

fs.readFile('data.json', (err, content) => {
    if (err) throw err;
    let data = JSON.parse(content);
    console.log(data);
});