#!/usr/bin/env bash

docker run -v ./data:/data alpine rm -rf /data/db
mkdir ./data/db -p