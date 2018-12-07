
var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API");
    });



   

    app.get("/id/:id/site/:site", function (req, res) {
        //Will get file entry id in this method
        var fileEntryId = parseInt(req.params.id);
        var SITE = "http://www." + req.params.site
        res.status(200).send("Good Job");
        console.log(typeof fileEntryId)
        console.log(SITE)
       // var regex = new RegExp("");
       console.log(validateUrl(req.params.site))
        if(typeof fileEntryId == "number" && validateUrl(req.params.site)) {
          console.log("AM in")
          updateStack(fileEntryId)

        }
        
      });
    
  }

  function validateUrl(value) {
    return /([a-z])\w+\\.([a-z])\w+/g.test(value);
  }

  
  module.exports = appRouter;