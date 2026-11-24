#!/usr/bin/env python3
"""Build experiments/hero-gaze/rig.html from rig-template.html with the
picture inlined, so the mock opens straight from Finder.

base-hi.webp is frame 112 of her source clip (frame 56 of the 96: eyes
on you), cropped like the sprite but kept at the clip's own 1040 x 1456,
through scripts/hero-sprite.py's matte. Regenerate it with:

  ffmpeg -i <her clip> -vf "select='eq(n\\,112)'" -vsync vfr src112.png
  then hero-sprite.py's frame() with W, H = 1040, 1456
"""
import base64, os
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
t = open(os.path.join(root, 'rig-template.html')).read()
b = base64.b64encode(open(os.path.join(here, 'base-hi.webp'), 'rb').read()).decode()
open(os.path.join(root, 'rig.html'), 'w').write(t.replace('__BASE__', f'"data:image/webp;base64,{b}"'))
print('rig.html written')
