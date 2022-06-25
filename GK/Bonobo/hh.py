import csv
from http.client import responses
import bonobo
from pkg_resources import yield_lines
import requests
from bonobo.config import use_context_processor
from bonobo.config import use
import time
from bs4 import BeautifulSoup
import json

def getPage(i):

    objects = []
    url = f"https://hoanghamobile.com/dien-thoai-di-dong?p={i}";
    response = requests.get(url).text
    soup = BeautifulSoup(response, features="lxml")

    container_items = soup.find('div', {'class': 'list-product'})
    
    items = container_items.find_all("div", {"class": "item"})

    for item in items:
        object = {}
        info = item.find("div", {"class": "info"})

        if (info):
            a = info.find("a", href=True)
            name = a.getText()
            href = a['href']
            price = info.find("strong").getText()
            object['url'] = f"https://hoanghamobile.com{href}"
            object['name'] = name
            object['price'] = price

        image = item.find("div", {"class": "img"})
        if (image):
            img = item.find("img", src= True)
            object['image'] = img['src']
        objects.append(object)
    return objects

def extractPhones():

    for i in range(2,50):
        objects = getPage(i)
        for object in objects:
            yield object

def basicInfo(*args):

    url = args[0]['url']

    response = requests.get(url).text
    soup = BeautifulSoup(response, "html.parser")
    # print(response)

    object_phone = {}

    object_phone['name'] = args[0]['name']
    object_phone['price'] = args[0]['price']
    object_phone['url'] = args[0]['url']
    object_phone['image'] = args[0]['image']

    div_contain = soup.find("div", {"class": "product-specs"})
    rows = div_contain.find_all("li")
    for row in rows:
        label_html = row.find("strong")
        value_html = row.find("span")
        label = label_html.getText().replace(',', ' ').replace(';',' ').replace(':', '')
        value = value_html.getText().replace(',', ' ').replace(';',' ').replace(':', '')
        object_phone[label] = value

    yield object_phone


def loadPhones(*args):
        fields = ["name", "price", "image", "url", "Công nghệ màn hình", "Độ phân giải",
                    "Màn hình rộng", "Độ phân giải", "Hệ điều hành", "Chip xử lý (CPU)", "Bộ nhớ trong (ROM)",
                    "RAM", "Mạng di động", "Số khe sim", "Dung lượng pin" ]
        data = []
        for field in fields:
            if field in args[0].keys():
                data.append(str(args[0].get(field)))
            else:
                data.append("")
        separate = ';'
        line = separate.join(data)
        with open ("hhm.csv"  , "a") as f:
            f.write(line+"\n")


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