from requests import get
from bs4 import BeautifulSoup
import math
import sys

def getReviews(url):
    response = get(url, headers=headers)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    for el in html_soup.find_all("a", {"class": "reviewLink"}):
      print( el.get_text(), flush=True)
      f.write(el.get_text() + "\n")



headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0'}

company_name = sys.argv[1]
company_id= sys.argv[2]

f = open(company_name + "_reviews.txt", "a")

base_url = "https://www.glassdoor.co.in/Reviews/" + str(company_name) + "-Reviews-E" + str(company_id) + ".htm"
response = get(base_url, headers=headers)
html_soup = BeautifulSoup(response.text, 'html.parser')
no_reviews=html_soup.find("div", {"class" : "paginationFooter"})
potential_num = no_reviews.get_text().split(" ")[-2]
if "," in potential_num:
    potential_num = math.floor(int(potential_num.replace(",","")) /10)
potential_num = potential_num if potential_num <= 10 else 10
urls = []
base_split = base_url.split(".htm")
urls.append(base_url)
for i in range(1,potential_num):
    urls.append(base_split[0] + "_P" + str(i+1) + ".htm")


for url in urls:
    try:
        getReviews(url)
    except:
        print("Error with " + url, flush=True)


f.close()