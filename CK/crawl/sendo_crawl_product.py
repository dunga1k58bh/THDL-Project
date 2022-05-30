import requests
from bs4 import BeautifulSoup
import json
import re
import csv

product_urls = []
with open("sendo_urls.txt", 'r') as fp:
    for line in fp:
        x = line[:-1]
        product_urls.append(x)


products = []
for i in range(0,len(product_urls)):
    print("{}/{}: Crawling url: {}".format(i+1,len(product_urls), product_urls[i]))
    res = requests.get(product_urls[i], headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
    }).json()
    products.append(res["data"])

with open('sendo.json', 'w') as f:
    json.dump(products, f)