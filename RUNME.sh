# Running this project for the first time?
# Then run this sh to save your time.
cd betti-sails
sudo npm install
sudo npm install -g bower

cd assets
bower install


# THIS FILE IS VERY IMPORTANT!
# What is it? 	Custom express=jwt policies to work with 
# 				cookies instead of headers (much harder)
# place it in node_modules/express-jwt/lib/index.js
cd ../
mv ./index.js ./node_modules/express-jwt/lib/index.js

