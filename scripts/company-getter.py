from requests import get
from bs4 import BeautifulSoup
import sys

company_name = sys.argv[1]

headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0'}
response = get("https://www.glassdoor.co.in/api-web/employer/find.htm?autocomplete=true&maxEmployersForAutocomplete=10&term="+company_name+"&gdToken=pUXNbjG1ZugeeU4PE9sOMA:ytHMXWD769EjjQNpiflKGcrakwJL2PtAoxg-4tLpwTlyNOlNmHTeej9-m1zeQdMXCKM0RPGdZkVJfECaLmzQcA:qSSuAemtOLVIsansaN9iN1GOYEL_Xab4JDrdhDwrp98", headers=headers)
html_soup = BeautifulSoup(response.text, 'html.parser')
print(html_soup)