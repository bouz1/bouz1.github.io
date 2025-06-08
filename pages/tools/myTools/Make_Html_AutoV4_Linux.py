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

html='<!--           '+version["version"]+'        -->\n'
html+="""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToolBox</title>
<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        .header {
            margin-bottom: 25px;
        }

        h2 {
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 8px;
            font-weight: 600;
        }

        p {
            color: #7f8c8d;
            font-size: 16px;
            margin-bottom: 0px;
        }

        #show_hide_ID {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        #show_hide_ID:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        #container {
            display: flex;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            min-height: 80vh;
        }

        #leftPanel {
            width: 320px;
            background-color: #f8f9fa;
            padding: 20px;
            overflow-y: auto;
            max-height: 80vh;
            border-right: 1px solid #eaeaea;
        }

        #rightPanel {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        iframe {
            width: 100%;
            height: calc(80vh - 40px);
            border: none;
            background-color: white;
        }

        .h4_ {
            font-size: 18px;
            color: #3498db;
            margin-top: 20px;
            margin-bottom: 12px;
            font-weight: 600;
            padding-bottom: 5px;
            border-bottom: 2px solid #ecf0f1;
        }

        a {
            text-decoration: none;
            color: #34495e;
            /*display: block;*/
            margin-left: 10px;
           /*margin-top: 100px;*/
            position: relative;
            font-size: 14px;
            transition: all 0.2s ease;
            border-radius: 4px;
        }

        a:hover, a:active {
            color: #3498db;
            background-color: #ecf0f1;
            padding-left: 28px;
            
        }

        span {
            color: #3498db;
            position: relative;
            margin-left: 10px;
            position: relative;
            font-size: 14px;
            transition: all 0.2s ease;
            border-radius: 4px;
        }

        #idopetool {
            display: inline-block;
            margin-top: 10px;
            margin-left: 10px;
            padding: 8px 15px;
            background-color: #ecf0f1;
            border-radius: 4px;
            font-size: 14px;
        }

        #idopetool:hover {
            background-color: #e0e6e8;
        }

        /* Customized scrollbar */
        #leftPanel::-webkit-scrollbar {
            width: 8px;
        }

        #leftPanel::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        #leftPanel::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
        }

        #leftPanel::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
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
    if file == './tools.html': 
        continue
    txt=file.split('/')[-1].replace('.html','')
    folder=file.split('/')[1]
    if txt != "tools":
        if old_folder != folder:
            old_folder=folder
            folder_=folder[0].upper() + folder[1:].lower()
            html+='<h4 class="h4_">'+folder_+"</h4>"

            
        else :
            html+='<br>'+"\n"
        txt=txt.replace('_',' ')

        html+= a_tag.replace('link',file).replace('Page_Name',txt)#.replace('\\',"/")
        
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

print(version)
with open("tools.html", "w") as f:
    f.write(html)
with open('version.json', 'w') as file:
    json.dump(version, file)

print("tools.html AND version.json are updated")
