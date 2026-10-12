import urllib.request
from pathlib import Path
from PIL import Image
assets=Path(__file__).parent/'dist/assets'
images={
 'freedom': 'https://www.archives.gov/files/news/images/general-order-3-juneteenth.png',
 'barbershop': 'https://dlg.usg.edu/thumbnails/geh/athpc/geh_athpc_1190.jpg',
 'selma': 'https://home.nps.gov/common/uploads/stories/images/nri/20160404/articles/D2D85D6B-1DD8-B71B-0B6DA800594AE200/D2D85D6B-1DD8-B71B-0B6DA800594AE200.jpg',
 'education': 'https://tile.loc.gov/storage-services/service/pnp/ppmsca/08700/08778v.jpg'
}
for key,url in images.items():
    dest=assets/(key+'.jpg')
    dest.write_bytes(urllib.request.urlopen(url,timeout=40).read())
    im=Image.open(dest); im.convert('RGB').save(dest,quality=90)
    print(key,im.size)
