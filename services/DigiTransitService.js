"use strict";
const express = require('express');
const request = require("request-promise");

class DigiTransitService {
    getStopRoute(coordinates) {
        var originAndDestinationCoordinates = coordinates.split("+");
        const options = {
            method: "POST",
            uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
            headers: {
                "Content-Type": "application/json"
            },
            json: true,
            body: {
                "query": `{
  plan(
    fromPlace: "Kamppi, Helsinki",
    from: {lat: ` + originAndDestinationCoordinates[0] + `, lon: ` + originAndDestinationCoordinates[1] + `},
    toPlace: "Pisa, Espoo",
    to: {lat: ` + originAndDestinationCoordinates[2] + `, lon: ` + originAndDestinationCoordinates[3] + `},
    modes: "WALK",
  ) {
    itineraries{
      walkDistance,
      duration,
      legs {
        mode
        from {
          lat
          lon
          name
          stop {
            code
            name
          }
        },
        to {
          lat
          lon
          name
        },
        agency {
          id
        },
        distance
        legGeometry {
          length
          points
        }
      }
    }
  }
}`
            }
        }
        return request(options)
    }
    getFullRoute(origin, destination) {
        const options = {
            method: "POST",
            uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
            headers: {
                "Content-Type": "application/json"
            },
            json: true,
            body: {
                "query": `{
  plan(
    from: {lat: `+origin[1]+`, lon: `+origin[0]+`},
    to: {lat: `+destination[1]+`, lon: `+destination[0]+`},
    modes: "BUS,TRAM,RAIL,SUBWAY,WALK,FERRY",
    walkReluctance: 2.1,
    walkBoardCost: 600,
    minTransferTime: 240,
    walkSpeed: 1.2,
    numItineraries: 1,
  ) {
    itineraries{
      walkDistance,
      duration,
      legs {
        mode
        startTime
        endTime
        trip {
          id
          serviceId
          tripHeadsign
          shapeId
          pattern {
            name
          }
        }
        route {
          shortName

        }
        from {
          lat
          lon
          name
          stop {
            code
            name
            id
          }
        },
        to {
          lat
          lon
          name
                    stop {
            code
            name
            id
          }
        },
        distance
        legGeometry {
          length
          points
        }
      }
    }
  }
}`
            }
        }
        return request(options)
    }

    getCoordinatesByAddress(address) {
        const options = {
            method: "GET",
            uri: "https://api.digitransit.fi/geocoding/v1/search?text="+address+"&lang=fi&size=1"
        }
        return request(options)
    }

    getAddress(coordinates) {
        var coords = coordinates.split(",");
        const options = {
            method: "GET",
            uri: "https://api.digitransit.fi/geocoding/v1/reverse?point.lat=" + coords[0] + "+&point.lon=" + coords[1] + "&size=1"
        }
        return request(options);
    }
}
module.exports = new DigiTransitService();
