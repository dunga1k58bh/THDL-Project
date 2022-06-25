import requests


data = requests.get('https://hoanghamobile.com/dien-thoai-di-dong/oppo-reno5-5g-chinh-hang')

print(data.text)