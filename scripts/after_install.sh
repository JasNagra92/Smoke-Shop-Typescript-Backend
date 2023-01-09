#!/bin/bash

cd /home/ec2-user/Smoke-Shop-Typescript-Backend
sudo rm -rf env-file.zip
sudo rm -rf .env
sudo rm .env.develop
aws s3 sync s3://smoke-server-env-files/develop .
unzip env-file.zip
sudo cp .env.develop .env
sudo npm install
