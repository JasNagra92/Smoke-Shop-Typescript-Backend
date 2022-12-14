#!/bin/bash

# program to check if package is installed on launched instance
function program_is_installed {
  local return_=1

  type $1 >/dev/null 2>&1 || { local return_=0; }
  echo "$return_"
}

# install code deploy agent on instance
sudo yum update -y
sudo yum install ruby -y
sudo yum install wget -y
cd /home/ec2-user/
wget https://aws-codedeploy-us-west-2.s3.us-west-2.amazonaws.com/latest/install
sudo chmod +x ./install
sudo ./install auto

# check if NodeJs is installed. If not, install it
if [ $(program_is_installed node) == 0 ]; then
  curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
  sudo yum install -y nodejs
fi

# check if Git is installed. If not, install it
if [ $(program_is_installed git) == 0 ]; then
  sudo yum install git -y
fi

# check if Docker is installed. If not, install it
if [ $(program_is_installed docker) == 0 ]; then
  sudo amazon-linux-extras install docker -y
  sudo systemctl start docker
  sudo docker run --name chatapp-redis -p 6379:6379 --restart always --detach redis
fi

# check if pm2 is installed. If not, install it
if [ $(program_is_installed pm2) == 0 ]; then
  npm install -g pm2
fi

cd /home/ec2-user

git clone -b dev https://github.com/JasNagra92/Smoke-Shop-Typescript-Backend.git
cd Smoke-Shop-Typescript-Backend
npm install
aws s3 sync s3://smoke-server-env-files/develop .
unzip env-file.zip
cp .env.develop .env
npm run build
npm run start
