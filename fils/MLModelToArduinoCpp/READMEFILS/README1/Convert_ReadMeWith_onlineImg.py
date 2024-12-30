"""
Why this tool:
The markDown file does not integrate images such plot image...
The readme.md doesn't support base64 encoding
Solution: make markdown file with image online
This tool convert README.md to a new readme with online image link

How to use it:
Write you markdown in notebook
Convert it to Markown: File > export > Mardown
Unzip file you must find a md file + png
Put all files in a ceparate folder such README1 , README2...
Put this python file inside
Escute.
take the readmeOut.md file,
The images will be stored in imgs folder
You must push the change in bouz1.github.io
to see the image in README.md
"""

import glob
import os 
import shutil

readmeFile = "README.md"
newreadmeFile = "README2.md"

with open(readmeFile) as f :
    readmetxt = f.read()




# Create the new folder "imgs" if it doesn't exist
os.makedirs("imgs", exist_ok=True)

# Get all .png files in the current directory
png_files = glob.glob("*.png")

#current folder
current_folder_path = os.getcwd()

# Move each .png file to the "imgs" folder
for path in png_files:
    newpath= os.path.join("imgs", path)
    newabspath = "bouz1.github.io"+current_folder_path.split("bouz1.github.io")[1]+newpath
    newabspath ='https://'+newabspath.replace("\\","/")
    shutil.move(path, newpath)
    readmetxt.replace(path, newabspath)
    print( newabspath) 
with open(newreadmeFile, "w") as f:
    f.write(readmetxt)
print(newreadmeFile, "modified")

    
