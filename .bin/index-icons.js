const path = require('path');
const fs = require('fs');
const camelCase = require('lodash.camelcase');

const basePath = path.join(__dirname, '../icons');

fs.readdir(basePath, function (err, files) {
    //handling error
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    const packages = [];

    //listing all files using forEach
    files.forEach(function (dir) {
        const filename = path.join(basePath, dir, 'index.js');
        
        if(fs.lstatSync(path.join(basePath, dir)).isDirectory()) {
            fs.writeFileSync(filename, [
                `import ${camelCase(dir)} from './${dir}.json';`,
                `export default ${camelCase(dir)};`
            ].join('\n'));

            packages.push(
                `const ${camelCase(dir)} = ${fs.readFileSync(path.join(basePath, dir, `${dir}.json`))};\n`
            );
        }
    });

    packages.push([
        'export {',
            files.map(dir => `    ${camelCase(dir)},`).join('\n'),
        '};'
    ].join('\n'));

    fs.writeFileSync(path.join(basePath, 'index.js'), packages.join('\n'));

    console.log('Finished!');
});