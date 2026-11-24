import numpy as np, sys, json
from PIL import Image
from scipy import ndimage as nd
S=sys.argv[1]
F=np.array(Image.open(f'{S}/f56.png')).astype(float)
rgb=F[...,:3].copy(); A=F[...,3]
plate=F.copy()
geo={}
IRIS={'L':(291,180.5,10),'R':(352,179.5,9.5)}
for name,(x0,y0,x1,y1) in {'L':(262,160,312,204),'R':(336,160,378,204)}.items():
    sub=rgb[y0:y1,x0:x1]; mx=sub.max(-1); mn=sub.min(-1); sat=(mx-mn)/np.maximum(mx,1)
    cx,cy,r=IRIS[name]; cx-=x0; cy-=y0
    sclera=(mn>165)&(sat<0.25)
    Y,X=np.mgrid[0:y1-y0,0:x1-x0]
    disc=(X-cx)**2+(Y-cy)**2<=(r+0.5)**2
    open_=nd.binary_closing(sclera|disc,iterations=2)
    open_=nd.binary_fill_holes(open_)
    lab2,_=nd.label(open_); open_=lab2==lab2[int(cy),int(cx)]
    print(name,'open px',open_.sum(),'bbox x',X[open_].min()+x0,X[open_].max()+x0,'y',Y[open_].min()+y0,Y[open_].max()+y0)
    # sclera colour + top shade
    sc=sub[sclera&~disc]; base=np.median(sc,0)
    top=np.full(x1-x0,999)
    for x in range(x1-x0):
        ys=np.nonzero(open_[:,x])[0]
        if len(ys): top[x]=ys.min()
    depth=np.clip(Y-top[None,:],0,None)
    shade=1-0.22*np.exp(-depth/3.5)
    fill=base[None,None,:]*shade[...,None]
    w=nd.gaussian_filter(nd.binary_erosion(open_,iterations=1).astype(float),0.8)
    p=plate[y0:y1,x0:x1,:3]; plate[y0:y1,x0:x1,:3]=p*(1-w[...,None])+fill*w[...,None]
    # iris sprite: original colours, filled outside opening by nearest iris-opening pixel
    src=open_&disc
    idx=nd.distance_transform_edt(~src,return_distances=False,return_indices=True)
    col=sub[idx[0],idx[1]]
    pad=3; R=int(np.ceil(r))+pad
    sx0=int(round(cx))-R; sy0=int(round(cy))-R
    spr=np.zeros((2*R,2*R,4))
    for j in range(2*R):
        for i in range(2*R):
            yy_,xx_=sy0+j,sx0+i
            d=np.hypot(xx_+0.5-cx-0.5,yy_+0.5-cy-0.5)
            al=np.clip(r+0.5-d,0,1)
            if 0<=yy_<y1-y0 and 0<=xx_<x1-x0: spr[j,i,:3]=col[yy_,xx_]
            else: spr[j,i,:3]=col[np.clip(yy_,0,y1-y0-1),np.clip(xx_,0,x1-x0-1)]
            spr[j,i,3]=al*255
    Image.fromarray(spr.astype(np.uint8),'RGBA').save(f'{S}/eyes/iris{name}.png')
    m=np.zeros((y1-y0,x1-x0,4)); m[...,3]=nd.gaussian_filter(open_.astype(float),0.6)*255
    Image.fromarray(m.astype(np.uint8),'RGBA').save(f'{S}/eyes/mask{name}.png')
    geo[name]=dict(box=[x0,y0,x1,y1],cx=cx+x0,cy=cy+y0,r=r,sprite=[sx0+x0,sy0+y0,2*R],
                   span=[int(X[open_].min()+x0),int(X[open_].max()+x0),int(Y[open_].min()+y0),int(Y[open_].max()+y0)])
Image.fromarray(np.clip(plate,0,255).astype(np.uint8),'RGBA').save(f'{S}/eyes/plate.png')
json.dump(geo,open(f'{S}/eyes/geo.json','w'),indent=1)
# preview: plate eyes + irises moved
prev=Image.open(f'{S}/eyes/plate.png').copy()
out=Image.new('RGB',(4*480,240),'white')
for k,(dx,dy) in enumerate([(0,0),(-6,0),(6,0),(0,4)]):
    im=prev.copy()
    for name,g in geo.items():
        x0,y0,x1,y1=g['box']; spr=Image.open(f'{S}/eyes/iris{name}.png'); mask=Image.open(f'{S}/eyes/mask{name}.png').split()[3]
        lay=Image.new('RGBA',(x1-x0,y1-y0),(0,0,0,0)); lay.alpha_composite(spr,(int(g['sprite'][0]-x0+dx),int(g['sprite'][1]-y0+dy)))
        al=np.array(lay.split()[3]).astype(float)*np.array(mask).astype(float)/255; lay.putalpha(Image.fromarray(al.astype(np.uint8)))
        im.alpha_composite(lay,(x0,y0))
    bg=Image.new('RGBA',im.size,'white'); bg.alpha_composite(im)
    out.paste(bg.crop((240,140,400,220)).resize((480,240),Image.LANCZOS).convert('RGB'),(k*480,0))
out.save(f'{S}/eyes/preview.png')
