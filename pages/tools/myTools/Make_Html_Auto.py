import glob
import os

folder_path = './'
html_files = glob.glob(os.path.join(folder_path,'**', '*.html'), recursive=True)
old_folder=""

html=''
print("<h2> Tools</h2>")
html+="<h2> Tools</h2>"+"\n"
print("Local tools using local nodes and personal codes")
html+="Local tools using local nodes and personal codes"+"\n"
for file in html_files:
    txt=file.split('\\')[-1].replace('.html','')
    folder=file.split('\\')[1]
    if txt != "tools":
        if old_folder != folder:
            old_folder=folder
            folder_=folder[0].upper() + folder[1:].lower()
            print("<h4>"+folder_+"</h4>")
            html+="<h4>"+folder_+"</h4>"
        else :
            print('<br>')
            html+='<br>'+"\n"
        print('<a href="'+file+'">'+ txt+"</a>")
        html+='<a href="'+file+'">'+ txt+"</a>"
with open("tools.html", "w") as f:
    f.write(html)
