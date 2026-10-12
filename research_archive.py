import json, re, urllib.request
from pathlib import Path
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor

base = 'https://www.southviewpreservation.com'
project = Path(__file__).parent
def get(url):
    return urllib.request.urlopen(url, timeout=40).read().decode()
class Reader(HTMLParser):
    def __init__(self,raw):
        super().__init__(); self.parts=[]; self.active=[]; self.feed(raw)
    def handle_starttag(self,tag,attrs):
        if tag in ['p','h1','a']: self.active.append([tag,dict(attrs),[]])
    def handle_data(self,data):
        for p in self.active: p[2].append(data)
    def handle_endtag(self,tag):
        if self.active and self.active[-1][0]==tag:
            p=self.active.pop(); self.parts.append((p[0],p[1],''.join(p[2]).strip()))
directory=Reader(get(base+'/historyintheneighborhood'))
links = list(dict.fromkeys(attrs['href'] for tag,attrs,text in directory.parts if tag=='a' and text=='Learn More' and 'href' in attrs))
def profile(link):
    url = link if link.startswith('https:') else base+link
    raw = get(url)
    soup = Reader(raw)
    name = next(text for tag,attrs,text in soup.parts if tag=='h1')
    paragraphs = [text.replace('\u200b','').strip() for tag,attrs,text in soup.parts if tag=='p']
    paragraphs = list(dict.fromkeys(p for p in paragraphs if p))
    urls = re.findall(r'https://static.wixstatic.com/media/[^\s"<>]+',raw)
    originals = list(dict.fromkeys(u.split('/v1/')[0].split('\\')[0] for u in urls))
    slug = url.rsplit('/',1)[-1]
    img = originals[-1]
    (project/'dist/assets'/f'{slug}.jpg').write_bytes(urllib.request.urlopen(img,timeout=30).read())
    return dict(name=name,slug=slug,url=url,paragraphs=paragraphs,image=img)
with ThreadPoolExecutor(max_workers=6) as pool:
    profiles=list(pool.map(profile,links))
(project/'archive-research.json').write_text(json.dumps(profiles,indent=2,ensure_ascii=False),encoding='utf-8')
for p in profiles:
    print(p['name'],p['slug'])
    print('\n'.join(p['paragraphs']))
    print()
