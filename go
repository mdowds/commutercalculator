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
    docker build -t ${IMAGE_BASE_NAME}/commutercalculator-api:0.${TRAVIS_BUILD_NUMBER} \
.
}

push-api-image() {
    registry_login &&
    docker push ${IMAGE_BASE_NAME}/commutercalculator-api:0.${TRAVIS_BUILD_NUMBER}
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
        -t ${IMAGE_BASE_NAME}/commutercalculator-web:0.${TRAVIS_BUILD_NUMBER}-nginx \
        --build-arg GMAPS_API_KEY=${GMAPS_JS_API_KEY} \
        --build-arg CCAPI_URL=https://mdowds.com/commutercalculator/api .
}

push-web-image() {
    registry_login &&
    docker push ${IMAGE_BASE_NAME}/commutercalculator-web:0.${TRAVIS_BUILD_NUMBER}-nginx
}

registry_login(){
    echo "$REGISTRY_USER" | docker login -u "$REGISTRY_TOKEN" --password-stdin registry.gitlab.com
}

if [[ $1 =~ ^(build-api|test-api|package-api|push-api-image|test-web|package-web|push-web-image)$ ]]; then
  COMMAND=$1
  shift
  ${COMMAND} "$@"
else
  exit 1
fi
