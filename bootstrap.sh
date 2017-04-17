#!/usr/bin/env bash

apt-get update
apt-get install -y python3-pip

cd /vagrant
pip3 install -r requirements.txt
