var rp = require('request-promise');

var removepath = "/home/ubuntu/Rsync/Eztype/Backup Springer/21181106";


removefile(removepath)


function removefile(removepath) {
    var tmpRF = "http://developer.pagemajik.online" +
        '/api/jsonws/RSync-Portlet-portlet.rsync/remove-folder' //path/' +
       // encodeURIComponent(removepath)
    console.log(JSON.stringify(tmpRF))
    var optionsRF = {
        method: 'POST',
        url: tmpRF,
        auth: {
            'user': "process",
            'pass': "1234"
        },

        formData: {
            path: encodeURIComponent(removepath)
        },
        timeout: 240000

     //   resolveWithFullResponse: false
    };
    //  console.log(fileEntryID)

    // Return new promise

    return new Promise(function (resolve, reject) {
        // Do async job
        rp(optionsRF)
            .then(function (response) {
                // POST succeeded...
                   console.log(JSON.parse(response))
             //   var currentCC = JSON.parse(response.body)
                return resolve();

            })
            .catch(function (err) {
                // POST failed...
                console.log(err)
                
                //gotonextfile(); //Need to work on error - process completed but no checkout??
                return reject(err);
            });
    })
}