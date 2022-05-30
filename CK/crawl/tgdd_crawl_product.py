import requests
from bs4 import BeautifulSoup
import json
import re
import csv

product_urls = []
with open("tgdd_urls.txt", 'r') as fp:
    for line in fp:
        x = line[:-1]
        product_urls.append(x)

headers = ["name", "color", "model", "price"]
products = []
for i in range(0, len(product_urls)):
    print("{}/{}: Crawling url: {}".format(i+1,len(product_urls), product_urls[i]))
    res = requests.get(product_urls[i], headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
    })
    product = {}
    soup = BeautifulSoup(res.content, features="lxml")
    name = soup.find("h1")
    product["name"] = name.string if name is not None else ""
    color = soup.find(name ="a", attrs={"data-color": True, "class": "box03__item item act"})
    product["color"] = color.string if color is not None else ""
    model = soup.find(name= "a", attrs={"data-index": True, "class": "box03__item item act"}, href=re.compile("^/dtdd"))
    product["model"] = model.string if model is not None else ""
    price = soup.find(name= "p", attrs={"class": "box-price-present"})
    product["price"] = price.string if price is not None else ""
    parameters = soup.select_one("ul.parameter__list").find_all("li") if soup.select_one("ul.parameter__list") is not None else []
    for parameter in parameters:
        key = parameter.select_one("p.lileft").string
        if key not in headers:
            headers.append(key)
        value = ""
        for string in parameter.select_one("div.liright").stripped_strings:
            value = value + string + ", "
        value = value[:-2]
        product[key] = value
    products.append(product)

with open('tgdd.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(products)