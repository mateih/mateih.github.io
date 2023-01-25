import os

allfiles = []

for root, dirs, files in os.walk(".", topdown=False):
    for name in files:
        p = os.path.join(root, name)
        if not (p.endswith('.html') or p.endswith('.css') or p.endswith('.js')):
            continue

        with open(p) as f:
            contents = f.read()
        allfiles.append((p, contents))

mdcontents = ''
for path, contents in allfiles:
    if path.endswith('.html'):
        lang = 'html'
        comment = '<!-- ' + path + ' -->'
    elif path.endswith('.css'):
        lang = 'css'
        comment = '/* ' + path + ' */'
    elif path.endswith('.js'):
        lang = 'js'
        comment = '// ' + path
    else:
        raise Exception("invalid state")
    mdcontents += f'''
```{lang}
{comment}

{contents}
```
'''

with open("out.md", "w") as f:
    f.write(mdcontents)
