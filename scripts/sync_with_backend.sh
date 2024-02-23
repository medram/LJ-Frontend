#!/bin/bash

BACKEND_FOLDER="../../laravel/example-app/"


# Remove previous assets
echo "Remove old assets..."
rm -fr ${BACKEND_FOLDER}public/assets/*

echo "Syncing..."
find ./dist -mindepth 1 -maxdepth 1 ! -name "index.html" -exec cp -r {} "${BACKEND_FOLDER}public/" \;

echo "Copy index.html..."
cp dist/index.html "${BACKEND_FOLDER}resources/views/frontend.blade.php"

echo "Enabling HEAD_CODE..."
sed -i 's/<!-- {!! $HEAD_CODE !!} -->/{!! $HEAD_CODE !!}/' "${BACKEND_FOLDER}resources/views/frontend.blade.php"

echo "👍 Completed Successfully."
