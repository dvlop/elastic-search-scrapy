# elastic-search-demo-gsa-replacement
Demo for Elastic to replace GSA. Uses Elastic, Logstash and Scrapy

The following demo consists of several dockerized artifacts and shows how different data sources, like DBs, static sites can be used by Elasticsearch as inputs. In the near future, a sample web services will be added.

The docker-compose files has the following services:

- Postgres database engine with the chinook database initialization scripts
- ELK stack version 2.33
- Node js search website written in Typescript.
- Scrapy simple crawler

Instructions:

- install docker
- git clone https://github.com/marcote/elastic-search-scrapy.git

run :

- docker-compose build
- docker-compose up

Ports

+ postgres
 - port 5432
+ Node search site
 - port 3000
+ Scrapy
 - port 4000
+ ELK
 - port 9200 elastic
 - port 5601 kibana

After all the dockerized artifacts are up, the scrapy crawler will scrap the static website. See crawler to add a site. The content will be stored in the ELK stack in localhost:9200 with the index 'site-content'.

In order to see the results, you can query elasticserch or use the Node JS web site located in localhost:3000
