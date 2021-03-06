var heads               = require('robohydra').heads,
    RoboHydraHead       = require("robohydra").heads.RoboHydraHead,
    RoboHydraHeadStatic = heads.RoboHydraHeadStatic,
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
  upload = {
    'archive': 'http://localhost:8000/api/v1/archives/1/',
    'comment': '',
    'created': '2015-02-04T11:53:35.237Z',
    's3': {
      'bucket': '',
      'prefix': '/upload/2015-02-04-11-53-18/',
      'token_access_key': '',
      'token_expiration': '2015-02-05T11:53:36Z',
      'token_secret_key': '',
      'token_session': '',
      'token_uid': 'lacli'
    },
    'status': 'pending',
    'url': 'http://localhost:8000/api/v1/uploads/1/'
  }

  notifications = {
      "AccountRegistered": {
          "id": 1, 
          "verb": "<a href=\"/account/\">Account</a>: Registered.", 
          "created": "2015-02-13T10:52:46Z", 
          "status": "info",
          "href": "https://www.bigstash.co/account/"
      },
      "ArchiveFrozen": {
          "id": 2,
          "verb": "Archive <a href=\"https://www.bigstash.co/a/17200-NUU9ZW\">17200-NUU9ZW</a>: Archived",
          "created": "2015-02-15T10:37:05Z",
          "status": "success",
          "href": "https://www.bigstash.co/a/17200-NUU9ZW/"
      },
      "ArchiveReadyForDownload": {
          "id": 3,
          "verb": "Archive <a href=\"https://www.bigstash.co/a/17743-23524W\">17743-23524W</a>: Archive is ready to <a href=\"/o/download/1837/CbKNaHV79iP7kZ4NE6U28U/\">download</a>",
          "created": "2015-02-18T11:22:48Z",
          "status": "info",
          "href": "https://www.bigstash.co/a/17743-23524W/"
      }
  }

  function meta(n){
    return {
      limit: 20,
      next: null,
      offset: 0,
      previous: null,
      count: n
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
        path: apiPrefix + '/archives/1/upload/',
        content: upload
      }), 
      new RoboHydraHead({
        path: apiPrefix + '/archives/',
        handler: function(req, res, next) {
          if (req.method == 'POST'){
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
          } else if (req.method == 'GET'){
            var content = {
              meta: meta(2),
              results: [
                archives.Photos,
                archives.Other
              ]
            }
            res.status = '200';
            res.write(JSON.stringify(content));
            res.end(); 
          }
        }
      }),
      new RoboHydraHead({
        path: apiPrefix + '/uploads/1/',
        handler: function(req, res, next) {
          if (req.method == 'GET'){
            res.status = '200';
            res.write(JSON.stringify(upload));
            res.end();
          } else if (req.method == 'PATCH'){
            content = JSON.parse(req.rawBody)
            modules.assert.ok("status" in content)
            var patched_upload = upload;
            patched_upload.status = content.status;
            res.write(JSON.stringify(patched_upload));
            res.end();
          } else if (req.method == 'DELETE'){
            res.status = '204';
            res.end();
          }
        }
      }),
      new RoboHydraHeadStatic({
          path: apiPrefix + '/notifications/1/',
          content: notifications.AccountRegistered
      }),
      new RoboHydraHeadStatic({
          path: apiPrefix + '/notifications/2/',
          content: notifications.ArchiveFrozen
      }),
      new RoboHydraHead({
          path: apiPrefix + '/notifications',
          handler: function (req, res, next) {
              page = req.queryParams.page
              if (page != null) {
                  var content = {
                      meta: meta(30),
                      results: [
                        notifications.AccountRegistered,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered
                      ]
                  }
              }
              else {
                  var content = {
                      meta: meta(30),
                      results: [
                        notifications.AccountRegistered,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered,
                        notifications.AccountRegistered,
                        notifications.ArchiveFrozen,
                        notifications.ArchiveReadyForDownload,
                        notifications.ArchiveFrozen,
                        notifications.AccountRegistered
                      ]
                  }
              }
              if (req.method == 'GET') {
                  res.status = '200';
                  res.write(JSON.stringify(content));
                  res.end();
              }
          }
      })
    ]
  }
}
