var app = nodeRequire('electron').remote;
const {
    webFrame
} = nodeRequire('electron')
const BrowserWindow = app.BrowserWindow;
var request = nodeRequire('request');
var _ = nodeRequire('lodash');
//  var copydir = nodeRequire('copy-dir');
var rp = nodeRequire('request-promise');
const os = nodeRequire('os');
var watcher = nodeRequire('./dummy.js')
var Promise = nodeRequire('promise');
var fse = nodeRequire("fs-extra");
//var sfs = nodeRequire('@mh-cbon/sudo-fs');
var http = nodeRequire('http');
var miscellaneousFolderID = "";
var prepend = nodeRequire('prepend-file');
var cmd = nodeRequire('node-cmd');
var chokidar = nodeRequire('chokidar');
var webdav = nodeRequire('./windows.js')
var exec = nodeRequire('child_process').exec
var spawn = nodeRequire('child_process').spawn
const osName = nodeRequire('os-name');
var URL = nodeRequire('url-parse');
var osascript = nodeRequire('node-osascript');
const fixPath = nodeRequire('fix-path')();
var copy = nodeRequire('recursive-copy');
const util = nodeRequire('util');
nodeRequire('util.promisify').shim();
const setTimeoutPromise = util.promisify(setTimeout);
var email = nodeRequire("emailjs");
var output = localStorage.getItem('output');
var fs = nodeRequire("fs");
const fileExists = nodeRequire('file-exists');
var PAGEMAJIK_DOWNLOAD_PATH = os.homedir() + "/" + "PageMajik/";


//var applescript = nodeRequire('applescript');

var loki;

var sitecount;
var selectedSites = "";
var currentsite;

var final;
var getIndesignSupBool = false;
var javascriptContent = "";
var FailedFiles = [];
var process1 = app.process;

//  console.log(hostname)


var DEFAULT_USER
var DEFAULT_PASS



var webDavURL;
var dat;

var First = true;
var batdat;
var drivemounted = false;
var checkEx = false;
var checkSc = false;
var selected = [];
var sitesready = false;
var credsready = false;
var currentfile;
var statusfileuserID;



var stage;

var EXT_PATH;

var companyID;
var fileuserID;
var scriptsfolderID;


var display = "";
var watcher;
var retry;
var selectedId = [];
var VER;
var gc = 0;
var currentrun = true;

var progress = 0;
var jsonobj = [];
var jsonfobj = [];
var item = {};


var supportPath2;


var allgood = true;
var inddokay = true;
var BookMapID;
var max = 0
var min = 0

var server = email.server.connect({
    user: "support@pagemajik.com",
    password: "PageMajik.99",
    host: "smtp.gmail.com",
    ssl: true
});




// webFrame.setZoomFactor(2)

// fse.emptyDir(scriptsPath)


// fse.emptyDir(PAGEMAJIK_DOWNLOAD_PATH)
watcher.watch();

const {
    dialog
} = nodeRequire('electron').remote
var EXTpath = '';
$('#toolkitpath').click(function () {
    /* EXTpath = $(this).val();
    $('#file-selected').html(EXTpath);
    localStorage.setItem("EXT_PATH", EXTpath);
    console.log(EXTpath) */
    dialog.showOpenDialog({
        properties: ['openFile']
    }, function (fileNames) {
        console.log(fileNames)
        $('#file-selected').html(fileNames);
        EXT_PATH = fileNames
        console.log(EXT_PATH)
        localStorage.setItem("EXT_PATH", fileNames);
        console.log(localStorage.getItem('EXT_PATH'))
    });



});



$.fn.extend({
    qcss: function (css) {
        return $(this).queue(function (next) {
            $(this).css(css);
            next();
        });
    }
});

function winReload() {
    mainWindow = new BrowserWindow({
        useContentSize: true,
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
    });
    mainWindow.loadURL('file://' + __dirname + '/mainpage_mac_sev.html');
    window.close();
}

//siteName
$("#siteName").val(localStorage.getItem("SITE_id"))
$("#userName").val(localStorage.getItem("USER_id"))
$("#password").val(localStorage.getItem("PASS_id"))
$("#file-selected").html(localStorage.getItem("EXT_PATH"))


if (localStorage.getItem('EXT_PATH') !== null) {
    checkEx = true;
}

if (localStorage.getItem('SITE_id') !== null) {
    checkSc = true;
}

function valueChanged1() {
    if (document.getElementById("is_CS6").checked == true) {
        //document.getElementById("is_CS6").value = 1;
        document.getElementById("is_CC").checked = false;
    }
}

function valueChanged2() {
    if (document.getElementById("is_CC").checked == true) {
        document.getElementById("is_CS6").checked = false;
    }
}

$("#credsSave").click(function () {
    $(".loginpage").css("display", "none");
    $(".loadingpage").css("display", "block");
    $(".bg-pmload").delay(1000).qcss({
        width: "100%"
    });
    $(".loadingpage").delay(4000).qcss({
        display: "none"
    });
    $(".contentpage").delay(4000).qcss({
        display: "block"
    });
    credsSave();
});


function credsSave() {
    SITE_URL = document.getElementById('siteName').value
    DEFAULT_USER = document.getElementById('userName').value
    DEFAULT_PASS = document.getElementById('password').value
    MAX = document.getElementById('max').value
    MIN = document.getElementById('min').value

    if (MAX == "" || MIN == "") {

    } else {
        localStorage.setItem("MAX", MAX)
        localStorage.setItem("MIN", MIN)
    }
    if (document.getElementById("is_CS6").checked == true) {
        localStorage.setItem("VER", "CS6")
    } else {
        localStorage.setItem("VER", "CC")
    }
    if (SITE_URL == "" || SITE_URL == null) {
        if (localStorage.getItem('SITE_id') == "" || localStorage.getItem('SITE_id'))
            $(".errorbox").css("display", "block");
        $('#error').text('SITE URL IS NOT SET');
    } else {
        localStorage.setItem('SITE_id', SITE_URL);
    }

    if (DEFAULT_PASS == "" || DEFAULT_PASS == null || DEFAULT_USER == null || DEFAULT_PASS == "") {

    } else {
        localStorage.setItem('USER_id', DEFAULT_USER);
        localStorage.setItem('PASS_id', DEFAULT_PASS);
    }
    console.log(SITE_URL);
    console.log(DEFAULT_USER);
    console.log(DEFAULT_PASS);
    VER = localStorage.getItem("VER")
    console.log(VER);
    console.log(EXTpath)




    // localStorage.setItem("EXT_PATH", EXTpath);





}

function configs() {
    $(".bg-pmload").delay(1000).qcss({
        width: "0%"
    });
    $(".loginpage").css("display", "block");
    $(".loadingpage").css("display", "none");
}






function pendingfiles(URL_PAGEMAJIK_PENDING, DEFAULT_USER, DEFAULT_PASS, groupids) {
    // Setting URL and headers for request
    var VER = localStorage.getItem("VER");
    if (VER == null || VER == "" || VER == "undefined") {
        Alert("No version Selected");
    }
    var pending_files = URL_PAGEMAJIK_PENDING + "/group-ids/" +
        groupids + "/indd-version/" + VER;
    console.log(JSON.stringify(pending_files))
    var options = {
        method: 'POST',
        uri: pending_files,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 240000,
        resolveWithFullResponse: true
    };
    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(options)
            .then(function (response) {
                // POST succeeded...
                currentfile = JSON.parse(response.body);
                if (response.body.match("exception")) {
                    setTimeout(startpen, 5000)
                    var container = $('#menu1');
                    //var inputs = container.find('div');
                    var id = filename;


                    /* $('<div>', {
                        class: "content_header content_list_left",
                    }).appendTo(container) */
                    if (progress == 0) {
                        $(container).empty()
                        $(container).append("<div class='content_list_right'>" +
                            "<span>" + "Waiting for Server ." + "</span>" +
                            "</div>");
                        progress++;
                    }
                    if (progress == 1) {
                        $(container).empty()
                        $(container).append("<div class='content_list_right'>" +
                            "<span>" + "Waiting for Server .." + "</span>" +
                            "</div>")
                        progress++;
                    }

                    if (progress == 2) {
                        $(container).empty()
                        $(container).append("<div class='content_list_right'>" +
                            "<span>" + "Waiting for Server ..." + "</span>" +
                            "</div>")
                        progress = 0;
                    }


                } else {
                    return resolve(currentfile)
                }

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                console.log("getting pending files failed. Am definitely not in, ...Going back")

                setTimeout(startpen, 5000)
                return reject(err);

            });
    })

}

