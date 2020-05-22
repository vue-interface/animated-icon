const path = require('path');
const fs = require('fs');
const camelCase = require('lodash.camelcase');

const basePath = path.join(__dirname, '../icons');

fs.readdir(basePath, function (err, files) {
    //handling error
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    //listing all files using forEach
    files.forEach(function (dir) {
        const filename = path.join(basePath, dir, 'index.js');
        
        if(fs.lstatSync(path.join(basePath, dir)).isDirectory()) {
            const contents = [
                `import ${camelCase(dir)} from './${dir}.json';`,
                `export default ${camelCase(dir)};`
            ].join('\n');
            
            fs.writeFileSync(filename, contents);
        }
    });
    
    let contents = files.map(dir => {
        return `import ${camelCase(dir)} from './${dir}';`;
    });
    
    contents = contents.concat([
        '\nexport {',
            files.map(dir => `    ${camelCase(dir)},`).join('\n'),
        '};'
    ]);

    fs.writeFileSync(path.join(basePath, 'index.js'), contents.join('\n'));

    console.log('Finished!');
});