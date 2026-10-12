import urllib.request, re, json
from pathlib import Path
from html import unescape

root = Path(__file__).parent / 'dist' / 'assets'
root.mkdir(parents=True, exist_ok=True)
people = {'alonzo':'alonzoherndon','robert':'robertgrant','bowen':'johnwebowen','jean':'jeanchildsyoung','carolyn':'carolyndyancey'}
credits = {}
for name, slug in people.items():
    html = urllib.request.urlopen('https://www.southviewpreservation.com/'+slug).read().decode()
    urls = re.findall(r'https://static.wixstatic.com/media/[^\s"<>]+', html)
    originals = list(dict.fromkeys(unescape(u).split('/v1/')[0].split('\\')[0] for u in urls))
    print(name, originals[:8])
    credits[name] = originals
    portrait = originals[-1]
    (root / (name + '.jpg')).write_bytes(urllib.request.urlopen(portrait).read())
(Path(__file__).parent/'asset-candidates.json').write_text(json.dumps(credits,indent=2))
