#!/bin/bash

build-api() {
    pip install -r requirements.txt
}

test-api() {
    build-api &&
    pip install coveralls &&
    coverage run --omit=tests/*,*site-packages/*  -m unittest discover -p "*tests.py"
}

test-web() {
    cd web &&
    yarn &&
    yarn add -D coveralls &&
    jest --coverage --collectCoverageFrom=!client/tests/**
}

if [[ $1 =~ ^(build-api|test-api|test-web)$ ]]; then
  COMMAND=$1
  shift
  ${COMMAND} "$@"
else
  exit 1
fi
