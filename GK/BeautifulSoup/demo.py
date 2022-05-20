import requests
page = requests.get("https://dataquestio.github.io/web-scraping-pages/simple.html")

from bs4 import BeautifulSoup
soup = BeautifulSoup(page.content, 'html.parser')

print(soup.prettify())
print("----------------")
print(list(soup.children))
print("----------------")
print([type(item) for item in list(soup.children)])
print("----------------")
print(soup.find_all('p'))