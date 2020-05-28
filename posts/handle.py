import os
import re

files = os.listdir('./')
date_re = re.compile(r'(\d{4}-\d{2}-\d{2}).*')
url_re = re.compile(r'.*\{\{.*[\"\'](.*)[\"\'].*\}\}')
for f in files:
    if not f.startswith('20'):
        continue
    with open(f, "r") as _f:
        text = _f.read()
    match = date_re.match(f)
    if not match:
        print(f"no match with {f}")
        continue
    _cdate = match.group(1)
    text = text.split("\n")
    for i, line in enumerate(text):
        if not "{{" in line: 
            continue
        match = url_re.match(line)
        if not match:
            print("error with", line)
            continue
        parsed = match.group(1)
        parsed = "/"+parsed if not parsed.startswith("/") else parsed
        if parsed.endswith("png") or parsed.endswith("jpg") or parsed.endswith("jpeg"):
            text[i] = "{{{{< image src=\"/blog/{}\" position=\"center\" >}}}}".format(parsed)
        if parsed.endswith("mp4"):
            text[i] = "{{{{< video \"/blog/{}\" >}}}}".format(parsed)



    text.insert(3, f"date: {_cdate}T12:00:00-04:00")
    text.insert(4, f"draft: false")
    with open(f, "w") as _f:
        _f.write("\n".join(text))

