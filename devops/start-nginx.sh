#!/usr/bin/env bash
set -euo pipefail

jq --version
cat config.json

export EXISTING_VARS="'$(cat config.json | jq -r 'keys | map("$" + .) | join(",")')'"

for file in /usr/share/nginx/html/*.js;
do
    envsubst $EXISTING_VARS < /usr/share/nginx/html/$(basename $file) > /tmp/$(basename $file)
    mv /tmp/$(basename $file) /usr/share/nginx/html/$(basename $file)
done

nginx -g 'daemon off;'
