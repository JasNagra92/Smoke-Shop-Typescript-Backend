#!/bin/bash

# before installing new app during code deploy lifecycle event, stop pm2 server and remove folder
DIR="/home/ec2-user/Smoke-Shop-Typescript-Backend"
if [ -d "$DIR" ]; then
  sudo pm2 delete all
  cd /home/ec2-user
  sudo rm -rf Smoke-Shop-Typescript-Backend
else
  echo "Directory does not exist"
fi