function buildsites(SITE_URL, DEFAULT_USER, DEFAULT_PASS) {
    // Setting URL and headers for request
    // SITE_URL = localStorage.getItem("SITE_id");
    var tmpcheck = SITE_URL +
        "/api/jsonws/group/get-user-sites"
    console.log(tmpcheck)

    var options = {
        method: 'GET',
        uri: tmpcheck,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 240000,
        resolveWithFullResponse: true
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job

        rp(options)
            .then(function (response) {
                // POST succeeded...
                var USER_SITES_DETAILS = JSON.parse(response.body);
                console.log(response);
                console.log(USER_SITES_DETAILS.length);
                var groupids = "";
                for (var index = 1; index < USER_SITES_DETAILS.length; index++) {
                    if (index == USER_SITES_DETAILS.length) {
                        groupids = groupids + USER_SITES_DETAILS[index].groupId
                    } else {
                        groupids = groupids + USER_SITES_DETAILS[index].groupId + "%2C"
                    }

                }

                console.log(groupids)
                return resolve(groupids)

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                setTimeout(function () {
                    buildsites(SITE_URL, DEFAULT_USER, DEFAULT_PASS);
                }, 5000)
                return reject(err);
            });
    })

}

//START HERE - Read the config file for sites and create instances of funcion for each one
async function startpenupgrade() {
    document.getElementById("startbutton").disabled = true;
    var SITES = ("http://developer.pagemajik.online,http://eztype.pagemajik.online").split(',');
    SITES.forEach(async element => {
        await buildsites(element, "process", "1234").then((groupids) => {
            console.log(groupids);
            console.log(element)
            startpen(element, "process", "1234", groupids)
        });

    });
}

async function startpen(SITE_URL, USER, PASS, groupids) {
    var SITE_URL = SITE_URL
    var DEFAULT_USER = USER
    var DEFAULT_PASS = PASS
    document.getElementById("startbutton").disabled = true;

    if (checkEx == true) {
        credsready = true

        // webDavURL = getwebDavURL();


        var URL_getAllFiles = SITE_URL + "/api/jsonws/Dazzle-portlet.pagemajik/folder-zip /folder-id/";
        var URL_PAGEMAJIK_PENDING = SITE_URL +
            "/api/jsonws/Dazzle-portlet.pagemajik/find-by-file-name/status/Pending";
        //  console.log(URL_PAGEMAJIK_PENDING)
        var URL_FileVersion = SITE_URL +
            "/api/jsonws/dlfileversion/get-latest-file-version/file-entry-id/";
        var URL_FileEntry = SITE_URL + "/api/jsonws/dlapp/get-file-entry/file-entry-id/";
        var URL_cancelCheckout_download = SITE_URL +
            "/api/jsonws/Dazzle-portlet.pagemajik/universal-service/file-entry-id/"
        var URL_cancelCheckout = SITE_URL + "/api/jsonws/dlapp/cancel-check-out/file-entry-id/"








    }
    if (credsready == true) {
        //var pendingPromise = ;
        timer = '';
        pending_start(URL_PAGEMAJIK_PENDING, DEFAULT_USER, DEFAULT_PASS, groupids);
        //  timer = setTimeout(startpenstuck, 1800000)
    }
}


