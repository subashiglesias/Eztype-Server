module.exports = {
    completedFS: function (tmppath) {
                    console.log(tmppath)
                    var inddpath = tmppath.replace("_Completed.txt", ".indd")
                    var bookmappath = tmppath.replace("_Completed.txt", "_bookmap.txt")
                    var idmlpath = tmppath.replace("_Completed.txt", ".idml")
                    var pdfpath = tmppath.replace("_Completed.txt", ".pdf")
                    var inddarr = inddpath.split('/')
                    var tmpname = inddarr[inddarr.length - 1];
                    var inddname = tmpname.replace(/\.[^/.]+$/, ".indd")
                    var pdffilename = inddname.replace(/\.[^/.]+$/, ".pdf")
                    var idmlfilename = inddname.replace(/\.[^/.]+$/, ".idml")
                    var fileRepFolderId = null;
                    var fileFolderId = null;
                    var companyID = null;
                    var fileuserID = null;
                    var SITE_URL = null;
                    var process = null;
                    var DEFAULT_USER = null;
                    var DEFAULT_PASS = null;
                    var companyID = null
                    fs.readFile(tmppath, 'utf8', async function (
                        err, data) {
                        if (err) throw err;
                        console.log('OK: ' + filename);
                        try {
                            console.log(JSON.parse(data))
                            data = JSON.parse(data)
                        } catch (error) {
                            console.log(error)
                        }

                        fileFolderId = data.fileFolderId
                        fileRepFolderId = data.fileRepFolderId
                        companyID = data.companyID
                        fileuserID = data.fileuserID
                        process = data.process
                        SITE_URL = data.SITE_URL
                        DEFAULT_USER = data.userName
                        DEFAULT_PASS = data.userCred
                        companyID = data.companyID
                        ezTypeUserID = data.ezTypeUserID
                        statusfileuserID = data.statusfileuserID
                        fileEntryID = data.fileEntryID
                        ReviewID = data.ReviewID
                        SupportID = data.SupportID
                        BookMapID = data.BookMapID



                        fs.readFile(bookmappath, 'utf8', async function (
                            err, data) {
                            if (err) throw err;
                            console.log('OK: ' + filename);
                            console.log(data)
                            await putBookmapPageNumber(BookMapID, filename,
                                data);
                        });


                        if (process == "Word to IDML") {
                            try {
                                await addorupdatefilewithretry(
                                    SITE_URL, DEFAULT_USER, DEFAULT_PASS,
                                    fileRepFolderId,
                                    fileFolderId,
                                    inddname,
                                    inddpath,
                                    companyID,
                                    fileuserID,
                                    "indd")
                            } catch (error) {
                                console.log("Update for indd failed")
                                sendmail("Upload for indd failed ", "Upload Failed for file " + inddname + " in the site " + SITE_URL)
                            }


                            sendNotification1
                                (companyID,
                                    fileRepFolderId,
                                    ezTypeUserID,
                                    "",
                                    "",
                                    ezTypeUserID,
                                    filename +
                                    " " +
                                    display +
                                    " Complete",
                                    false,
                                    statusfileuserID
                                );

                            await cancel_checkout(
                                fileEntryID
                            )
                            var delpath = pdfpath.replace(pdffilename, "");
                            var delpath1 = os.homedir() + "/" + "Documents/Adobe Scripts/" +
                                fileFolderId
                            console.log(delpath)
                            fse.emptyDir(delpath)
                            fse.emptyDir(delpath1)
                        } else {
                            console.log("Update Error")
                        }



                        if (process.match("Auto Correction") || process.match("First Proof")) {

                            if (process.match("Auto Correction")) {

                                try {
                                    await addorupdatefilewithretry(
                                        SITE_URL, DEFAULT_USER, DEFAULT_PASS,
                                        fileRepFolderId,
                                        fileFolderId,
                                        inddname,
                                        inddpath,
                                        companyID,
                                        fileuserID,
                                        "indd")
                                } catch (error) {
                                    console.log("Update for indd failed")
                                    sendmail("Upload for indd failed ", "Upload Failed for file " + inddname + " in the site " + SITE_URL)
                                }

                            }
                            try {
                                await addorupdatefilewithretry(
                                    SITE_URL, DEFAULT_USER, DEFAULT_PASS,
                                    fileRepFolderId,
                                    ReviewID,
                                    pdffilename,
                                    pdfpath,
                                    companyID,
                                    fileuserID,
                                    "pdf"
                                )
                            } catch (error) {
                                console.log("Update for pdf failed")
                                sendmail("Upload for pdf failed ", "Rsync Failed for file " + pdffilename + +" in the site " + SITE_URL)
                            }
                            try {
                                await addorupdatefilewithretry(
                                    SITE_URL, DEFAULT_USER, DEFAULT_PASS,
                                    fileRepFolderId,
                                    SupportID,
                                    idmlfilename,
                                    idmlpath,
                                    companyID,
                                    fileuserID,
                                    "idml"
                                )
                            } catch (error) {

                                console.log("Update for idml failed")
                                sendmail("Upload for idml failed ", "Rsync Failed for file " + idmlfilename + " in the site " + SITE_URL)
                            }

                            fse.emptyDir(delpath)
                            fse.emptyDir(delpath1)

                            try {
                                await cancel_checkout(
                                    fileEntryID
                                )
                            } catch (error) {
                                console.log("Cancel checkout failed")
                            }

                            var delpath = pdfpath.replace(pdffilename, "");
                            var delpath1 = os.homedir() + "/" + "Documents/Adobe Scripts/" +
                                fileFolderId
                            console.log(delpath)
                            fse.emptyDir(delpath)
                            fse.emptyDir(delpath1)

                        }
                        await putBookmapPageNumber(BookMapID, filename,
                            data);
                    });








        async function addorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
            companyID,
            fileuserID, type) {
            console.log(completedfilepath)
            console.log(fileFolderId);


            var container = $('#menu1');
            $(container).append("<div class='content_list_right'>" +
                "<span>" + "Uploading file " + completedFN + "</span>" +
                "</div>");

            var mimeType = null;

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
                //  timeout: 6000,
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
                            /* $(container).append("<div class='content_list_right'>" +
                                "<span>" + "Error while Uploading file " + completedFN + "</span>" +
                                "</div>");
                            sendNotification(companyID, fileRepFolderId, ezTypeUserID,
                                "",
                                "", ezTypeUserID, filename + " " + display +
                                " Error while uploading the file - " + completedFN + " " + type + " .",
                                false, statusfileuserID
                            ); */
                            //setTimeout(gotonextfile, 3000)

                            return reject("err")
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
                        //       var delpath = completedfilepath.replace(fileFolderId + "/" + completedFN, "");
                        //       var delpath1 = os.homedir() + "/" + "Documents/Adobe Scripts/" +
                        //            fileFolderId
                        //      console.log(delpath)
                        //      fse.emptyDir(delpath)
                        //       fse.emptyDir(delpath1)
                        // getAllFolderID(fileEntryID)

                        //gotonextfile();
                        return reject(err);
                    });
            })
        }

        function delay(t, val) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(val);
                }, t);
            });
        }

        async function addorupdatefilewithretry(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
            companyID,
            fileuserID, type) {
            return new Promise(async function (resolve, reject) {
                // Do async job
                try {
                    await delay(3000, "try")
                    await addorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                        companyID,
                        fileuserID, type)
                    return resolve();
                } catch (error) {
                    console.log("Upload Failed.. gonna retry 1")
                    try {
                        await delay(3000, "retry1")
                        await addorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                            companyID,
                            fileuserID, type)
                        return resolve();
                    } catch (error) {
                        console.log("retry 1 failed")
                        console.log("Upload Failed.. gonna retry 2")
                        try {
                            await delay(3000, "retry2")
                            awaitaddorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                                companyID,
                                fileuserID, type)
                            return resolve();
                        } catch (error) {
                            console.log("retry 2 failed")
                            console.log("Upload Failed.. gonna retry 3")
                            try {
                                await delay(3000, "retry3")
                                await addorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                                    companyID,
                                    fileuserID, type)
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

        /*  async function addorupdatefilewithretry(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
             companyID,
             fileuserID, type) {
             return new Promise(async function (resolve, reject) {
                 // Do async job
                 try {
                     await delay(3000, "try")
                     await addorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                         companyID,
                         fileuserID, type)
                     return resolve();
                 } catch (error) {
                     console.log("Upload Failed.. gonna retry 1")
                     try {
                         await delay(3000, "retry1")
                         await addorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                             companyID,
                             fileuserID, type)
                         return resolve();
                     } catch (error) {
                         console.log("retry 1 failed")
                         console.log("Upload Failed.. gonna retry 2")
                         try {
                             await delay(3000, "retry2")
                             awaitaddorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                                 companyID,
                                 fileuserID, type)
                             return resolve();
                         } catch (error) {
                             console.log("retry 2 failed")
                             console.log("Upload Failed.. gonna retry 3")
                             try {
                                 await delay(3000, "retry3")
                                 await addorupdatefile(SITE_URL, DEFAULT_USER, DEFAULT_PASS, fileRepFolderId, fileFolderId, completedFN, completedfilepath,
                                     companyID,
                                     fileuserID, type)
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
         } */

        function sendNotification1(companyID, groupID, userID, type, timeStamp, delivered, payload, archived,
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
    }


};