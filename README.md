# Getting Started with JSON Form Editor
This app can load json file in form structure. String will show as textbox, boolean will show as checkbox. You can edit and save your edit. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). And import [electron](https://www.electronjs.org/) to build as desktop app using [electron-forge](https://www.electronforge.io/).

## Scheme structure
scheme file is a json file that match key as main json file. Example
```
//main json
{
    "key1": "value",
    "your_choice": "choice2",
    "your_boolean": true
}

//scheme json
{
    "key": {
        "type": "string",
        "description": "this is description for key1",
        "choice": ""
    }
    "your_choice": {
        "type": "string",
        "description": "Please choose one. selection can be defined in choice field with | separated",
        "choice": "choice1|choice2|choice3"
    },
    "your_boolean": {
        "type": "bool",
        "description": "yes or no",
        "choice": ""
    }
}
```
If shceme file is not selected or key is not found in scheme file, value is determined by javascript typeof.

## Before Run
run `npm install`

create `.evn` file and 
```
BROWSER=none
DEV=true
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Electron window will be loaded.


### `npm run make`

Builds the app for production to the `out` folder.\
You can file executable file in `out` folder