function pending_start(URL_PAGEMAJIK_PENDING, DEFAULT_USER, DEFAULT_PASS, groupids) {
    first = false;
    console.log("Am in")
    //  console.log(process1.memoryUsage().heapUsed)
    //   console.log(process1.memoryUsage().heapTotal)
    //   console.log(webFrame.getResourceUsage())
    webFrame.clearCache()
    //  getMemory();
    // global.gc
    //   console.log(document.getResourceUsage())
    // gc++;
    EXT_PATH = localStorage.getItem('EXT_PATH')
    localStorage.setItem("SSites", selectedSites)
    localStorage.setItem("SId", selectedId)
    max = localStorage.getItem("MAX");
    min = localStorage.getItem("MIN")
    if (credsready == true) {
        pendingfiles(URL_PAGEMAJIK_PENDING, DEFAULT_USER, DEFAULT_PASS, groupids).then(async function (result) {
                function isEmpty(obj) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key))
                            return false;
                    }
                    return true;
                }
                if (isEmpty(result)) {
                    // // console.log("nextline");
                    console.log(result);
                    clearTimeout(
                        timer);
                    if (min == 0 && max == 0) {
                        setTimeout(function () {
                            pending_start(URL_PAGEMAJIK_PENDING, DEFAULT_USER, DEFAULT_PASS,
                                groupids)
                        }, 5000)
                    } else {
                        var rand = _.random(min, max)
                        setTimeout(function () {
                            pending_start(URL_PAGEMAJIK_PENDING, DEFAULT_USER, DEFAULT_PASS,
                                groupids)
                        }, (5000 + (rand * 1000)))
                        console.log(rand + 5)

                    }

                    var container = $('#menu1');
                    //var inputs = container.find('div');
                    var id = filename;
                    $(container).empty();
                    /* $('<div>', {
                        class: "content_header content_list_left",
                    }).appendTo(container) */
                    if (progress == 0) {
                        $(container).empty()
                        $(container).append("<div class='content_list_right'>" +
                            "<span>" + "Fetching files ." + "</span>" +
                            "</div>");
                        progress++;
                    } else if (progress == 1) {
                        $(container).empty()
                        $(container).append("<div class='content_list_right'>" +
                            "<span>" + "Fetching files .." + "</span>" +
                            "</div>")
                        progress++;
                    } else {
                        $(container).empty()
                        $(container).append("<div class='content_list_right'>" +
                            "<span>" + "Fetching files ..." + "</span>" +
                            "</div>")
                        progress = 0;
                    }

                } else {
                    console.log(result);
                    var fileEntryId = "";
                    var process = "";
                    var filePath;
                    var filepathbroken = [];
                    var filename;
                    var fileFolderId;
                    var artFolderId = "";
                    var fileExtension;
                    var notifyuserId;
                    var fileMimeType;
                    var fileDescription;
                    var fileTreePath;
                    var fileuserId;
                    var companyId;
                    var indesignScriptInpPath;
                    var fileRepFolderId;
                    var heimdall;
                    var ezTypeUserID = "";
                    if (result.fileEntryId !== null && result.fileEntryId !== "undefined") {
                        fileEntryId = result.fileEntryId;
                        //   console.log(fileEntryID);
                        process = result.process;
                        //         //   console.log(process);
                        filePath = result.filePath;
                        console.log(filePath);
                        filepathbroken = filePath.split('/')
                        console.log(filepathbroken)

                        stage = result.field5
                        //         //    console.log(stage);
                        filePath = filePath.replace("Z:", "");
                        console.log(filePath);
                        var filePresetID = "";
                        statusfileuserID = result.userId;
                    } else {
                        var container = $('#menu1');
                        $(container).append("<div class='content_list_right'>" +
                            "<span>" + "Unable to get file... Moving on" + "</span>" +
                            "</div>")
                        // gotonextfile();
                        // break;
                    }
                    if (result.preset !== null) {
                        filePresetID = result.preset;
                    }


                    await getFileObject(fileEntryId).then(async function (result) {
                        filename = result.title;
                        fileFolderId = result.folderId;
                        fileRepFolderId = result.groupId;
                        fileExtension = result.extension;
                        fileMimeType = result.mimeType;
                        fileDescription = result.description;
                        fileTreePath = result.treePath;
                        companyId = result.companyId;
                        fileuserId = result.userId;
                        notifyuserId = result.userId;

                        indesignScriptInpPath = PAGEMAJIK_DOWNLOAD_PATH +
                            fileRepFolderId +
                            "/" +
                            fileFolderId + "/" + filename;

                        getUserIdByScreenName(companyID, DEFAULT_USER).then(function (
                            result) {
                            ezTypeUserID = result;
                        });

                        await getAllFolderID(fileEntryID,
                            fileRepFolderId).then(function (result) {
                            var InstructionID;
                            var SiteLevelPagemajikScriptID;
                            var BookLevelPagemajikScriptID;
                            var ReviewID;
                            var MiscellaneousID;
                            var chapterID;
                            var FontsID;
                            var BookLevelAdobeScriptID;
                            var SupportID;
                            var LibraryID;
                            var PresetID;
                            var SiteLevelAdobeScriptID;
                            var ClientLevelAdobeScriptID;
                            var ClientLevelPagemajikScriptID;
                            var pagenum = null;
                            var supportPath;
                            var fontsFolderPath;
                            var contents;
                            console.log(result)
                            BookMapID = result.BookMap
                            ReviewID = result.Review;
                            SupportID = result.Support;
                            var scriptsPath;
                            getBookmapPageNumber(BookMapID, filename).then(function (
                                result) {
                                console.log("PageNum is " + JSON.stringify(
                                    result));
                                if (JSON.stringify(result) == "{}") {
                                    //pagenum = 10
                                    pagenum = 1
                                } else {
                                    pagenum = JSON.stringify(result)
                                }

                            })

                            var downloadPath = PAGEMAJIK_DOWNLOAD_PATH +
                                fileRepFolderId +
                                "/" +
                                fileFolderId;
                            fse.ensureDirSync(downloadPath);
                            fse.emptyDir(downloadPath);
                            cancel_checkout_download(fileEntryId, fileRepFolderId)
                            scriptsPath = os.homedir() + "/" +
                                "Documents/Adobe Scripts/" +
                                fileFolderId + "/"
                            indesignScriptPath = scriptsPath;
                            fse.ensureDirSync(scriptsPath)
                            fse.emptyDir(scriptsPath)
                            writeJStoIndesignScriptJSX(ezTypeUserID, indesignScriptInpPath, DEFAULT_USER, DEFAULT_PASS, process, filename, fileFolderId, fileRepFolderId, fileExtension, fileMimeType, fileDescription, fileTreePath, filePath);
                            supportPath = PAGEMAJIK_DOWNLOAD_PATH + fileRepFolderId +
                                "/" +
                                fileFolderId + "/";
                            fontsFolderPath = supportPath + "/Document fonts/"
                            heimdall = false
                            FontsID = result.Fonts;
                            BookLevelAdobeScriptID = result.BookLevelAdobeScript;

                            LibraryID = result.Library;
                            PresetID = result.Preset;
                            SiteLevelAdobeScriptID = result.SiteLevelAdobeScript;
                            ClientLevelAdobeScriptID = result.ClientLevelAdobeScript;
                            ClientLevelPagemajikScriptID = result.ClientLevelPagemajikScript;
                            InstructionID = result.Instruction;
                            SiteLevelPagemajikScriptID = result.SiteLevelPagemajikScript;
                            BookLevelPagemajikScriptID = result.BookLevelPagemajikScript;

                            MiscellaneousID = result.Miscellaneous;
                            artFolderId = result.Art;
                            commonArtFolderId = result.CommonArt
                            BookMapID = result.BookMap;
                            contents = "%5B";
                            contents = contents + artFolderId + "%2C" +
                                fileFolderId
                            if (commonArtFolderId != 0) {
                                //contents.push(commonArtFolderId);
                                contents = contents + "%2C" +
                                    commonArtFolderId;
                            }

                            if (PresetID != 0) {
                                //contents.push(commonArtFolderId);
                                contents = contents + "%2C" + PresetID;
                                presetFileName = await getPresetFilename(
                                    filePresetID);
                                console.log(presetFileName)
                            }

                            if (process.match("Auto Correction") || process
                                .match(
                                    "First Proof")) {

                                try {
                                    await generateProof();
                                } catch (error) {
                                    console.log("Error Generate Proof" +
                                        error)
                                    sendmail("Generate Proof Failed ",
                                        "Generate Proof failed for file " +
                                        filePath + " with error " +
                                        error)
                                    startpen()
                                    return
                                }
                                //  generateProof();
                                //runIndesignScript(scriptsPath + "PDF_Generator.jsx", scriptsPath);


                            }

                            //contents,SiteLevelAdobeScriptID,SiteLevelPagemajikScriptID,FontsID,ClientLevelAdobeScriptID,ClientLevelPagemajikScriptID,BookLevelAdobeScriptID,BookLevelPagemajikScriptID,InstructionID,LibraryID,idmlfilename,SITE_URL,scriptsPath,fontsFolderPath,heimdall
                            if (process.match("Word to IDML")) {

                                try {
                                    await generateIndesign();
                                } catch (error) {
                                    console.log("Error Generate Indesign" +
                                        error)
                                    sendmail("Generate Indesign Failed  ",
                                        "Generate Indesign failed for file " +
                                        filePath + " with error " +
                                        error)
                                    startpen()
                                    return
                                }

                            }

                        })

                    })



                }
            },
            function (err) {
                console.log(err);
                //gotonextfile();
            })

    } else {
        console.log("Creds or site incomplete")
        clearTimeout(
            timer);
    }
}

//contents,SiteLevelAdobeScriptID,SiteLevelPagemajikScriptID,FontsID,ClientLevelAdobeScriptID,ClientLevelPagemajikScriptID,BookLevelAdobeScriptID,BookLevelPagemajikScriptID,InstructionID,LibraryID,idmlfilename,SITE_URL,scriptsPath,fontsFolderPath

async function generateIndesign() {

    {
        display = "generate Indesign";
    }

    /* if (InstructionID != 0)
        await getAllFolderContents(InstructionID,
            fileRepFolderId); */

    //      function sendNotification(companyID, groupID, userID, type, timeStamp, delivered, payload, archived, receiver) 
    // sendNotification(companyID, fileRepFolderId, ezTypeUserID,
    //     "",
    //     "", ezTypeUserID, filename + " " + display +
    //     " running.", false, statusfileuserID);





    if (SiteLevelAdobeScriptID != 0) {
        // contents.push(SiteLevelAdobeScriptID);
        contents = contents + "%2C" + SiteLevelAdobeScriptID;
    }

    if (SiteLevelPagemajikScriptID != 0) {
        // contents.push(SiteLevelPagemajikScriptID);
        contents = contents + "%2C" +
            SiteLevelPagemajikScriptID;
        //unzip(os.homedir() + "/PageMajik/SLPM.zip", scriptsPath);
    }

    if (FontsID != 0) {
        // contents.push(FontsID)
        contents = contents + "%2C" + FontsID
    }



    if (ClientLevelAdobeScriptID != 0) {
        // contents.push(ClientLevelAdobeScriptID);
        contents = contents + "%2C" + ClientLevelAdobeScriptID
    }

    if (ClientLevelPagemajikScriptID != 0) {
        //contents.push(ClientLevelPagemajikScriptID);
        contents = contents + "%2C" +
            ClientLevelPagemajikScriptID;
    }



    if (BookLevelAdobeScriptID != 0) {
        //contents.push(BookLevelAdobeScriptID)
        contents = contents + "%2C" + BookLevelAdobeScriptID
    }

    if (BookLevelPagemajikScriptID != 0) {
        //contents.push(BookLevelPagemajikScriptID)
        contents = contents + "%2C" +
            BookLevelPagemajikScriptID;
    }

    if (InstructionID != 0) {
        //contents.push(InstructionID);
        contents = contents + "%2C" + InstructionID

        //  unzip(os.homedir() + "/PageMajik/InstructionID.zip", supportPath +"/Instruction/");
    }

    if (LibraryID != 0) {
        contents = contents + "%2C" + LibraryID
    }

    contents = contents + "%5D"
    var serverPath = await getServerPathSync(contents,
        fileRepFolderId);
    // var removepath = serverPath

    //    serverPath = serverPath.rsyncPath;
    var patt = /([\s\W])/g;
    serverPath = serverPath.replace(patt, '\\$1');
    console.log(serverPath)


    try {
        retry = 0;
        await rsyncFetchwithretry(serverPath,
            supportPath, heimdall, "")
    } catch (error) {
        console.log("Rsync finally failed")
          sendmail("Upload for idml failed ", "Rsync Failed for file " + idmlfilename + " in the site " +
           SITE_URL)
    }


    try {
        removefolderpath(removepath);

    } catch (error) {
        console.log("Unable to remove folder path")
    }


    /* console.log(SITE_URL +
        '/api/jsonws/RSync-Portlet-portlet.rsync/remove-folder/' +
        encodeURIComponent(removepath)) */

    var data = fs.readFileSync(scriptsPath +
        "AutoPagination_Processor_Caller.jsx").toString().split(
        "\n");
    data.splice(0, 0,
        javascriptContent);
    var text = data.join("\n");
    //console.log(text)
    // scriptsPath2 = scriptsPath2.replace(" ","/ ")
    // console.log(scriptsPath1 +
    //   "AutoPagination_Processor_Caller.jsx")

    //fs.unlink(scriptsPath1 + "PDF_Generator.jsx")
    fs.writeFileSync(scriptsPath +
        "AutoPagination_Processor_Caller.jsx", text, {},
        function (err, data) {
            console.log(err)
        });


    fs.readdirSync(fontsFolderPath).forEach(file => {
        console.log(file);
        if (file.match(".zip")) {

            osascript.execute(
                'tell application "Finder" to open POSIX file \"' +
                fontsFolderPath + "/" + file + '\"',
                function (err, result, raw) {
                    if (err) return console.log(
                        err)
                    console.log(result, raw)
                });

        }

    })

    if (LibraryID != 0) {

    }

    var completedFN = filename.replace(/\.[^/.]+$/,
        "_Completed.txt")
    var bookmapFN = filename.replace(/\.[^/.]+$/,
        "_bookmap.txt")
    var idmlfilename = filename.replace(/\.[^/.]+$/,
        ".idml")
    var inddname = filename.replace(/\.[^/.]+$/,
        ".indd")
    var pdffilename = filename.replace(/\.[^/.]+$/,
        ".pdf")
    var supportPath2 = supportPath.replace(/\//g,
        '\\')
    supportPath2 = supportPath2.replace(/\/\//g,
        '\\')
    console.log(supportPath2 + completedFN);

    finalGP(heimdall);

    function finalGP(heimdall) {
        if (heimdall == "true") {
            console.log("The gatekeeper allowed me")
            if (currentrun) {
                runIndesignScript(scriptsPath, "AUTO")
                startpen()
            }
        } else {
            heimdall = localStorage.getItem(
                "heimdall")
            setTimeout(function () {
                finalGP(heimdall);
            }, 10000)
        }
    }
}



