from flask import Flask, render_template
import tkinter
import subprocess
import re 
import os


app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def index():
    lst = get_names()
    res = get_screen_size()
    return render_template('index.html', img_lst = lst, width=res[0], height=res[1])

# returns a list of tuples. tuples contain the item number and file path for picture. 
def get_names():
    path = 'static/images'
    files = os.listdir(path)

    for i in range(len(files)):
        files[i] = '../static/images/' + files[i]
    
    return files

def get_screen_size():
    # root = tkinter.Tk()
    # width = root.winfo_screenwidth()
    # height = root.winfo_screenheight()

    # return (width,height)

    output = str(subprocess.check_output("fbset").decode())
    match = re.findall(r'\"(.+?)\"',output)
    res = "".join(match).split('x')
    return (res[0],res[1])

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1')
    
