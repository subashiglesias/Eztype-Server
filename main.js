'use strict';

const electron = require('electron');
const {
    app,
    Menu
} = require('electron')

// const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


const {
    dialog
} = require('electron')
//For File and...save
const fs = require('fs');
const qs = require("querystring");

const path = require('path');
const url = require('url');
const osName = require('os-name');
const os = require('os');
var mainWindow = null;
var URL = require('url-parse');
var cmd = require('node-cmd');
var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')








app.on('ready', function () {

    var SYSTEM_OS;
    var webDavURL;
    /* console.log(SYSTEM_OS);*/
    var dat;
    var mountFirst = true;
    var batdat;
    var drivemounted = false;
    //Need to write a function to read it from file after frontend is developed
  

    
    
     mainWindow = new BrowserWindow({
        useContentSize: true,
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
    });
    SYSTEM_OS = getOperatingSystem();



    


    



    console.log("Am here");

    console.log("Am There");


    function getOperatingSystem() {
        var os = osName();
        if (os.match("Linux")) {
            
            mainWindow.loadURL('file://' + __dirname + '/mainpage_win.html');  
            
            return "Linux"
            
        } else if (os.match("OS X") || os.match("macOS")) {

            mainWindow.loadURL('file://' + __dirname + '/mainpage_mac_sev.html');  
            return "Mac"
        } else if (os.match("Windows")) {
            
            mainWindow.loadURL('file://' + __dirname + '/action.html');
            
            return "Windows"
        } else {
            return "Others"
        }

    }




  
//    mainWindow = new BrowserWindow({
//        useContentSize: true,
//        width: 1200,
//        height: 600,
//        webPreferences: {
//            nodeIntegration: true,
//            webSecurity: false,
//        },
//    });
//    mainWindow.loadURL('file://' + __dirname + '/main.html');
    //mainWindow.hide();

    const template = [
        {
            label: 'Edit',
            submenu: [
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'pasteandmatchstyle'
                },
                {
                    role: 'delete'
                },
                {
                    role: 'selectall'
                }
    ]
  },
        {
            label: 'View',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'forcereload'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'toggledevtools'
                },
                {
                    role: 'resetzoom'
                },
                {
                    role: 'zoomin'
                },
                {
                    role: 'zoomout'
                },
                {
                    role: 'togglefullscreen'
                }
    ]
  },
        {
            role: 'window',
            submenu: [
                {
                    role: 'minimize'
                },
                {
                    role: 'close'
                }
    ]
  },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        require('electron').shell.openExternal('https://electron.atom.io')
                    }
      }
    ]
  }, {
            label: 'Version',
            submenu: [
                {
                    label: '1.0.0'
                }
    ]
  }
]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
    ]
        })

        // Edit menu
        template[2].submenu.push({
            type: 'separator'
        }, {
            label: 'Speech',
            submenu: [
                {
                    role: 'startspeaking'
                },
                {
                    role: 'stopspeaking'
                }
      ]
        })

        // Window menu
        template[3].submenu = [
            {
                role: 'close'
            },
            {
                role: 'minimize'
            },
            {
                role: 'zoom'
            },
            {
                type: 'separator'
            },
            {
                role: 'front'
            }
  ]
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});


app.on('activate', function () {

    if (mainWindow === null) {
        //createWindow();
    }
});
