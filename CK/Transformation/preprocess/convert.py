import json
import os
import csv
path = "../../res"
src_path = os.path.join(path, "sendo.json")
f = open(src_path)
data = json.load(f)
headers = ["name", "model", "price", "image", "short_description","rating_avg","response_time","product_total","quantity", "rating_count"]
products = []
for product in data:
    temp = {}
    temp["name"] = product["name"]
    temp["price"] = product["price"]
    temp["image"] = product["image"]
    temp["short_description"] = product["short_description"]
    temp["rating_avg"] =  product["rating_avg"] if "rating_avg" in product else None
    temp["rating_count"] = product["rating_count"] if "rating_count" in product else None
    temp["response_time"] = product["response_time"] if "response_time" in product else None
    temp["product_total"] = product["product_total"] if "product_total" in product else None
    temp["quantity"] = product["quantity"]
    if "description_info" in product and "attributes" in product["description_info"]:
        for info in product["description_info"]["attributes"]:
            key = info["name"]
            if key not in headers:
                headers.append(key)
            temp[key] = info["value"]
    products.append(temp)

with open('sendo.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(products)
