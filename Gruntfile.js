/*
 * System Runtime
 * 
 * https://designfirst.io/systemruntime/
 * 
 * Copyright 2024 Erwan Carriou
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = grunt => {
  // load tasks
  require('load-grunt-tasks')(grunt);

  // init configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: grunt.file.readJSON('tasks/watch.json'),
    clean: grunt.file.readJSON('tasks/clean.json'),
    eslint: grunt.file.readJSON('tasks/eslint.json'),
    mocha_istanbul: grunt.file.readJSON('tasks/mocha_istanbul.json'),
    karma: grunt.file.readJSON('tasks/karma.json'),
    browserify: grunt.file.readJSON('tasks/browserify.json'),
    uglify: grunt.file.readJSON('tasks/uglify.json'),
    concat: grunt.file.readJSON('tasks/concat.json'),
    json_merge: grunt.file.readJSON('tasks/json_merge.json')
  });

  // dev
  grunt.registerTask('dev', [
    'watch'
  ]);

  // test
  grunt.registerTask('test', [
    'eslint',
    'mocha_istanbul:coverage',
    'karma:release'
  ]);

  // build
  grunt.registerTask('build', [
    'clean',
    'json_merge',
    'concat:system',
    'browserify:debug',
    'browserify:release',
    'uglify:release',
    'concat:license'
  ]);

  // coveralls
  grunt.registerTask('coveralls', [
    'mocha_istanbul:coveralls'
  ]);

  if (process.env.TRAVIS) {
    grunt.event.on('coverage', (lcov, done) => {
      require('coveralls').handleInput(lcov, (err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  }
};
