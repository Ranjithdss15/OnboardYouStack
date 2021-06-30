var express = require('express');
var router = express.Router();
var path = require('path');
const https = require('https');
const requestObj = require('request');
const exec = require('child_process').exec;
const fs = require('fs');



async function getRepoDetails(callback,options){
  requestObj(options, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    console.log("StatusCode: "+res.statusCode)
    return callback(body);
    });

}
async function createrepo(callback,options){
  requestObj(options, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    console.log("StatusCode: "+res.statusCode)
    return callback(body);
    });

}

async function readWriteAsync(reponame,replaceVar){
  fs.readFile('bitbucketfiles/Jenkinsfile.groovy', 'utf-8',function(err, data,){
    if (err) throw err;
    // var newValue = data.replace(/^\./gim, 'myString');
    var newValue = data.replace(/ProJNamE/g, replaceVar);
    console.log(replaceVar)
    fs.writeFile(`${reponame}/Jenkinsfile.groovy`, newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('filelistAsync complete');
    });
  });
  fs.readFile('bitbucketfiles/JenkinsfileRelease.groovy', 'utf-8',function(err, data,){
    if (err) throw err;
    // var newValue = data.replace(/^\./gim, 'myString');
    var newValue = data.replace(/ProJNamE/g, replaceVar);
    console.log(replaceVar)
    fs.writeFile(`${reponame}/JenkinsfileRelease.groovy`, newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('filelistAsync complete');
    });
  });
}

async function cpRepo(reponame,replaceVar){
  exec(`cp -r bitbucketfiles ${reponame}`,
  function(err,stdout,stderr){
    console.log("copying files")
    console.log("stdout:"+stdout);
    readWriteAsync(reponame,replaceVar);
    pushRepo(reponame);
  })
}

async function delDir(reponame){
  exec(`rm -rf ${reponame}`,
  function(err,stdout,stderr){
    console.log("Deleted Repo")
    console.log("stdout:"+stdout);
  })
}

async function pushRepo(reponame){
  exec(`cd ${reponame} && git init && git add --all && git commit -m "Initial Commit" && git remote add origin https://bitbucket.com/bitbucket/scm/iac/${reponame}.git && git push -u origin master`,
  function(err,stdout,stderr){
    console.log("Pushing Repo")
    console.log("stdout:"+stdout);
    delDir(reponame);
  })
}

async function testFunc(){
  console.log("Inside test Function");
}

router.get('/test/:reponame', function(req, res, next) {
  let reponame = req.params.reponame;
  ;(async () => {
    await cpRepo(reponame);
    res.send("Writed file")
      })()

  });
router.get('/', function(req, res, next) {
  res.render('bitbuckethome');
  });
router.post('/create3', function(req, res, next) {
  let projName = req.body.selectName;
  res.send(projName);
  })
router.post('/create2', function(req, res, next) {
  let reponame = req.body.repoNameR;
  let projname = req.body.projNameR;
  if(reponame){
    let JSONbody = {
    "name": reponame,
    "scmId": "git",
    "forkable": true
    }
    ;(async () => {
    const options = {
      url: 'https://bitbucket.com/bitbucket/rest/api/1.0/projects/IAC/repos',
      headers: {
        'Content-Type': 'application/json'
      },
      'method':'POST',
        'auth': {
          'bearer': ''
        },
        'body':JSON.stringify(JSONbody)
    };
    createrepo(async function(response){
      response = JSON.parse(response)
      // response = JSON.stringify(response)
      if(!response.errors){
        let viewResponse = "The Repo with the name "+response.slug+" has been created in the project IAC";
        let viewLink = "Link to your Repo: "+response.links.clone[0].href;
        console.log("reponameInsideFunc:"+reponame);
        await cpRepo(reponame,projname);
        res.render('bitbucket', {response:viewResponse, link:viewLink});
      }
      else{

        res.render('bitbucket',{response:response.errors[0].message})
        console.log("reponameInsideFunc:"+reponame);
      }
      // res.end();
    },options);
    console.log("reponame:"+reponame);
    // 
      })()
  }
  else{
    res.render('bitbucket',{response:'The Repository Name entered is Invalid, Please Enter Valid Name'})
  }
  
  });
router.get('/get/:reponame', function(req, res, next) {
   let reponame = req.params.reponame;

    ;(async () => {
    const options = {
      url: 'https://bitbucket.com/bitbucket/rest/api/1.0/projects/IAC/repos/'+reponame,
        'auth': {
          'bearer': ''
        }

    };

  getRepoDetails(function(response){
  response = JSON.parse(response)
  // res.send(JSON.stringify(response.slug));
  if(response.slug){
    let viewResponse = "The Repo "+response.slug+" is present in the project IAC";
    viewLink = "Link to your Repo: "+response.links.clone[0].href;
    res.render('bitbucket', { response:viewResponse,link:viewLink});
  }
  else{
    let viewResponse = "No Repo with the name "+reponame+" is found in the project IAC";
    res.render('bitbucket', { response:viewResponse});
  }

  // res.end();
},options);
      })()
      });

router.get('/create/:reponame', function(req, res, next) {
  let reponame = req.params.reponame;
  let JSONbody = {
    "name": reponame,
    "scmId": "git",
    "forkable": true
}
    ;(async () => {
    const options = {
      url: 'https://bitbucket.com/bitbucket/rest/api/1.0/projects/IAC/repos',
      headers: {
        'Content-Type': 'application/json'
      },
      'method':'POST',
        'auth': {
          'bearer': ''
        },
        'body':JSON.stringify(JSONbody)
    };
    createrepo(async function(response){
      response = JSON.parse(response)
      // response = JSON.stringify(response)
      if(!response.errors){
        let viewResponse = "The Repo with the name "+response.slug+" has been created in the project IAC";
        let viewLink = "Link to your Repo: "+response.links.clone[0].href;
        console.log("reponameInsideFunc:"+reponame);
        await cpRepo(reponame,'testText');
        res.render('bitbucket', {response:viewResponse, link:viewLink});
      }
      else{

        res.render('bitbucket',{response:response.errors[0].message})
        console.log("reponameInsideFunc:"+reponame);
      }
      // res.end();
    },options);
    console.log("reponame:"+reponame);
    // 
      })()
      });

module.exports = router;