function writeJStoIndesignScriptJSX(ezTypeUserID, indesignScriptInpPath, DEFAULT_USER, DEFAULT_PASS, process, filename, fileFolderId, fileRepFolderId, fileExtension, fileMimeType, fileDescription, fileTreePath, filePath) {
    javascriptContent = '';
    javascriptContent = javascriptContent +
        " var	statusfileuserID = \"" +
        statusfileuserID + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var	ezTypeUserID = \"" +
        ezTypeUserID + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var	siteURL = \"" +
        SITE_URL + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var	inputFilePath = \"" +
        indesignScriptInpPath + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var	scriptsFilePath = \"" +
        indesignScriptPath + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var pagenum =" +
        pagenum + "\n";
    javascriptContent = javascriptContent +
        " var PageNumStyle = \"" +
        "" + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var webDavAddress = \"" +
        supportPath2 + "Links" + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var userName = \"" +
        DEFAULT_USER + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var userCred = \"" +
        DEFAULT_PASS + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileEntryID = \"" +
        fileEntryID + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var process = \"" +
        process + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var filename = \"" +
        filename + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileFolderId = \"" +
        fileFolderId + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileRepFolderId = \"" +
        fileRepFolderId + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileExtension = \"" +
        fileExtension + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileMimeType = \"" +
        fileMimeType + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileDescription = \"" +
        fileDescription + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileTreePath = \"" +
        fileTreePath + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var filePath = \"" +
        filePath + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var companyID = \"" +
        companyID + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var fileuserID = \"" +
        statusfileuserID + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var slugLineInfo = \"" +
        stage + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var BookMapID = \"" +
        BookMapID + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var ReviewID = \"" +
        ReviewID + "\"" + "\n";
    javascriptContent = javascriptContent +
        " var SupportID = \"" +
        SupportID + "\"" + "\n";
    console.log(javascriptContent);
}



async function generateProof() {
    if (process.match("Auto Correction")) {
        display = "generate Revises";
    } else {
        display = "generate Proof"
    }

    /* if (InstructionID != 0)
        await getAllFolderContents(InstructionID,
            fileRepFolderId); */

    //      function sendNotification(companyID, groupID, userID, type, timeStamp, delivered, payload, archived, receiver) 
    sendNotification(companyID, fileRepFolderId, ezTypeUserID,
        "",
        "", ezTypeUserID, filename + " " + display +
        " running.", false, statusfileuserID);



    if (SiteLevelAdobeScriptID != 0) {
        // contents.push(SiteLevelAdobeScriptID);
        contents = contents + "%2C" + SiteLevelAdobeScriptID;
    }

    if (SiteLevelPagemajikScriptID != 0) {
        // contents.push(SiteLevelPagemajikScriptID);
        contents = contents + "%2C" +
            SiteLevelPagemajikScriptID;
        //unzip(os.homedir() + "/PageMajik/SLPM.zip", scriptsPath);
    }

    if (FontsID != 0) {
        // contents.push(FontsID)
        contents = contents + "%2C" + FontsID
    }



    if (ClientLevelAdobeScriptID != 0) {
        // contents.push(ClientLevelAdobeScriptID);
        contents = contents + "%2C" + ClientLevelAdobeScriptID
    }

    if (ClientLevelPagemajikScriptID != 0) {
        //contents.push(ClientLevelPagemajikScriptID);
        contents = contents + "%2C" +
            ClientLevelPagemajikScriptID;
    }



    if (BookLevelAdobeScriptID != 0) {
        //contents.push(BookLevelAdobeScriptID)
        contents = contents + "%2C" + BookLevelAdobeScriptID
    }

    if (BookLevelPagemajikScriptID != 0) {
        //contents.push(BookLevelPagemajikScriptID)
        contents = contents + "%2C" +
            BookLevelPagemajikScriptID;
    }

    if (InstructionID != 0) {
        //contents.push(InstructionID);
        contents = contents + "%2C" + InstructionID

        //  unzip(os.homedir() + "/PageMajik/InstructionID.zip", supportPath +"/Instruction/");
    }

    contents = contents + "%5D"
    var serverPath = await getServerPathSync(contents,
        fileRepFolderId);
    var removepath = serverPath;

    //    serverPath = serverPath.rsyncPath;
    var patt = /([\s\W])/g;
    serverPath = serverPath.replace(patt, '\\$1');
    console.log(serverPath)


    /* prepend(scriptsPath1 + "PDF_Generator.jsx",
        javascriptContent,
        function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(
                "The ScriptsFile is saved!"
            );
        }); */
    /* try {
        heimdall = await rsyncFetch(serverPath,
            supportPath, "", "")
    } catch (error) {
        console.log("Rsync failed.. gonna retry 1")
        try {
            heimdall = await rsyncFetch(serverPath,
                supportPath, "", "")
        } catch (error) {
            console.log("retry 1 failed")
            console.log("Rsync failed.. gonna retry 2")
            try {
                heimdall = await rsyncFetch(serverPath,
                    supportPath, "", "")
            } catch (error) {
                console.log("retry 2 failed")
                console.log("Rsync failed.. gonna retry 3")
                try {
                    heimdall = await rsyncFetch(serverPath,
                        supportPath, "", "")
                } catch (error) {
                    console.log("retry 3 failed")
                    console.log("I have failed enough")

                    startpen();
                    sendmail("Rsync failed ", "Rsync Failed for file " + filename)
                    return
                }
            }
        }
    } */

    try {
        retry = 0
        await rsyncFetchwithretry(serverPath,
            supportPath, "", "")
    } catch (error) {
        console.log("Rsync finally failed")
        sendmail("Upload for idml failed ", "Rsync Failed for file " + idmlfilename + " in the site " +
            SITE_URL)
    }

    try {
        removefolderpath(removepath);

    } catch (error) {
        console.log("Unable to remove folder path " + error)
    }


    console.log(SITE_URL +
        '/api/jsonws/RSync-Portlet-portlet.rsync/remove-folder/' +
        encodeURIComponent(removepath))
    var data = fs.readFileSync(scriptsPath +
        "PDF_Generator.jsx").toString().split(
        "\n");
    data.splice(0, 0,
        javascriptContent);
    var text = data.join("\n");
    //console.log(text)
    // scriptsPath2 = scriptsPath2.replace(" ","/ ")
    //   console.log(scriptsPath1 + "PDF_Generator.jsx")

    //fs.unlink(scriptsPath1 + "PDF_Generator.jsx")
    fs.writeFileSync(scriptsPath + "PDF_Generator.jsx", text, {},
        function (err, data) {
            console.log(err)
        });

    fs.readdirSync(fontsFolderPath).forEach(file => {
        console.log(file);
        if (file.match(".zip")) {


            try {
                /* var zip = new AdmZip(fontsFolderPath +
                    "/" +
                    file)
                zip.extractAllTo(fontsFolderPath, true)
                console.log("ZIp file is " + file)
                fs.unlink(fontsFolderPath + "/" + file); */

                osascript.execute(
                    'tell application "Finder" to open POSIX file \"' +
                    fontsFolderPath + "/" + file +
                    '\"',
                    function (err, result, raw) {
                        if (err) return console.error(
                            err)
                        console.log(result, raw)
                    });


            } catch (error) {
                //ifzipstuck();
            }

        }

    })
    //    sfs.writeFileSync(scriptsPath1 + "PDF_Generator1.jsx",text,{encoding:'utf8',flag:'w'})

    var completedFN = filename.replace(/\.[^/.]+$/,
        "_Completed.txt")
    var bookmapFN = filename.replace(/\.[^/.]+$/,
        "_bookmap.txt")
    var idmlfilename = filename.replace(/\.[^/.]+$/,
        ".idml")
    var pdffilename = filename.replace(/\.[^/.]+$/,
        ".pdf")

    var supportPath2 = supportPath.replace(/\//g,
        '\\')
    supportPath2 = supportPath2.replace(/\/\//g,
        '\\')

    console.log(supportPath2 + completedFN);

    finalGP(heimdall);

    function finalGP(heimdall) {
        if (heimdall == "true") {
            console.log("The gatekeeper allowed me")
            if (currentrun) {
                runIndesignScript(scriptsPath, "PDF")
                startpen()
            }
        } else {
            heimdall = localStorage.getItem(
                "heimdall")
            setTimeout(function () {
                finalGP(heimdall);
            }, 10000)
        }

    }
}


