const path = require('path');
const fs = require('fs');

const basePath = path.join(__dirname, '../icons');

fs.readdir(basePath, function (err, files) {
    //handling error
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    } 

    //listing all files using forEach
    files.forEach(function (dir) {
        const filename = path.join(basePath, dir, 'index.js');
        
        const contents = [
            `import ${dir} from './${dir}.json';`,
            `export default ${dir};`
        ].join('\n');
        
        fs.writeFileSync(filename, contents);
    });

    console.log('Finished!');
});