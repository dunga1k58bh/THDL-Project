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
    url = f"https://www.nguyenkim.com/dien-thoai-di-dong/page-{i}/";
    response = requests.get(url).text
    soup = BeautifulSoup(response, features="lxml")

    container_items = soup.find('div', {'id': 'pagination_contents'})

    
    items = container_items.find_all("div", {"class": "item nk-fgp-items nk-new-layout-product-grid"})

    for item in items:
        object = {}
        info = item.find("div", {"class": "product-title"})

        if (info):
            a = info.find("a", href=True)
            name = a.getText()
            href = a['href']
            object['url'] = f"{href}"
            object['name'] = name

        price = item.find("p", {"class": "final-price"})
        if (price):
            object['price'] = price.getText()

        image = item.find("div", {"class": "product-image"})
        if (image):
            img = image.find("a", href= True)
            object['image'] = img['href']
        objects.append(object)
    return objects

def extractPhones():

    for i in range(1,50):
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

    div_contain = soup.find("div", {"id": "productSpecification_fullContent"})

    table = div_contain.find("table", {"class": "productSpecification_table"})

    rows = table.find_all("tr")
    for row in rows:
        data = row.find_all("td")
        label_html = data[0]
        value_html = data[1]
        label = label_html.getText().replace(',', ' ').replace(';',' ').replace(':', '')
        value = value_html.getText().replace(',', ' ').replace(';',' ').replace(':', '')
        object_phone[label] = value

    yield object_phone


def loadPhones(*args):
        fields = ['name', 'price', 'url', 'image', 'Model', 'M??u s???c',
         'Nh?? s???n xu???t', 'Xu???t x???', 'N??m ra m???t ', 'Th???i gian b???o h??nh', 
         '?????a ??i???m b???o h??nh', 'H??? ??i???u h??nh', 'Chipset', 'RAM', 'B??? nh??? trong', 
         'H??? tr??? th??? nh??? ngo??i', 'C???m ???ng', 'Lo???i m??n h??nh', 'K??ch th?????c m??n h??nh', 
         '????? ph??n gi???i m??n h??nh', 'Camera tr?????c', 'Camera sau', '????n Flash', 'Video', 
         'M???ng 4G', 'Lo???i SIM', 'WIFI', 'Bluetooth', 'GPS', 'USB', 'Jack 3.5mm', 
         'Dung l?????ng Pin', 'M??? kh??a nhanh', 'Thi???t k???', 'Ghi ??m', 'Radio', 
         'Ma??n hi??nh tra??n vi????n', 'Ti???n ??ch kh??c ??TD??', 'K??ch th?????c s???n ph???m' ]
        data = []
        for field in fields:
            if field in args[0].keys():
                data.append(str(args[0].get(field)))
            else:
                data.append("")
        separate = ';'
        line = separate.join(data)
        with open ("data/nk.csv"  , "a") as f:
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