function getPresetFilename(id) {
    var tmpGPF = URL_FileEntry + id;
    console.log(JSON.stringify(tmpGPF))
    var optionsGPF = {
        method: 'GET',
        uri: tmpGPF,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 240000,
        resolveWithFullResponse: true
    };
    // console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsGPF)
            .then(function (response) {
                // POST succeeded...
                //    console.log(JSON.parse(response.body))
                var currentGPF = JSON.parse(response.body)
                // console.log(currentGPF.title)

                return resolve(currentGPF.title);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err);
                //  gotonextfile();
                return reject(err);

            });
    })
}

function getFileObject(fileEntryID) {
    // var pending_files = "http://process:1234@" + URL_PAGEMAJIK_PENDING + "/group-ids/" + selectedSites + "/indd-version/" + "CS6";
    var localID = fileEntryID
    var tmpGFO = URL_FileVersion + localID;
    console.log(JSON.stringify(tmpGFO))
    var optionsGFO = {
        method: 'GET',
        uri: tmpGFO,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 240000,
        resolveWithFullResponse: true
    };
    // console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsGFO)
            .then(function (response) {
                // POST succeeded...
                //   console.log(JSON.parse(response.body))
                var currentGFO = JSON.parse(response.body)

                return resolve(currentGFO);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err);
                gotonextfile();
                return reject(err);

            });
    })
}

function cancel_checkout_download(fileEntryID, fileRepFolderId) {
    var tmpCCD = URL_cancelCheckout_download + fileEntryID + "/group-id/" + fileRepFolderId +
        "/status/In%20Progress/option/1";
    console.log(JSON.stringify(tmpCCD))
    var optionsCCD = {
        method: 'POST',
        uri: tmpCCD,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 240000,
        resolveWithFullResponse: true
    };
    //  console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsCCD)
            .then(function (response) {
                // POST succeeded...
                //   console.log(JSON.parse(response.body))
                var currentCCD = JSON.parse(response.body)
                return resolve(currentCCD);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                // cancel_checkout_download(fileEntryID, fileRepFolderId)
                sendNotification(companyID, fileRepFolderId, ezTypeUserID,
                    "",
                    "", ezTypeUserID, filename + " " + display +
                    "Unexpected Error. Kindly run the file again ", false,
                    statusfileuserID);
                // gotonextfile(); // need to work on it - File checked in by me, but i don't have download path ?? coz i missed my window, now no file
                return reject(err);
            });
    })
}


function getAllFolderID(fileEntryID, fileRepFolderId) {
    var tmpGAF = URL_cancelCheckout_download + fileEntryID + "/group-id/" + fileRepFolderId +
        "/status/In%20Progress/option/2";
    console.log(JSON.stringify(tmpGAF))
    var optionsGAF = {
        method: 'POST',
        uri: tmpGAF,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 240000,
        resolveWithFullResponse: true
    };
    // console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsGAF)
            .then(function (response) {
                // POST succeeded...
                //   console.log(JSON.parse(response.body))
                var currentGAF = JSON.parse(response.body)
                return resolve(currentGAF);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                retry++;
                if (retry < 2) {
                    getAllFolderID(fileEntryID, fileRepFolderId)
                }
                if (retry == 2) {
                    sendNotification(companyID, fileRepFolderId, ezTypeUserID,
                        "",
                        "", ezTypeUserID, filename + " " + display +
                        " Error while preparing to process the file - Code PMGAFI.", false,
                        statusfileuserID);
                    gotonextfile();
                    return reject(err);
                }

            });
    })
}



function getAllFolderContents(ID, gGroupID, zipName) {
    var tmpGAFC = URL_getAllFiles + ID + "/group-id/" + gGroupID;
    console.log(JSON.stringify(tmpGAFC))
    var optionsGAFC = {
        method: 'POST',
        uri: tmpGAFC,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 600000,
        resolveWithFullResponse: true
    };
    // console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsGAFC)
            .then(function (response) {
                // POST succeeded...
                console.log(JSON.parse(response.body))
                var currentGAFC = JSON.parse(response.body)

                console.log(SITE_URL + currentGAFC)
                rp.get({
                        uri: SITE_URL + currentGAFC,
                        auth: {
                            'user': DEFAULT_USER,
                            'pass': DEFAULT_PASS
                        }
                    }).pipe(fs.createWriteStream(os.homedir() + "/PageMajik/" + zipName))
                    .on(
                        'finish',
                        function (line) {
                            console.log("Finished Parsing " + zipName);
                            return resolve();
                        });

                // fs.createReadStream(os.homedir() + "/PageMajik/myzip.zip").pipe(unzip.Extract({ path: scriptsPath }));

                console.log("Done")
                // return resolve();

            })
            .catch(function (err) {
                // POST failed...
                console.log(err);
                console.log("Downloading " + zipName + " failed. Retry count " + retry)
                retry++;
                if (retry < 2) {
                    // getAllFolderID(fileEntryID)
                    getAllFolderContents(ID, gGroupID, zipName)
                } else {
                    sendNotification(companyID, fileRepFolderId, ezTypeUserID,
                        "",
                        "", ezTypeUserID, filename + " " + display +
                        " Error while preparing to process the file - Code PMGAFC.", false,
                        statusfileuserID);
                    gotonextfile();
                }
                return reject(err);
            });
    })
}

