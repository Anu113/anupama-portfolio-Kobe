# Her look-around clip (Higgsfield → Seedance)

From "Turn Images into Interactive Heroes": one still in, a short clip of
the character looking around out, then a frame scrubber. Her current clip
can't do this: it's a performance (down, blink, look up, turn away, wink,
look left, down), and measured frame by frame her head turns left and up
but never right. The site's scrubber was never the problem; the clip was.

## The image to upload

`public/images/hero-idle.webp` is too small. Use frame 0 of her source
clip at full size, on its white ground:

```bash
ffmpeg -i ~/Downloads/Character_animation_instructions_1080p_20260929165344.mp4 -vf "select='eq(n\,0)'" -vsync vfr ~/Desktop/anupama-start.png
```

## Settings

Seedance, 9:16 portrait, 1080p, 5 seconds (8 if offered: more frames,
finer tracking). Same framing as the upload, so the site's crop still fits.

## Prompt

Use the uploaded image as the exact reference. Preserve the girl's
watercolour illustration style, her face, hair, red jumper, cream
trousers, socks, the laptop, cup, table, chair, books, the plain white
background, proportions, colours and lighting exactly. Keep the camera
completely locked with no zoom, pan, rotation, cropping or scene changes.

Animate only her head, eyes and hair. Do not create, render or introduce
any cursor, pointer, dot, insect, sparkle, text, hand, shadow, particle
or any other new visual element.

She follows something moving slowly around her across a full range of
attention. Her eyes move first and her head follows with a slight delay;
her hair swings gently with her head. She looks smoothly to the far
left, then lower-left, then upper-left, returns through the centre, then
far right, then lower-right, then upper-right, and settles back exactly
into the original pose. Keep one steady, even speed throughout, with no
pauses and no overshoot.

Keep her body, shoulders, arms, hands, the laptop, table, cup and its
steam completely still. No typing, no breathing, no blinking, no talking,
no change of expression; her eyes stay open the whole time. Avoid face
distortion, stretching, spinning or exaggerated rotation. The first and
last frames must be identical so the animation works for frame-by-frame
scrubbing.

### Why it differs from the guide's cat prompt

- **No pauses, no overshoot.** The guide asks for "tiny pauses" and
  "slight overshoot" for a natural feel; in a scrubbed clip a pause is a
  run of identical frames (she sticks) and an overshoot is a look past
  where the cursor is (she twitches back). The page adds its own easing.
- **No blinking, mouth still.** A blink in the clip lands wherever the
  cursor happens to be; that was half of what read as broken.
- **Steam still.** Anything moving on its own makes scrubbing look like
  playback.

## Then

```bash
python3 experiments/hero-gaze/look/build.py ~/Downloads/<her new clip>.mp4
```

Open `experiments/hero-gaze/look.html`. Check that the right half
actually came out: the script prints the head's range, and both sides of
`look` in `map.json` should reach about -1 and +1.

## What actually worked (2026-11-20, Google Flow)

The one-clip "look all around" prompt above was ignored by Flow's Omni
1.2 Flash: eyes stayed right, two blinks, ~7px of head turn
(`upload/flow-look-around.mp4`). What worked is the two-picture method:

1. Image mode, Nano Banana 2.1 (0 credits), her still attached, prompt:
   "Make a minimal local edit of the attached image, not a new drawing.
   Change only her head: her face and nose now point toward the left side
   of the image, toward the coffee cup, and her eyes look left at the cup.
   Every other pixel stays identical…" → `upload/look-left.jpg`; the same
   with "right … toward the stack of books" → `upload/look-right.jpg`.
   A looser prompt redrew the whole picture (different framing, laptop).
2. Video, Frames mode, start = left, end = right, 9:16, 720p, 8s, x1
   (24 credits), prompt: "Watercolour illustration, camera completely
   locked. The girl slowly and smoothly turns her head from looking left
   to looking right, at one steady, even speed…" →
   `upload/flow-left-to-right.mp4`. The turn takes the first ~4s, then
   she holds right; build.py trims the hold.
3. It still blinks three times, one right as she faces front. build.py
   marks those frames (`shut` in map.json) and the page never rests on
   them, only passes through while turning; the cursor is mapped to her
   17 distinct poses by rank, so there's no dead zone around the blink.

Next time, with credits: ask for the same turn over 4s, and say "eyes
open the whole time" first in the prompt; an open-eyed front-facing frame
is the one thing this clip lacks.
