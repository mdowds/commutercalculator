# Commuter Calculator

[![Build Status](https://travis-ci.org/mdowds/commutercalculator.svg?branch=master)](https://travis-ci.org/mdowds/commutercalculator)

A website to show commute times and costs to get into central London. Enter a zone 1 destination and optional minimum / maximum travel time and it'll show you the travel times, season ticket cost and average house prices for stations in outer London.

The front end is a React app that presents the destinations to select from and presents the results for a destination on a map. It fetches the data from the related [Commuter Calculator API](https://github.com/mdowds/commutercalculator-api). It also calls the [Nearby House Prices API](https://github.com/mdowds/nearby-house-prices-api) to get the house price data.