function runIndesignScript(scriptsPath, type) {


    var processtype = null;
    if (type == "AUTO") {
        processtype = "AutoPagination_Processor_Caller.jsx"
    } else {
        processtype = "PDF_Generator.jsx"
    }


    var tmpscript = scriptsPath.replace(" ", "%20")
    var tmpIND = "http://localhost:8080/com.adobe.clover.application/api/idsqueue/EnqueueJob?scriptName=" +
        tmpscript + processtype + "&jobName=" + filePath + "&priority=.5&queueName=Default&maximumRetryCount=3"
    console.log(JSON.stringify(tmpIND))
    var optionsIND = {
        method: 'GET',
        uri: tmpIND,
        timeout: 360000,
        resolveWithFullResponse: true
    };
    // console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsIND)
            .then(function (response) {
                // POST succeeded...
                console.log(response.body)
                var currentIND = response
                // console.log(currentGPF.title)

                return resolve(currentIND);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err);
                //  gotonextfile();
                return reject(err);

            });
    })
}


function runIndesignScript1(scriptsPath) {
    EXT_PATH = localStorage.getItem('EXT_PATH')
    EXT_PATH = EXT_PATH.replace(/ /g, "\\ ")
    //   scriptName = scriptName.replace(/ /g, "\\ ")
    //EXT_PATH = EXT_PATH.replace(/\\/g, '/');
    // EXT_PATH = EXT_PATH.replace(/\s/g, '\\ ');
    /*    console.log("\"" + EXT_PATH + "\" -run \"" + scriptName + "\"")
       cmd.get(
           "\"" + EXT_PATH + "\" -run \"" + scriptName + "\"",
           function (err, data, stderr) {
               console.log('the current working dir is : ', data)
               return new Promise(function (resolve, reject) {
                   if (err == null) {
                       //console.log(stderr)
                       return resolve(stderr);
                   } else {
                       //console.log(err)
                       return reject(err);
                   }
               });
           }) */

    var container = $('#menu1');
    $(container).append("<div class='content_list_right'>" +
        "<span>" + "Indesign process started ." + "</span>" +
        "</div>");

    var error
    var child = exec("./indd.sh", {
            cwd: scriptsPath
        },
        function (error, stdout, stderr) {
            //console.log('stdout: ' + stdout);
            // console.log('stderr: ' + stderr);
            if (error !== null) {
                // console.log('exec error: ' + error);
            }
        });
    child.stdout.on('data', function (data) {
        //pendingfiles();
        console.log('stdout: ' + data)
    })
    child.stderr.on('data', function (data) {
        //pendingfiles();
        console.log('stderr: ' + data);
        error = data;
    })
    /* child.on("close", function () {
        if(error.match("damaged and cannot be recovered")){
            fse.emptyDir(scriptsPath);
            javascriptContent = '';
            startpen();
        }
        if(error.match("got an error: open (-1708)")){
            runIndesignScript(scriptName, scriptsPath);
        }
    }); */
}


async function sendmail(subject, message) {
    server.send({
        text: message,
        from: "support@pagemajik.com",
        to: "support@pagemajik.com",
        cc: "bhaskara@pagemajik.com,subashp@pagemajik.com",
        subject: subject
    }, function (err, message) {
        console.log(err || message);
    });
}


async function addorupdatefile(fileRepFolderId, fileFolderId, completedFN, completedfilepath,
    companyID,
    fileuserID, type) {
    console.log(completedfilepath)
    console.log(fileFolderId);


    var container = $('#menu1');
    $(container).append("<div class='content_list_right'>" +
        "<span>" + "Uploading file " + completedFN + "</span>" +
        "</div>");

    var mimeType

    if (type == "pdf") {
        mimeType = "application/vnd.adobe.indesign-idml-package";
    }
    if (type == "indd") {
        mimeType = "application/vnd.adobe.indesign-idml-package";
    }
    if (type == "idml") {
        mimeType = "application/vnd.adobe.indesign-idml-package";
    }


    var mimeType = "application/vnd.adobe.indesign-idml-package";
    var descripton = "-description"
    var changelog = "-change-log"
    var tmpAOUF = SITE_URL + "/api/jsonws/Dazzle-portlet.pagemajik/add-or-update" //repository-id" + fileRepFolderId + "/folder-id/" +
    //   fileFolderId + "/folder-id/" +fileFolderId + "/source-file-name/" + completedFN + "/" + memetype + "/title/" + completedFN + "/" +
    //    descripton + "/" + changelog;
    console.log(JSON.stringify(tmpAOUF))
    var optionsAOUF = {
        method: 'POST',
        url: tmpAOUF,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        //timeout: 30000,
        formData: {
            repositoryId: fileRepFolderId,
            folderId: fileFolderId,
            sourceFileName: completedFN,
            mimeType: mimeType,
            title: completedFN,
            description: "",
            changeLog: "",
            file: fs.createReadStream(completedfilepath)
        },
        // json: true
        // resolveWithFullResponse: true
    };
    // console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsAOUF)
            .then(function (response) {
                // POST succeeded...
                //   console.log(JSON.parse(response.body))
                //var currentCFEBN = JSON.parse(response.body)
                console.log(response)
                if (response.match("exception")) {
                    // gotonextfile();
                    $(container).append("<div class='content_list_right'>" +
                        "<span>" + "Error while Uploading file " + completedFN + "</span>" +
                        "</div>");
                    sendNotification(companyID, fileRepFolderId, ezTypeUserID,
                        "",
                        "", ezTypeUserID, filename + " " + display +
                        " Error while uploading the file - " + completedFN + " " + type +
                        " .",
                        false, statusfileuserID
                    );
                    //  setTimeout(gotonextfile, 3000)
                    return reject(err)
                } else {
                    var container = $('#menu1');
                    $(container).append("<div class='content_list_right'>" +
                        "<span>" + "Uploaded file " + completedFN + "</span>" +
                        "</div>");
                    return resolve(response);
                }


            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                // getAllFolderID(fileEntryID)
                sendNotification(companyID, fileRepFolderId, ezTypeUserID,
                    "",
                    "", ezTypeUserID, filename + " " + display +
                    " Error while uploading the file - " + completedFN + " " + type + " .",
                    false, statusfileuserID
                );
                //gotonextfile();
                return reject(err);
            });
    })
}

/*   function addFileEntry(fileRepFolderId, fileFolderId, completedFN, completedfilepath, companyID, fileuserID) {

      var memetype = "-meme-type";
      var descripton = "-description"
      var changelog = "-change-log"
      var tmpAFE = SITE_URL + "/api/jsonws/dlapp/add-file-entry/repository-id/" + fileRepFolderId + "/folder-id/" +
          fileFolderId + "/source-file-name/" + completedFN + "/" + memetype + "/title/" + completedFN + "/" +
          descripton + "/" + changelog;
      console.log(JSON.stringify(tmpAFE))
      var optionsAFE = {
          method: 'POST',
          uri: tmpAFE,
          auth: {
              'user': DEFAULT_USER,
              'pass': DEFAULT_PASS
          },
          timeout: 50000,
          formData: {
              file: fs.createReadStream(completedfilepath)
          },
          //resolveWithFullResponse: true
      };
      // console.log(fileEntryID)

      // Return new promise 

      return new Promise(function (resolve, reject) {
          // Do async job
          rp(optionsAFE)
              .then(function (response) {
                  // POST succeeded...
                  //   console.log(JSON.parse(response.body))
                  //var currentCFEBN = JSON.parse(response.body)
                  console.log(response)
                  return resolve(response);

              })
              .catch(function (err) {
                  // POST failed...
                  console.log(err)
                  // getAllFolderID(fileEntryID)
                  return reject(err);
              });
      })



  } */

function delay(t, val) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val);
        }, t);
    });
}

async function rsyncFetchwithretry(serverPath,
    supportPath, heimdall, dumb) {
    return new Promise(async function (resolve, reject) {
        // Do async job
        try {
            await delay(3000, "try")
            await rsyncFetch(serverPath,
                supportPath, "", "")
            return resolve();
        } catch (error) {
            console.log(error)
            console.log("rsync Failed.. gonna retry 1")
            try {
                await delay(3000, "retry1")
                await rsyncFetch(serverPath,
                    supportPath, "", "")
                return resolve();
            } catch (error) {
                console.log("retry 1 failed")
                console.log("rsync Failed.. gonna retry 2")
                try {
                    await delay(3000, "retry2")
                    rsyncFetch(serverPath,
                        supportPath, "", "")
                    return resolve();
                } catch (error) {
                    console.log("retry 2 failed")
                    console.log("rsync Failed.. gonna retry 3")
                    try {
                        await delay(3000, "retry3")
                        await rsyncFetch(serverPath,
                            supportPath, "", "")
                        return resolve();
                    } catch (error) {
                        console.log("retry 3 failed")
                        console.log("I have failed enough")
                        return reject();
                        //   startpen();
                        //  return
                    }
                }
            }
        }
    })
}

