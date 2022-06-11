import csv
import bonobo
import requests
from bonobo.config import use_context_processor
from bonobo.config import use
import time
from bs4 import BeautifulSoup

def get_phone(page):
    return f'https://cellphones.com.vn/lapi/LoadMoreProductCate/index/?page={page}&id=3&order=view_count2&dir=desc&fearture=flashsale_samsung'

def extractPhones():
    for i in range(1, 50):
        yield from requests.get(get_phone(i)).json()

def basicInfo(*args):
    if (args[0]['final_price']):
        price = args[0]['final_price']
    else :
        price = args[0]['price']
    object_phone = {}
    object_phone['name'] = args[0]['name']
    object_phone['price'] = price
    object_phone['url'] = args[0]['url']

    url = args[0]['url']
    response = requests.get(url).text
    soup = BeautifulSoup(response)
    div_contain = soup.find("div", {"class": "block-technical-info"})
    table = div_contain.find("table", {"id": "tskt"})
    table
    rows = table.find_all("tr")
    for row in rows:
        data = row.find_all("th")
        label = data[0].getText().replace(',', ' ').replace(';',' ')
        value = data[1].getText().replace(',', ' ').replace(';',' ')
        object_phone[label] = value

    yield object_phone


def loadPhones(*args):
        keys = []
        for key, value in args[0].items():
            keys.append(str(key))

        separate = '; '
        line = separate.join(keys)
        print(line)


def get_graph(**options):
    graph = bonobo.Graph()
    graph >> extractPhones >> basicInfo >> loadPhones
    return graph


def get_services(use_cache=False):
    return {}


if __name__ == '__main__':
    parser = bonobo.get_argument_parser()
    with bonobo.parse_args(parser) as options:
        bonobo.run(get_graph(**options), services=get_services(**options))