import requests
from bs4 import BeautifulSoup
import json
import re
import csv
import time

product_url_list = []
for i in range(1,46):
    print("Crawling page {}".format(i))
    res = requests.get("https://searchlist-api.sendo.vn/web/categories/1664/products?listing_algo=algo13&page={}&platform=web&size=60&sortType=listing_v2_desc", headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
        "origin": "https://www.sendo.vn",
        "referer": "https://www.sendo.vn/",
    }).json()
    for product in res["data"]:
        product_url_list.append("https://detail-api.sendo.vn/full/" + product["category_path"][:-5])
    time.sleep(1)


print("Total product:{}".format(len(product_url_list)))

with open('sendo_urls.txt', 'w+') as fp:
    for product_url in product_url_list:
        fp.write("{}\n".format(product_url))
    print('Done')