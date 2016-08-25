"use strict";
const express = require('express');
const request = require("request-promise");

class HSLService {
  constructor(url) {
    this.baseUrl = url;
  }
  getStops() {
    const options = {
      method: "GET",
      uri: this.baseUrl,
    }
    return request(options);
  }
  getStop(id) {
    const options = {
      method: "GET",
      uri: this.baseUrl + "&request=stop&code="+id+"&epsg_out=4326&epsg_in=4326&format=json&dep_limit=10"
    }
    return request(options);
  }
}
module.exports = new HSLService(process.env.HSL_API_BASEURL);
