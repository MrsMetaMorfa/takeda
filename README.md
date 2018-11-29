## Simple Default Boilerplate Gulp/Sass/Pug

Based on https://github.com/Errec/pug-sass-boilerplate-starter-kit.git

### Commands

Install dependencies:
 
 ```bash
 $ npm install
 ```
 
Setup project into build directory: 
 
 ```bash
 $ gulp setup
 ```
 
Run local server: 
 
 ```bash
 $ gulp watch
 ```

### Project Structure

```
.
├── build/                    # Store processed/minified files - your project's deployable output
├── sources/                  # Store your project's source files
│   ├── assets/               # Main folder for assets files
│   │   ├── images/           # Folder for image files
│   │   └── fonts/            # Folder for font files
│   ├── scripts/              # Main folder for JS files
│   │   ├── libs/             # Store third part library files (e.g.: jquery, bootstrap)
│   │   └── main.js           # Index JS code goes here
│   ├── styles/               # Main folder for cascade style files
│   │   ├── blocks/           # Store blocks styles
│   │   ├── helpers/          # Store sass variables, mixins, settings, etc. files
│   │   └── main.scss         # Index Sass goes here
│   ├── templates/            # Main folder for pug template files
│   │   └── index.pug         # Index pug markup goes here
├── .bowerrc                  # Change bower library destination path from its default
├── gulpfile.js               # Setup Gulp tasks
├── package.json              # Dependencies
├── README.md                 # This file
```
