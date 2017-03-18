var teams = [
    { "_id" : 1, "name" : "VL", "team" : { "eleven" : [ 574, 382, 384, 168, 255, 570, 14, 398, 90, 489, 643 ], "subs" : [ 407, 95, 637, 629 ], "squad" : [ 37, 33, 55, 31, 536, 642 ] }, "totalPoints" : 4467 },
    { "_id" : 2, "name" : "BP", "team" : { "eleven" : [ 356, 250, 128, 385, 561, 82, 503, 262, 488, 143, 500 ], "subs" : [ 2, 264, 132, 468 ], "squad" : [ 11, 191, 190, 160, 48, 575 ] }, "totalPoints" : 5430 },
    { "_id" : 3, "name" : "DB", "team" : { "eleven" : [ 54, 433, 248, 504, 358, 235, 203, 228, 441, 485, 355 ], "subs" : [ 340, 278, 184, 70 ], "squad" : [ 153, 3, 346, 464, 157, 579 ] }, "totalPoints" : 4609 },
    { "_id" : 4, "name" : "CFM", "team" : { "eleven" : [ 147, 344, 226, 431, 254, 12, 205, 135, 233, 97, 336 ], "subs" : [ 100, 638, 25, 628 ], "squad" : [ 6, 245, 446, 92, 145, 140 ] }, "totalPoints" : 4816 },
    { "_id" : 5, "name" : "BT", "team" : { "eleven" : [ 430, 301, 199, 562, 32, 555, 310, 391, 368, 208, 403 ], "subs" : [ 294, 644, 449, 293 ], "squad" : [ 56, 359, 10, 416, 462, 121 ] }, "totalPoints" : 5191 },
    { "_id" : 6, "name" : "SAW", "team" : { "eleven" : [ 73, 386, 125, 411, 558, 220, 394, 329, 230, 272, 425 ], "subs" : [ 274, 21, 17, 571 ], "squad" : [ 152, 297, 383, 268, 304, 544 ] }, "totalPoints" : 5044 },
    { "_id" : 7, "name" : "EWE", "team" : { "eleven" : [ 380, 77, 321, 527, 453, 438, 209, 155, 256, 640, 239 ], "subs" : [ 29, 213, 134, 68 ], "squad" : [ 341, 298, 105, 559, 87, 164 ] }, "totalPoints" : 4698 },
    { "_id" : 8, "name" : "ZB", "team" : { "eleven" : [ 242, 296, 436, 244, 78, 13, 212, 202, 400, 231, 567 ], "subs" : [ 451, 126, 478, 52 ], "squad" : [ 193, 58, 460, 439, 402, 405 ] }, "totalPoints" : 4556 }]

var Model = require('../model/MongooseModels');

Model.TeamModel.remove({}, function(err, data){
    if(err) {
        console.log('error',err);
    }
    Model.TeamModel.collection.insert(teams, function(err, data){
        if(err) {
            console.log('error',err);
         }
    });
});
