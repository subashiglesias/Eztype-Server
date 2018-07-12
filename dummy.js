module.exports = {
    watch: function () {
        console.log("Watcher Activated")
        var supportPath = os.homedir() + "/PageMajik"
        watcher = chokidar.watch(
            supportPath, {
                persistent: true
            });


        // Something to use when events are received.
        var log = console.log.bind(
            console);
        // Add event listeners.
        watcher
            .on('add', async function (
                path) {
                console.log(path)
                var tmppath = path;


                if (tmppath.match("_Completed.txt")) {
                    console.log(tmppath)
                    var inddpath = tmppath.replace("_Completed.txt",".indd")
                    var inddarr = inddname.split('/')
                    var inddname = inddarr(inddarr.length);
                    var fileRepFolderId = null;
                    var fileFolderId = null;
                    var companyID = null;
                    var fileuserID = null;
                    fs.readFile(tmppath, 'utf8', async function (
                        err, data) {
                        if (err) throw err;
                        console.log('OK: ' + filename);
                        console.log(JSON.parse(data))
                        fileFolderId = data.fileFolderId
                        fileRepFolderId = data.fileRepFolderId
                        companyID = data.companyID
                        fileuserID = data.fileuserID
                        //await putBookmapPageNumber(BookMapID, filename,
                          //  data);
                    });
                   
                    await addorupdatefile
                    (
                        fileRepFolderId,
                        fileFolderId,
                        inddname,
                        inddpath,
                        companyID,
                        fileuserID,
                        "indd")

                }

                /* fileExists(supportPath2 +
                        completedFN)
                    .then(exists => {
                        console.log(exists) // OUTPUTS: true or false
                        if (exists == true) {
                            Console.log("Got the file")
                            // checkEx = true;
                        } else {
                            console.log("FALSE")
                        }
                    }) */
            })
        /* .on('change', path => log(
            `File ${path} has been changed`))
        .on('unlink', path => log(
            `File ${path} has been removed`)); */

        // More possible events.
        watcher
            .on('addDir', path => log(
                `Directory ${path} has been added`
            ))
            .on('unlinkDir', path =>
                log(
                    `Directory ${path} has been removed`
                ))
            .on('error', error => log(
                `Watcher error: ${error}`
            ))
            .on('ready', () => log(
                'Initial scan complete. Ready for changes'
            ))
    }


};