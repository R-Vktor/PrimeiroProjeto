const gulp        = require('gulp');
const { watch, series, parallel, src, dest } = require('gulp'); // Dar o require nas seguintes dependencias torna a criacao das tasks menos verbosa
const sass        = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create(); // para criar servidor hot-reloader
const plumber     = require('gulp-plumber');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const useref      = require('gulp-useref');    // para juntar os arquivos de mesma extencao, é uma alternativa ao 'concat()'
const cssnano     = require('gulp-cssnano');  // para minificar o css depois de concatenado(se forem mais de um arquivo)
const imagemin    = require('gulp-imagemin'); // para otimizar imagens
const cache       = require('gulp-cache');    // para usar em sinergia com o 'imagemin' para criar um cache do processamento das imagens e otimizar o processo tambem.
const runSequence = require('run-sequence');  // para criar uma task que fara as tarefas em garantindo a sequencia em que foram estabelecidas
const rename      = require('gulp-rename');   

/* 
    O metodo 'concat()' junta todos os arquivos e monta um unico arquivo
    com o nome que for passado como parametro.   
*/

/* 
    Muito importantese atentar para o uso de 'globs'. 
    Se for um diretorio que contem varias pastas que desejamos entrar e pegar os arquivos
    colocarmos /** no caminho realtivo e depois /*.'estencao do arquivo desejado' 
    ou se todos os arquivos estiverem soltos dentro de um determinado diretorio pode omitir o /** 
*/


// Souce Path
let js_src   ="./assets/src/*.js";
let sass_src ="./assets/src/*.scss";

// Dist Path
let js_dist_name="scripts.js"
let css_dist_name="scripts.css"
let js_dist ="./assets/dist/";

// Minify e Concat Scripts
gulp.task('scripts', function() {
    return src(js_src, sass_src)    // retorno da leitura dos respectivos arquivos
        .pipe(plumber())            //     
        .pipe(uglify())             // simplifica os codigos
        .pipe(concat(js_dist_name)) // junta tudo e coloca no arquivo designado
        .pipe(dest(js_dist));       // pega o arquivo criado e coloca no diretorio designado
});


// Os metodos 'series()' ou o 'parallel()' devem ser usados por determinacao da nova versao do gulp, podem ser colocados na task de watch ou na task principal.
gulp.task('watch', function(){
    watch([js_src], series(['scripts']));
});