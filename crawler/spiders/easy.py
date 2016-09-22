import datetime
import urlparse
import socket

from scrapy.loader.processors import MapCompose, Join
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from scrapy.loader import ItemLoader
from items import PropertiesItem
import re
import lxml.etree
import lxml.html

class EasySpider(CrawlSpider):
    name = 'sample-spider'
    allowed_domains = ["www.google.com"]

    # Start on the first index page
    # Change this
    start_urls = ['www.google.com']

    # Rules for horizontal and vertical crawling
    rules = [Rule(LinkExtractor(), callback='parse_item')]

    def parse_item(self, response):

        root = lxml.html.fromstring(response.body)

				# optionally remove tags that are not usually rendered in browsers
        # javascript, HTML/HEAD, comments, add the tag names you dont want at the end
        lxml.etree.strip_elements(root, lxml.etree.Comment, "script", "head")

         # complete text
        raw = lxml.html.tostring(root, method="text", encoding=unicode)
        nospaces = re.sub(r'\s+', ' ', raw)
        nostyles = re.sub(r'\W*?\{.*?\}', ' ', nospaces)
        content = re.sub(r' \W\w+?', ' ', nostyles)

        self.logger.info('Parse function called on %s', response.url)

        # Create the loader using the response
        l = ItemLoader(item=PropertiesItem(), response=response)

        #content: page payload
        l.add_value('content', content)

        # Housekeeping fields
        l.add_value('url', response.url)
        l.add_value('project', self.settings.get('BOT_NAME'))
        l.add_value('spider', self.name)
        l.add_value('server', socket.gethostname())
        l.add_value('date', datetime.datetime.now())

        return l.load_item()
