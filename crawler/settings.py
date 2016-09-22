# Scrapy settings
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#
BOT_NAME = 'crawler'

SPIDER_MODULES = ['spiders']
NEWSPIDER_MODULE = 'spiders'

# Crawl responsibly by identifying yourself (and your website) on
# the user-agent
#USER_AGENT = 'properties (+http://www.yourdomain.com)'

ITEM_PIPELINES = {
    'pipelines.tidyup.TidyUp': 100,
    'pipelines.es.EsWriter': 800
}

EXTENSIONS = {'latencies.Latencies': 500, }
LATENCIES_INTERVAL = 5
ES_PIPELINE_URL = 'http://elk:9200/site-content/pages'
LOG_LEVEL = "INFO"

# Disable S3
AWS_ACCESS_KEY_ID = ""
AWS_SECRET_ACCESS_KEY = ""