import glob
import os
import json

try:
    with open('version.json', 'r') as f:
        version = json.load(f)
        ver=int(version["version"].replace("V",""))
        ver=ver+1
        version["version"]="V"+str(ver)
        folder__=""
except: 
    with open('./pages/tools/myTools/version.json', 'r') as f:
        version = json.load(f)
        ver=int(version["version"].replace("V",""))
        ver=ver+1
        version["version"]="V"+str(ver)
        folder__='./pages/tools/myTools/'
    




folder_path = './'
html_files = glob.glob(os.path.join(folder_path,'**', '*.html'), recursive=True)
old_folder=""

html='<!--           '+version["version"]+'        -->\n'
html+="""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToolBox</title>
    <style>
        /* Basic styling for layout */
        #container {
            display: flex;
        }
        #leftPanel {
            width: 200px;
            border-right: 1px solid #ccc;
             
        }
        #rightPanel {
            flex: 1;
        }
        iframe {
            width: 100%;
            height: 100vh; /* Adjust height as needed */
            border: none;
        }
   

        a {
            text-decoration: none; /* Removes the underline */
            /*padding-top: 20px; */   /* Adds top padding */
            /*padding-bottom: 10px;*/ /* Adds bottom padding */
            margin-bottom: 10px;
           color: blue;          /* Set default link color */
        }

        a:visited {
            color: blue; /* Ensure visited link color remains the same */
        }

        a:hover, a:active {
            color: darkblue; /* Change color on hover and when active */
        }


        
        .h4_ {
            button-padding:10px;
        }
        #show_hide_ID {
            padding: 10px 30px;
            background-color: #28a745; /* Green color */
            color: white;
            border: none;
            border-radius: 50px; /* Fully rounded edges */
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s ease; /* Smooth transition for all properties */
        }
    </style>
</head>
<body>
    <h2> ToolBox</h2>
    <p>Local tools using local nodes and personal codes </p>
    <br>
    <button onclick="show_hide()" id ="show_hide_ID">Hide Menu <<<</button>
    <div id="container">
        <!-- Left panel for links -->
        <div id="leftPanel">

"""
a_tag=""" <span> &#8226; </span> <a href="link" target="contentFrame" onclick="document.getElementById('idopetool').href = 'link';">Page_Name</a>"""

for file in html_files:
    txt=file.split('\\')[-1].replace('.html','')
    folder=file.split('\\')[1]
    if txt != "tools":
        if old_folder != folder:
            old_folder=folder
            folder_=folder[0].upper() + folder[1:].lower()
            html+='<h4 class="h4_">'+folder_+"</h4>"

            
        else :
            html+='<br>'+"\n"
        txt=txt.replace('_',' ')

        html+= a_tag.replace('link',file).replace('Page_Name',txt).replace('\\',"/")
        
html+="""
            <!-- Add more links as needed -->
        </div>

        <!-- Right panel for displaying the content -->
        <div id="rightPanel">
            <iframe name="contentFrame" src="" frameborder="0"></iframe>
            <div>
                
                <a href="#" id="idopetool">link</a>
                <br>
            </div>
        </div>
    </div>
                    <script> 
                     function show_hide() {
                var leftPanel = document.getElementById('leftPanel');
                if (leftPanel.style.display === 'none') {
                    leftPanel.style.display = 'block';			
                                    document.getElementById("show_hide_ID").innerText = "Hide Menu <<<";
                } else {
                    leftPanel.style.display = 'none';
                                    document.getElementById("show_hide_ID").innerText = "Show Menu >>>";
                }
                    }
                    </script>
</body>
</html>
"""
print(folder__)
print(version)
with open(folder__+"tools.html", "w") as f:
    f.write(html)
with open(folder__+'version.json', 'w') as file:
    json.dump(version, file)

print("tools.html AND version.json are updated")