async function rsyncFetchwithretry_OLD(serverPath,
    supportPath, dummy, dumb) {
    return new Promise(async function (resolve, reject) {
        retry++;
        // Do async job
        if (retry < 3) {
            try {
                await delay(3000, "try")
                console.log("Inside rsync")
                try {
                    await rsyncFetch(serverPath,
                        supportPath, dummy, dumb)
                    return resolve();
                } catch (error) {
                    if (retry == 2)
                        return reject()
                }



            } catch (error) {
                console.log("rsync Failed.. gonna retry " + retry)
                rsyncFetchwithretry(serverPath,
                    supportPath, retry, dumb)
            }
        } else {
            return reject("Rsync failed")
            console.log("I tried my best")
        }

    })
}


async function getServerPathSync(contents, fileRepFolderId) {
    var tmpGSP = SITE_URL + "/api/jsonws/RSync-Portlet-portlet.rsync/get-folder-files/folder-ids/" +
        contents +
        "/grp-id/" + fileRepFolderId;
    console.log(JSON.stringify(tmpGSP))
    var optionsGSP = {
        method: 'GET',
        uri: tmpGSP,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 600000,
        resolveWithFullResponse: true
    };
    //  console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsGSP)
            .then(function (response) {
                // POST succeeded...
                console.log(JSON.parse(response.body))
                var currentGSP = JSON.parse(response.body)
                return resolve(currentGSP);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                gotonextfile();
                // cancel_checkout_download(fileEntryID, fileRepFolderId)
                return reject(err);
            });
    })

}





function rsyncFetch(filepath, destination, key, instancelogin) {
    var filepath = filepath + "/"
    var destination = destination
    var key = key
    var hostname = instancelogin
    var okay = true;
    return new Promise(function (resolve, reject) {

        //	var OS = OS

        // process1.env.PATH = "C:/windows/system32";
        // console.log(process1.env.PATH)
        // console.log(supportPath)
        /*  if (!fs.existsSync(os.homedir() + "/supportPath")) {
             fs.mkdirSync(os.homedir() + "/supportPath");
         } */

        //Example

        //    var key = "c:/Work/Rsync/Rsync/uploadingserver.pem"

        //online ubuntu@ec2-34-232-189-147.compute-1.amazonaws.com

        // net ubuntu@ec2-34-230-193-170.compute-1.amazonaws.com:

        //  var hostname = "ubuntu@ec2-54-237-212-163.compute-1.amazonaws.com"

        //test server info ubuntu@ec2-35-169-174-159.compute-1.amazonaws.com:

        //  var filepath = "/opt/tmp"

        //   var destination = "c:/Work/Rsync/Rsync/"
        var patt = /([\s])/g;

        if (SITE_URL.match(".online")) {
            hostname = "ubuntu@ec2-34-232-189-147.compute-1.amazonaws.com:";
            key = os.homedir() + "/pagemajik-com-online.pem"
        }
        if (SITE_URL.match(".net")) {
            hostname = "ubuntu@ec2-34-230-193-170.compute-1.amazonaws.com:";
            key = os.homedir() + "/pagemajik-com-net.pem"
        }
        if (SITE_URL.match(".info")) {
            hostname = "ubuntu@ec2-35-169-174-159.compute-1.amazonaws.com:";
            key = os.homedir() + "/pagemajik-com-info.pem"
        }
        if (SITE_URL.match("org")) {
            hostname = "ubuntu@ec2-34-237-132-223.compute-1.amazonaws.com:";
            key = os.homedir() + "/pagemajik-com-org.pem"
        }
        if (SITE_URL.match("10.1.1.41")) {
            hostname = "liferayapp@10.1.1.41";
            key = os.homedir() + "/pagemajik-com-41.pem"
        }
        //    key = key.replace(patt, '\\$1');

        console.log(os.homedir() + destination)
        var dataf = [];

        //sample command
        //child = exec("rsync -Pav -e \"ssh -i "+key+"\" "+hostname+":"+filepath+ " "+destination)
        //rsync -avre "ssh -i uploadingserver.pem" ubuntu@ec2-54-80-249-39.compute-1.amazonaws.com:/opt/tmp /Users/rd/Desktop/Subash/Temp/

        var child = exec("rsync --inplace -avrue \"ssh -o StrictHostKeyChecking=no -i \'" + key +
            "\'\" " + "\"" +
            hostname +
            "" + filepath +
            "\"" +
            " .", {
                cwd: destination
            });
        child.stdout.on('data', function (data) {
            //pendingfiles();
            //console.log(data)
            // dataf.push(data);
        })

        child.stderr.on('data', async function (data) {
            //pendingfiles();
            console.log(data)

            if (data.match("spawn")) {
                okay = false
                return reject();
            } else if (data.match("No such file") || (data.match("some files"))) {
                okay = false
                return reject();
            } else {

            }

            /* if (retry < 3) {
                retry++
                if (data.match("spawn") || data.match("some files could not be transferred") ||
                    data.match("No such file")) {
                    okay = false;
                    var container = $('#menu1');
                    $(container).append("<div class='content_list_right'>" +
                        "<span>" + "Rsync copy retry ." + "</span>" +
                        "</div>");
                    try {
                        await rsyncFetch(filepath, destination, "", "")
                    } catch (error) {
                        console.log("Rsync failed inside .. Moving to next file")
                    }

                }
            } else {
                var container = $('#menu1');
                $(container).append("<div class='content_list_right'>" +
                    "<span>" + "Rsync copy failed ." + "</span>" +
                    "</div>");
                okay = false;

                return reject();
            } */


        })
        child.on("close", async function () {

            // Do async job

            var container = $('#menu1');


            console.log(scriptsPath)


            if (okay) {
                $(container).append("<div class='content_list_right'>" +
                    "<span>" + "Rsync process completed ." + "</span>" +
                    "</div>");
                fse.ensureDirSync(destination + 'Fonts');
                fse.ensureDirSync(destination + 'Art');

                try {
                    fse.move(destination + "Fonts/", destination + "Document fonts", {
                        overwrite: true
                    }, err => {
                        if (err) return console.log(err)

                        console.log('success!')
                    })
                } catch (error) {
                    return reject(err);
                }


                try {
                    fse.move(destination + "Art/", destination + "Links", {
                        overwrite: true
                    }, err => {
                        if (err) return console.log(err)

                        console.log('success!')
                    })
                } catch (error) {
                    return reject(err);
                }


                fse.ensureDirSync(destination + "Print Preset");
                fs.readdirSync(destination + "Print Preset").forEach(file => {
                    console.log(file);
                    if (file !== presetFileName) {
                        fs.unlink(destination + "Print Preset/" + file)
                    }

                })

                //   copydir.sync(destination + "PageMajik", "/Documents/Adobe\ Scripts/");

                var i = 1
                //  console.log("Copying scripts one")
                //    await  copydir(destination + "PageMajik/*", os.homedir()+"/Documents/Adobe\ Scripts/")
                //   console.log("copying scripts two")
                //      await  copydir(destination + "Adobe\ Scripts/*", os.homedir()+"/Documents/Adobe\ Scripts/")

                // copydir.sync(destination + "PageMajik", "/Documents/Adobe\ Scripts/");

                fse.copy(destination + "Indesign",
                    destination,
                    function (err) {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else {
                            console.log("success!");
                        }
                    });

                fse.copy(destination + "PageMajik", os.homedir() +
                    "/Documents/Adobe Scripts/" +
                    fileFolderId,
                    function (err) {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else {
                            console.log("success!");
                            fse.copy(destination + "Adobe Scripts", os.homedir() +
                                "/Documents/Adobe Scripts/" + fileFolderId,
                                function (err) {
                                    if (err) {
                                        console.log(err);
                                        return reject(err);
                                    } else {
                                        console.log("success!");
                                        return resolve("done");
                                    }
                                });
                        }
                    }); //copies directory, even if it has subdirectories or file

                heimdall = true;
                localStorage.setItem("heimdall", "true")

            }

        })

    })
}

