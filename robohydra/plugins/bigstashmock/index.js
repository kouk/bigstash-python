var heads               = require('robohydra').heads,
    RoboHydraHead       = require("robohydra").heads.RoboHydraHead,
    RoboHydraHeadStatic = heads.RoboHydraHeadStatic,
    token               = require('./tokens.js').token,
    apiPrefix           = "/api/v1";


exports.getBodyParts = function(config, modules) {
  archives = {
    'Photos': {
      "status" : "creating",
      "key" : "58-CXSS2Q",
      "size" : 50000,
      "checksum" : null,
      "created" : "2014-06-30T17:01:21.887Z",
      "url" : "http://stage.deepfreeze.io/api/v1/archives/58/",
      "upload" : "http://stage.deepfreeze.io/api/v1/archives/58/upload/",
      "title": "Photos"
    },
    'Other': {
      "status" : "creating",
      "key" : "58-CXSS2Q",
      "size" : 50000,
      "checksum" : null,
      "created" : "2014-06-30T17:01:21.887Z",
      "url" : "http://stage.deepfreeze.io/api/v1/archives/58/",
      "upload" : "http://stage.deepfreeze.io/api/v1/archives/58/upload/",
      "title": "Other"
    }
  }
  test_user = {
    "archives" : {
      "previous" : null,
      "next" : null,
      "count" : 1,
      "results" : [
        {
          "status" : "frozen",
          "key" : "55-45U2PD",
          "size" : 123,
          "checksum" : "3bffca7b1dfc604550df94213727b9bc",
          "created" : "2014-06-30T15:16:00.636Z",
          "url" : "http://stage.deepfreeze.io/api/v1/archives/55/",
          "upload" : "http://stage.deepfreeze.io/api/v1/archives/55/upload/",
          "title" : "some title"
        }
      ]
    },
    "email" : "koukopoulos@gmail.com",
    "displayname" : "Konstantinos Koukopoulos",
    "id" : 8,
    "date_joined" : "2014-06-30T14:55:43.645Z",
    "quota": {
      "size": 1000000000,
      "used": 150123
    },
    "avatar": {
      "avatar22": "http://gravatar.com/avatar/58fc8f2e1ffa8f4b01a86a6c66cb2100?d=mm&s=22",
      "avatar80": "http://gravatar.com/avatar/58fc8f2e1ffa8f4b01a86a6c66cb2100?d=mm",
      "avatar48": "http://gravatar.com/avatar/58fc8f2e1ffa8f4b01a86a6c66cb2100?d=mm&s=48"
    }
  }
  function meta(n){
    return {
      limit: 20,
      next: null,
      offset: 0,
      previous: null,
      total_count: n
    }
  }
  return {
    heads: [
      new RoboHydraHeadStatic({
        path: apiPrefix + '/user/',
        content: test_user
      }),  
      new RoboHydraHeadStatic({
        path: apiPrefix + '/archives/1/',
        content: archives.Other
      }),  
      new RoboHydraHeadStatic({
        path: apiPrefix + '/archives/',
        content: {
          meta: meta(2),
          results: [
            archives.Photos,
            archives.Other
          ]
        }
      }),  
      new RoboHydraHead({
        path: apiPrefix + '/archives/',
        handler: function(req, res, next) {
          modules.assert.equal(req.method, "POST", "Upload resource supports only POST")
          content = JSON.parse(req.rawBody)
          modules.assert.ok("title" in content)
          modules.assert.ok("user_id" in content)
          modules.assert.ok("size" in content)
          res.status = '201';
          date = new Date();
          var archive = {
            "status" : "creating",
            "key" : "58-CXSS2Q",
            "size" : content.size,
            "checksum" : null,
            "created" : date,
            "url" : "http://stage.deepfreeze.io/api/v1/archives/58/",
            "upload" : "http://stage.deepfreeze.io/api/v1/archives/58/upload/",
            "title": content.title 
          }
          res.write(JSON.stringify(archive));
          res.end(); 
        }
      })  
    ]
  }
}
