import math
from requests import get
from bs4 import BeautifulSoup
import sys


reviews = []

def getReviews(url):
    response = get(url, headers=headers)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    for el in html_soup.findAll("span", {"class" : "d-inline-block mb-sm"}):
      print( el.get_text(), flush=True)
      reviews.append(el.get_text())


headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0'}

company_name = sys.argv[1]
company_id= sys.argv[2]

base_url = "https://www.glassdoor.co.in/Interview/" + str(company_name) + "-Interview-Questions-E" + str(company_id) + ".htm"
response = get(base_url, headers=headers)
html_soup = BeautifulSoup(response.text, 'html.parser')
no_interviews=html_soup.find("div", {"class" : "paginationFooter"})
potential_num = no_interviews.get_text().split(" ")[-2]
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
        print("Error with " + url)