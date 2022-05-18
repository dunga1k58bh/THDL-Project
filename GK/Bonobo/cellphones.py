import csv
import bonobo
import requests
from bonobo.config import use_context_processor
from bonobo.config import use
import time

def get_phone(page):
    return f'https://cellphones.com.vn/lapi/LoadMoreProductCate/index/?page={page}&id=3&order=view_count2&dir=desc&fearture=flashsale_samsung'

def extract_reviews():
    yield {'name': 'name', 'storage': 'storage', 'display_size': 'display_size',
     'price': 'price', 'final_price': 'price', 'stock_available': 'stock_available', 'url': 'url'  }
    for i in range(1, 10):
        yield from requests.get(get_phone(i)).json()

def transform_reviews(*args):
    """Placeholder, change, rename, remove... """
    if (args[0]['final_price']):
        price = args[0]['final_price']
    else :
        price = args[0]['price']
    yield [
        args[0]['name'],
        args[0]['storage'],
        args[0]['display_size'],
        price,
        args[0]['stock_available'],
        args[0]['url']
    ]

def load_reviews(*args):
    """Placeholder, change, rename, remove... """
    with open("cellphones.csv" , "a") as f:
        csv_out = csv.writer(f)
        csv_out.writerow(list(args[0]))

def get_graph(**options):
    graph = bonobo.Graph()
    graph.add_chain(
        extract_reviews,
        transform_reviews,
        load_reviews,
    )
    return graph


def get_services(use_cache=False):
    return {}


if __name__ == '__main__':
    parser = bonobo.get_argument_parser()
    with bonobo.parse_args(parser) as options:
        bonobo.run(get_graph(**options), services=get_services(**options))