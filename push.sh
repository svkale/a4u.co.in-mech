#!/bin/bash
git add .
git status
git commit -m "v1"
git push origin master
git status
cd ../a4u.co.in-n
rm -r *
cp -r ../a4u.co.in-mech/* ./
find ./* -type f -exec sed -i -e 's/https:\/\/lib.ameonlinesolutions.com/https:\/\/n.lib.ameonlinesolutions.com/' {} \;

git add .
git status
git commit -m "v1"
git push origin master
git status
