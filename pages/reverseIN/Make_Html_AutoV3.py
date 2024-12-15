import glob
import os
import json


with open('version.json', 'r') as f:
	version = json.load(f)
	ver=int(version["version"].replace("V",""))
	ver=ver+1
	version["version"]="V"+str(ver)

    




folder_path = './'
html_files = glob.glob(os.path.join(folder_path,'**', '*.html'), recursive=True)
old_folder=""


from bs4 import BeautifulSoup

# Load the HTML file
with open('./30Mhz/30mhz.html', 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')


html_files.remove ('.\\reversein.html')

text=""
for html in html_files:
    with open(html, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
    
    print(html)
    h3_text = soup.find('h2')
    img_href = soup.find('img')

    print(h3_text)
    print(img_href)

    text+="\n<a href='"+html+"' > "+str(h3_text) +"</a> \n<br>"
    #text+= html.split('\\')[1]+"\\"+str(img_href)
    text+=str(img_href).replace('imgs/','imgs/'+html.split('\\')[1]+'/')
print("="*10)
print(text)


print(version)
with open("reversein.html", "w") as f:
    f.write(text)
with open('version.json', 'w') as file:
    json.dump(version, file)

print("reverin.html AND version.json are updated")

