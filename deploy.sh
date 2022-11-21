#!/bin/bash

# Show status git working tree
git status

# Make sure git working tree is clean before proceed,
# Otherwise it will be commited on the gh-pages branch.
while true; do
    read -p "Make sure your git working tree is clean before proceed [Y/n]" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Get latest version on main
git checkout main
git pull

# Build production version
npm ci
ng build

# Checkout gh-pages
git checkout gh-pages
git pull

# Copy artifacts
rm *.js
rm *.css
cp ./dist/*/* ./
# Set base href
sed -i 's|base href=\"\/\"|base href=\"\/music\/\"|g' ./index.html

git add .
git commit -m 'deploy new version'
git push

sleep 5

# return to main branch
git checkout main