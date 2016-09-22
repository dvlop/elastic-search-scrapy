from scrapy.item import Item, Field


class PropertiesItem(Item):
    # Primary fields
    content = Field()

    # Housekeeping fields
    url = Field()
    project = Field()
    spider = Field()
    server = Field()
    date = Field()
