import numpy as np
from PIL import Image
from scipy import ndimage as nd
BOX=(40,330,1080,1660); BG=253.0
FW=220; FH=round(FW*(BOX[3]-BOX[1])/(BOX[2]-BOX[0]))
STEAM=np.array([246,240,230],np.float32)
def ss(x,a,b):
    t=np.clip((x-a)/(b-a),0,1); return t*t*(3-2*t)
frames=list(range(0,176,2))
cells=[]
for n in frames:
    a=np.asarray(Image.open(f'raw/f{n+1:03d}.png').convert('RGB').crop(BOX)).astype(np.float32)
    d=np.abs(a-BG).max(2)
    d[:, 1045-BOX[0]:][d[:, 1045-BOX[0]:]<70]=0
    core=nd.binary_closing(d>48,iterations=2)
    lab,k=nd.label(core)
    if k:
        sizes=nd.sum(core,lab,range(1,k+1)); core=lab==(np.argmax(sizes)+1)
    # fill only small holes (eyes, glasses, fur gaps), never the gap between his legs
    holes=nd.binary_fill_holes(core)&~core
    hl,hk=nd.label(holes)
    if hk:
        hs=nd.sum(holes,hl,range(1,hk+1)); small=np.isin(hl,np.where(hs<2500)[0]+1)
        core=core|small
    core=nd.binary_erosion(core,iterations=1)
    soft=ss(d,22,70)
    # the ground shadow: pale pixels in the bottom band go
    soft[-90:,:]*=0.0
    # pale ground shadow joined to his feet: pale pixels in the bottom band are not him
    lum=a.mean(2)
    band=np.zeros_like(core); band[-150:,:]=True
    core=core&~(band&(lum>185))
    alpha=np.maximum(core.astype(np.float32), soft)
    a3=alpha[...,None]
    un=np.clip((a-(1-a3)*BG)/np.maximum(a3,0.01),0,255)
    # off-body pale bits (steam) get a cream colour instead of an un-mix, so they read as steam on dark too
    rgb=np.where(core[...,None],un,STEAM*(1-soft[...,None]*0)+0*un)
    im=Image.fromarray(np.dstack([rgb,alpha*255]).astype(np.uint8),'RGBA').resize((FW,FH),Image.LANCZOS)
    cells.append(im)
cols=11; rows=(len(cells)+cols-1)//cols
PAD=4; CW,CH=FW+2*PAD,FH+2*PAD
sheet=Image.new('RGBA',(CW*cols,CH*rows),(0,0,0,0))
for i,c in enumerate(cells): sheet.paste(c,((i%cols)*CW+PAD,(i//cols)*CH+PAD))
sheet.save('moss-push.webp',quality=86,method=6)
print(len(cells),cols,rows,CW,CH,sheet.size)
for bg,name in [((27,26,25,255),'prev-dark.png'),((252,252,252,255),'prev-light.png')]:
    prev=Image.new('RGBA',(CW*6,CH),bg)
    for i,n in enumerate([0,30,40,50,60,80]): prev.alpha_composite(cells[n],(i*CW+PAD,PAD))
    prev.save(name)