async function copydir(src, dest) {
    //    mkdir(dest);
    var child = exec("cp -rf " + src + " " + "dest",
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    child.stdout.on('data', function (data) {
        //pendingfiles();
        console.log(data)
        dataf.push(data);
    })

    child.stderr.on('data', function (data) {
        //pendingfiles();
        console.log(data)
        return reject("error")
    })
    child.on("close", async function () {
        return resolve("done");
    })

};

function gotonextfile() {
    currentrun = false;
    console.log("failed...")
    console.log(filename);
    addFileToFailed(filename, filepathbroken[1], filepathbroken[5], process);
    //    FailedFiles.push(localStorage.getItem("FailedFiles"));
    //   FailedFiles.push(filename)
    //   localStorage.setItem("FailedFiles", FailedFiles);

    clearTimeout(
        timer);
    startpenstuck();
    return;
}


function sendNotification(companyID, groupID, userID, type, timeStamp, delivered, payload, archived,
    receiver) {
    console.log(companyID)
    console.log(groupID);
    console.log(userID);
    console.log(type);
    console.log(timeStamp);
    console.log(delivered);
    console.log(payload);
    console.log(archived);
    console.log(receiver);

    var tmpSN = SITE_URL + "/api/jsonws/Dazzle-portlet.notify/create-notification/company-id/" + companyID +
        "/group-id/0/user-id/" + receiver + "/-type_/time-stamp/0/delivery-by/" + userID +
        "/delivered/0/payload/" + payload + "/archived/false/receiver/" + receiver
    //repository-id" + fileRepFolderId + "/folder-id/" +
    //   fileFolderId + "/folder-id/" +fileFolderId + "/source-file-name/" + completedFN + "/" + memetype + "/title/" + completedFN + "/" +
    //    descripton + "/" + changelog;
    console.log(JSON.stringify(tmpSN))
    var optionstmpSN = {
        method: 'POST',
        url: tmpSN,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        //timeout: 30000,
        /* formData: {
            companyId: companyId,
            groupId: "0",
            userId: receiver,
            type_: type,
            timeStamp:"0",
            deliveryBy: userID,
            delivered: "0",
            payload: payload,
            archived: archived,
            receiver: receiver
        }, */
        // json: true
        resolveWithFullResponse: true
    };
    // console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionstmpSN)
            .then(function (response) {
                // POST succeeded...
                console.log(JSON.parse(response.body))
                var currentSN = JSON.parse(response.body)
                //  console.log(response)
                return resolve(currentSN);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                // getAllFolderID(fileEntryID)
                //gotonextfile();
                return reject(err);
            });
    })
}


function getUserIdByScreenName(companyID, userScreenName) {
    var tmpGUID = SITE_URL +
        "/api/jsonws/user/get-user-id-by-screen-name/company-id/" + companyID + "/screen-name/" +
        userScreenName;
    console.log(JSON.stringify(tmpGUID))
    var optionsGUID = {
        method: 'GET',
        uri: tmpGUID,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 120000,
        resolveWithFullResponse: true
    };
    //  console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsGUID)
            .then(function (response) {
                // POST succeeded...
                console.log(response)
                console.log(JSON.parse(response.body))
                var currentGSP = JSON.parse(response.body)
                return resolve(currentGSP);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                // gotonextfile();
                // cancel_checkout_download(fileEntryID, fileRepFolderId)
                return reject(err);
            });
    })
}


function getBookmapPageNumber(fileEntryId, title) {
    var patt1 = /\.[0-9a-z]+$/i;
    var twe = title.replace(patt1, "")
    var tmpGBM = SITE_URL +
        "/api/jsonws/Dazzle-portlet.pagemajik/get-book-map-json/file-entry-id/" + fileEntryId +
        "/chapter-title/" + twe
    console.log(JSON.stringify(tmpGBM))
    var optionsGBM = {
        method: 'GET',
        uri: tmpGBM,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 120000,
        resolveWithFullResponse: true
    };

    //  console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsGBM)
            .then(function (response) {
                // POST succeeded...
                //   console.log(response)
                console.log(JSON.parse(response.body))
                var currentGBM = JSON.parse(response.body)
                return resolve(currentGBM);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                gotonextfile();
                //  break;
                // cancel_checkout_download(fileEntryID, fileRepFolderId)
                return reject(err);
            });
    })

}

function removefolderpath(filepath) {
    console.log(filepath)
    var tmpRFP = SITE_URL +
        "/api/jsonws/RSync-Portlet-portlet.rsync/remove-folder/"
    console.log(JSON.stringify(tmpRFP))
    var optionsRFP = {
        method: 'POST',
        uri: tmpRFP,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 120000,
        formData: {
            path: filepath
        }
    };
    //  console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsRFP)
            .then(function (response) {
                // POST succeeded...
                //   console.log(response)
                console.log(JSON.parse(response))
                var currentRFP = JSON.parse(response)
                return resolve(currentRFP);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                gotonextfile();
                //   break;
                // cancel_checkout_download(fileEntryID, fileRepFolderId)
                return reject(err);
            });
    })
}

function putBookmapPageNumber(fileEntryId, title, PGnum) {
    var patt1 = /\.[0-9a-z]+$/i;
    var twe = title.replace(patt1, "")
    var tmpPBM = SITE_URL +
        "/api/jsonws/Dazzle-portlet.pagemajik/update-book-map-json/file-entry-id/" + fileEntryId +
        "/chapter-title/" + twe + "/page-count/" + PGnum
    console.log(JSON.stringify(tmpPBM))
    var optionsPBM = {
        method: 'GET',
        uri: tmpPBM,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 120000,
        resolveWithFullResponse: true
    };
    //  console.log(fileEntryID)

    // Return new promise 

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsPBM)
            .then(function (response) {
                // POST succeeded...
                //   console.log(response)
                console.log(JSON.parse(response.body))
                var currentPBM = JSON.parse(response.body)
                return resolve(currentPBM);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                gotonextfile();
                //   break;
                // cancel_checkout_download(fileEntryID, fileRepFolderId)
                return reject(err);
            });
    })
}

function cancel_checkout(fileEntryId) {
    var tmpCC = URL_cancelCheckout + fileEntryID;
    console.log(JSON.stringify(tmpCC))
    var optionsCC = {
        method: 'POST',
        uri: tmpCC,
        auth: {
            'user': DEFAULT_USER,
            'pass': DEFAULT_PASS
        },
        timeout: 240000,
        resolveWithFullResponse: true
    };
    //  console.log(fileEntryID)

    // Return new promise

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsCC)
            .then(function (response) {
                // POST succeeded...
                console.log(JSON.parse(response.body))
                if (response.body.match("exception")) {
                    // gotonextfile();
                    return reject("exception")
                }
                var currentCC = JSON.parse(response.body)
                return resolve(currentCC);

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                sendNotification(companyID, fileRepFolderId, ezTypeUserID,
                    "",
                    "", ezTypeUserID, filename + " " + display +
                    "Cancel checkout failed. But the file is completed. Kindly cancel checkout manually if it is not Locked",
                    false, statusfileuserID);
                // gotonextfile(); //Need to work on error - process completed but no checkout??
                return reject(err);
            });
    })
}

function addFileToInProgress(filename) {
    var container = $('#menu1');
    //var inputs = container.find('div');
    var id = filename;
    $(container).empty();

    /* $('<div>', {
        class: "content_header content_list_left",
    }).appendTo(container) */

    $(container).append("<div class='content_list_right'>" +
        "<span>" + process + " running for " + filename + "</span>" +
        "</div>")
}



function addFileToFailed(filename, selectedsite, bookname, process) {


    var container = $('#menu1');
    $(container).empty();
    var container1 = $('#menu3')
    $(container1).append("<div class='content_list_right'>" +
        "<span>" + filename + "</span>" +
        "</div>")
}

$('#box-1').click(function (event) {
    if (this.checked) {
        // Iterate each checkbox
        $(':checkbox').each(function () {
            this.checked = true;
        });
    } else {
        $(':checkbox').each(function () {
            this.checked = false;
        });
    }
});