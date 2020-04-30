import * as shell from 'shelljs';

shell.cp('-R', 'src/resources/language', 'dist/resources/');
shell.cp('-R', 'src/public/images', 'dist/public/');
