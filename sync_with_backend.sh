#!/bin/bash

BACKEND_FOLDER="../../laravel/example-app/"


# Remove previous assets
echo "Remove old assets..."
rm -fr ${BACKEND_FOLDER}public/static/*

echo "Syncing..."
find ./build -mindepth 1 -maxdepth 1 ! -name "index.html" -exec cp -r {} "${BACKEND_FOLDER}public/" \;

echo "Copy index.html..."
cp build/index.html "${BACKEND_FOLDER}resources/views/frontend.blade.php"

echo "👍 Completed Successfully."
