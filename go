#!/bin/bash

build-api() {
    pip install -r api/requirements.txt
}

test-api() {
    build-api &&
    pip install coveralls &&
    coverage run --omit=tests/*,*site-packages/*  -m unittest discover -p "*tests.py"
}

package-api() {
    cd api &&
    docker build .
}

test-web() {
    cd web &&
    yarn &&
    yarn add -D coveralls &&
    jest --coverage --collectCoverageFrom=!client/tests/**
}

package-web() {
    cd web &&
    docker build \
        --build-arg GMAPS_API_KEY=${GMAPS_JS_API_KEY} \
        --build-arg CCAPI_URL=https://mdowds.com/commutercalculator/api .
}

if [[ $1 =~ ^(build-api|test-api|package-api|test-web|package-web)$ ]]; then
  COMMAND=$1
  shift
  ${COMMAND} "$@"
else
  exit 1
fi
