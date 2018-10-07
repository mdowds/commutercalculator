# Commuter Calculator

[![Build Status](https://travis-ci.org/mdowds/commutercalculator.svg?branch=master)](https://travis-ci.org/mdowds/commutercalculator)
[![Coverage Status](https://coveralls.io/repos/github/mdowds/commutercalculator/badge.svg?branch=master)](https://coveralls.io/github/mdowds/commutercalculator?branch=master)

A website to show commute times and costs to get into central London. Enter a zone 1 destination and optional minimum / maximum travel time and it'll show you the travel times, season ticket cost and average house prices for stations in outer London.

The project is split into two parts - an API and a web app.

The API reads from a database populated by the separate [commutercalculator-update](https://github.com/mdowds/commutercalculator-update) application and exposes two endpoints: 
* `/destinations` to provide a list of Zone 1 destinations
* `/journeys/to/{STATION_ID}` to provide the journey times and costs for a selected destination

The front end is a React app that presents the destinations to select from and presents the results for a destination on a map. It also calls the [Nearby House Prices API](https://github.com/mdowds/nearby-house-prices-api) to get the house price data.
