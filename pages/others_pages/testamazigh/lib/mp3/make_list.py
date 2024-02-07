import glob
import numpy as np

# absolute path to search all text files inside a specific folder
path = r'*.mp3'
files = glob.glob(path)
print(files)

from mutagen.mp3 import MP3


name=[]
time=[]
for f in files:
    try: 
        audio = MP3(f) # 10 min 
        print(f,audio.info.length)
        name.append(f)
        time.append(audio.info.length)
    except:
        print(f,'nok')
        pass

string= '''
function names() {
return ''' +str(name) + ''';
}

function times() {
return ''' +str(time) + ''';
}

function tot_times() {
return ''' +str(np.sum(time))+''';
}

'''


with open ('names.js','w') as f:
    f.write(string)
    f.close()
input('close?')
