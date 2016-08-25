'use strict'

const DigiTransitService = require('../services/DigiTransitService')
const polyline = require('polyline')


module.exports.findOne = (req, res) => {
    DigiTransitService
        .getStopRoute(req.params.coordinates)
        .then(route => {
            //Replace polyline formatted waypoint list with a array of waypoints in the json file
            for (var i = 0; i < route.data.plan.itineraries.length; i++) {
                for (var j = 0; j < route.data.plan.itineraries[i].legs.length; j++) {
                    var waypoints = [];
                    var line = polyline.decode(route.data.plan.itineraries[i].legs[j].legGeometry.points);
                    for (var g = 0; g < line.length; g++) {
                        var s = line[g][0] + ", " + line[g][1]
                        waypoints.push(s);
                    }
                    route.data.plan.itineraries[i].legs[j].legGeometry.points = waypoints;
                }
            }
            res.status(200).send(route);
        })
        // .catch(err => {
        //   res.status(500).send({
        //     location: "Stop findAll .catch other",
        //     message: "Getting all Stops caused an internal server error.",
        //     error: err,
        //   });
        // });
};

module.exports.findFullRoute = (req, res) => {
    DigiTransitService.getCoordinatesByAddress(req.params.addresses.split("+")[0]).then(kakka => {
      var origin = JSON.parse(kakka).features[0].geometry.coordinates;
      DigiTransitService.getCoordinatesByAddress(req.params.addresses.split("+")[1]).then(kakka => {
        var destination = JSON.parse(kakka).features[0].geometry.coordinates;
        DigiTransitService
            .getFullRoute(origin, destination)
            .then(route => {
                //Replace polyline formatted waypoint list with a array of waypoints in the json file
                for (var i = 0; i < route.data.plan.itineraries.length; i++) {
                    for (var j = 0; j < route.data.plan.itineraries[i].legs.length; j++) {
                        var waypoints = [];
                        var line = polyline.decode(route.data.plan.itineraries[i].legs[j].legGeometry.points);
                        for (var g = 0; g < line.length; g++) {
                            var s = line[g][0] + ", " + line[g][1]
                            waypoints.push(s);
                        }
                        route.data.plan.itineraries[i].legs[j].legGeometry.points = waypoints;
                    }
                }
                res.status(200).send(route);
            })
      })
    });
};

module.exports.findAddress = (req, res) => {
    DigiTransitService
        .getAddress(req.params.coordinates)
        .then(address => {
            res.status(200).send(address);
        })
};
