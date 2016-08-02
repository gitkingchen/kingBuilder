var argv = require('yargs').argv;

var args = argv._;

var path = require('path');

var fs = require('fs');

var pathJoin = path.join;

var projectPath = process.cwd();

var kPackPath = __dirname;

var spawn = require('child_process').spawn;

var kpackInfo = require(pathJoin(kPackPath, 'package.json'));

function help(){
    var desc =[
        'no content'
    ]
    console.log(desc[0]);
}

if(argv.v || argv.version){
    return console.log('kpack, version:' + kpackInfo.version);
}

if(argv.h || argv.help){
    return help();
}


function gulp(args,options, fn){
    
    var _args = [path.join(kPackPath, 'node_modules/gulp/bin/gulp.js')].concat(args);//args 不能写空

    execute('node', _args, options, fn);
}

function execute(cmd, args, options, fn) {

    var proc = spawn(cmd, args, options);

    proc.stdout.pipe(process.stdout);

    proc.stderr.pipe(process.stderr);

    proc.on('close', function (code) {
        fn(code === 0, code);
    });

}

var action = args[0];

if(!action){
    action = 'build';
}

var option = {
    action: action
}

function buildProject(projectDir,option){
    var args = [option.action];
    gulp(args,{
            cwd: projectDir,
            env: process.env
        }, function(success, code){
            console[success ? 'log' : 'error']('Gulp exit[%s]', code);
        });
}


function createLinkSync(projectPath){
	var projectNodeModulesDir = path.join(projectPath, 'node_modules');
    var globalNodeModulesDir = path.join(kPackPath, './node_modules');

    if(!fs.existsSync(projectNodeModulesDir)){
        fs.symlinkSync(globalNodeModulesDir, projectNodeModulesDir, 'dir');
    }
}

createLinkSync(projectPath);

buildProject(projectPath,option);