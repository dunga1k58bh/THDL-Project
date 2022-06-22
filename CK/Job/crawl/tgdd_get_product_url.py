import requests
from bs4 import BeautifulSoup
import json
import re

MAX_PAGE = 6
api_url = "https://www.thegioididong.com/Category/FilterProductBox?c=42&o=9&pi={page}"

product_url_list = []

count = 0
for i in range(0,MAX_PAGE):
    res = requests.get(api_url.format(page = i), headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
    }).json()
    soup = BeautifulSoup("<html>" + res["listproducts"] + "</html>", features="lxml")
    urls = soup.find_all(name= "a", href=re.compile("^/dtdd"))

    for url in urls:
        res = requests.get("https://www.thegioididong.com" + url["href"], headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
        })
        soup = BeautifulSoup(res.content, features="lxml")
        list_model = []
        models = soup.find_all(name="a", attrs={"data-index": True}, href=re.compile("^/dtdd"))
        for model in models:
            list_model.append("https://www.thegioididong.com" + model["href"])
        if len(list_model) == 0:
            list_model.append("https://www.thegioididong.com" + url["href"])
        for model_url in list_model:
            res = requests.get(model_url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
            })
            soup = BeautifulSoup(res.content, features="lxml")
            list_product_colors = soup.find_all(name="a", attrs={"data-code" : True, "data-color": True})
            for product in list_product_colors:
                count = count + 1
                print("Getting product url {}\n".format(count))
                product_url_list.append("https://www.thegioididong.com" + product["href"])
            if len(list_product_colors) == 0:
                count = count + 1
                print("Getting product url {}\n".format(count))
                product_url_list.append(model_url)

print("Total product:{}".format(len(product_url_list)))

with open('tgdd_urls.txt', 'w+') as fp:
    for product_url in product_url_list:
        fp.write("{}\n".format(product_url))
    print('Done')

        