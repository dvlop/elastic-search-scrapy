#!/usr/bin/env bash

# Wait for the Elasticsearch container to be ready before starting Kibana.
echo "Stalling 30 secs for ELK"
sleep 30

cd crawler
scrapy crawl sample-spider