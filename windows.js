var exports = module.exports = {};
var fs = require('fs');
const os = require('os');
var fs = require("fs");
var process = app.process;
const osName = require('os-name');
var cmd = require('node-cmd');
var URL = require('url-parse');
const fileExists = require('file-exists');




exports.webdav = async function (SITE_URL, DEFAULT_USER, DEFAULT_PASS) {




    var SYSTEM_OS = "Windows";
    var webDavURL;
    console.log(SYSTEM_OS);
    var dat;
    var mountFirst = true;
    var batdat;
    var drivemounted = false;
    //Need to write a function to read it from file after frontend is developed
    var SITE_URL = SITE_URL
    var DEFAULT_USER = DEFAULT_USER
    var DEFAULT_PASS = DEFAULT_PASS

    webDavURL = getwebDavURL();
   
   checkmount();
   
    

    async function checkmount() {
        if (mountFirst) {

            try {
               
                    driveMount()
               
                console.log(response1)
            } catch (err) {
                console.log("Error");
                driveMounted = false;
            }

        }
    }

    function getwebDavURL() {
        var url1 = URL(SITE_URL);
        var urlport;
        var wDU;
        /*console.log(url.hostname); */
        localStorage.setItem("hostname", url1.hostname)
        console.log(url1.port);
        if (url1.port) {
            urlport = '@' + url1.port;
            wDU = "\\\\" + url1.hostname + urlport + "\\webdav";
        } else {
            wDU = "\\\\" + url1.hostname + "\\webdav";
        }
        return wDU;
    }


    function driveMount() {

        switch (SYSTEM_OS) {
            case "Windows":
                var networkShortcutPath = process.env.APPDATA + "/Microsoft/Windows/Network Shortcuts/";


                localStorage.setItem("OS", "Windows");
                localStorage.setItem("SITEURL", SITE_URL);
                localStorage.setItem("user", DEFAULT_USER);
                localStorage.setItem("password", DEFAULT_PASS);

                //deleting the network shortcut if already exists
                console.log(os.homedir());
                console.log(networkShortcutPath);

                fs.existsSync(networkShortcutPath + "PageMajik.lnk", function (exists) {
                    fs.unlink(networkShortcutPath + "PageMajik.lnk")
                    console.log("Deleted PageMajik.lnk");
                });

                fs.existsSync(os.homedir() + "\mkshortcut.vbs", function (exists) {
                    fs.unlink(os.homedir() + "\\mkshortcut.vbs")
                    console.log("Deleted mkshortcut.vbs");
                });

                fs.existsSync(os.homedir() + "\mountDrive.bat", function (exists) {
                    fs.unlink(os.homedir() + "\\mountDrive.bat")
                    console.log("Deleted mountDrive.bat")
                });



                fs.writeFileSync(os.homedir() + '\\mkshortcut.vbs', "set WshShell = WScript.CreateObject(\"WScript.Shell\" ) " + "\n" + "set oShellLink = WshShell.CreateShortcut(Wscript.Arguments.Named(\"shortcut\") & \".lnk\")" + "\n" + "oShellLink.TargetPath = Wscript.Arguments.Named(\"target\")" + "\n" + "oShellLink.WindowStyle = 1" + "\n" + "oShellLink.Save");

                fs.writeFileSync(os.homedir() + '\\mountDrive.bat', "rem setting the working directory" + "\n" + "Pushd " + os.homedir() + '\\' + "\n" + "net use " + webDavURL + " /user:" + DEFAULT_USER + " " + DEFAULT_PASS + "\n" + "rem example target:=path shortcut:=name for the shortcut " + "\n" + "mkshortcut /target:\"" + webDavURL + "\" /shortcut:\"PageMajik\"" + "\n" + "rem revoking the working directory" + "\n" + "popd");


                cmd.get(
                    "CMD /C \"" + os.homedir() + "\\mountDrive.bat\"",
                    function (err, data, stderr) {
                        if (!err) {
                            dat = dat + data
                            console.log('Executing', data)

                            if (dat.match("success")) {
                                console.log("dat is " + dat)
                                move(os.homedir() + "/PageMajik.lnk", networkShortcutPath + "/PageMajik.lnk");
                                return new Promise(function (resolve, reject) {
                                    return resolve(checknetwork())
                                })
                            }
                        } else {
                            console.log('error', err)
                            console.log('stderr', stderr)
                        }
                    }
                );


                function move(oldPath, newPath, callback) {

                    fs.rename(oldPath, newPath, function (err) {
                        if (err) {
                            if (err.code === 'EXDEV') {
                                copy();
                            } else {
                                callback(err);
                            }
                            return;
                        }
                        //callback();
                    });

                    function copy() {
                        var readStream = fs.createReadStream(oldPath);
                        var writeStream = fs.createWriteStream(newPath);

                        readStream.on('error', callback);
                        writeStream.on('error', callback);

                        readStream.on('close', function () {
                            fs.unlink(oldPath, callback);
                        });

                        readStream.pipe(writeStream);
                    }

                }


        }

        function checknetwork() {
            return new Promise(function (resolve, reject) {
                fileExists(networkShortcutPath + "PageMajik.lnk").then(exists => {
                    console.log(exists) // OUTPUTS: true or false
                    if (exists == true) {
                        return resolve("promise resolved");
                    } else {
                        return reject("fail")
                    }

                });
            })
        }
    }

}