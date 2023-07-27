#!/bin/bash

BACKEND_FOLDER="../../laravel/example-app/"

echo "Syncing..."
find ./build -mindepth 1 -maxdepth 1 ! -name "index.html" -exec cp -vr {} "${BACKEND_FOLDER}public/" \;



cp -v build/index.html "${BACKEND_FOLDER}resources/views/frontend.blade.php"

echo "👍 Completed"
