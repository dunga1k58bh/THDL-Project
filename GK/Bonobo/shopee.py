from ast import keyword
import bonobo
import requests as req
import os
from pathlib import Path
import json

LIMIT = 100  #limit item per page
PAGE = 5 #limit of (So it will be LIMIT*PAGE item
items_list = []
item_info = []

def extract():
    """Placeholder, change, rename, remove... """
    page = 1
    keyword = "dien thoai"
    while (page < PAGE):
        ls_items = []
        search_api = f"https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword={keyword}&limit={LIMIT}&newest={page}&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2"
        response = req.get(search_api)
        items = response.json()
        items = items['items']


        for item in items:
            yield item
        page+=1




def getItem(*args):
    """Placeholder, change, rename, remove... """
    item_id = args[0]["item_basic"]["itemid"]
    shop_id = args[0]["item_basic"]["shopid"]
    api = f"https://shopee.vn/api/v4/item/get?itemid={item_id}&shopid={shop_id}"

    if (item_id and shop_id) :
        item_obj = req.get(api).json()["data"]

        cats = item_obj["categories"]
        is_phone = False
        for cat in cats:
            if cat["catid"] == 100073:
                is_phone = True
                break
        if  is_phone == True:
            yield item_obj


def load(*args):
    global items_list
    """Placeholder, change, rename, remove... """
    with open("shopee.json", "a") as f:
        json.dump(args, f)


def get_graph(**options):
    """
    This function builds the graph that needs to be executed.

    :return: bonobo.Graph

    """
    graph = bonobo.Graph()
    (
        graph
        >> extract
        >> getItem
        >> load
    )
    return graph


def get_services(**options):
    """
    This function builds the services dictionary, which is a simple dict of names-to-implementation used by bonobo
    for runtime injection.

    It will be used on top of the defaults provided by bonobo (fs, http, ...). You can override those defaults, or just
    let the framework define them. You can also define your own services and naming is up to you.

    :return: dict
    """
    return {}


# The __main__ block actually execute the graph.
if __name__ == '__main__':
    parser = bonobo.get_argument_parser()
    with bonobo.parse_args(parser) as options:
        bonobo.run(
            get_graph(**options),
            services=get_services(**options)
        )