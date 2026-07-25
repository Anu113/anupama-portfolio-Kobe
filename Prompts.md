# Prompts

Copy-paste prompts for changing this site with Claude Code. Written in plain
English on purpose — you shouldn't need to know what a component is.

**How to use:** open Terminal, `cd` into this folder, type `claude`, then paste a
prompt. Keep `npm run dev` running in a second Terminal tab so you see changes
live at localhost:4321.

**One habit worth having:** before a batch of changes, run `git add -A && git
commit -m "before changes"`. Then if something goes wrong you can say *"undo
everything since my last commit."*

---

## Look and feel

> Make the sand section warmer and less yellow.

> The headlines are too big on my laptop. Bring them down about 15% but keep them
> overflowing the edge on wide screens.

> Tighten the space between sections by roughly a third.

> The dark background feels too brown. Make it cooler, closer to neutral black,
> but keep it warm enough not to look like pure #000.

> Add a fifth palette — deep green background with cream type — and use it for
> the contact section instead of bone.

> Try the whole site with Satoshi instead of General Sans and show me both so I
> can compare.

> The italic serif word feels too decorative next to the sans. Suggest three
> alternative pairings and apply the one you think is strongest.

---

## Copy and content

> Change my email everywhere to <new address>.

> Rewrite the hero headline. I want it to say something about building teams that
> disagree well. Give me five options before you change anything.

> The interactive headline currently says "The best design teams are ___". I want
> the sentence to be about <idea>. Rewrite it and update the suggested words.

> Read my hero paragraph and tell me honestly whether a recruiter would know I
> managed people within the first five seconds.

---

## Case studies

> Create a new case study called "<name>". Use the leadership-first structure
> from CLAUDE.md and leave clearly marked gaps where you need facts from me.

> Here are my rough notes on the Okta project. Turn them into a case study using
> the leadership-first structure. Ask me for anything you need rather than
> inventing numbers.
> <paste notes>

> Read my <name> case study and tell me where it reads like an individual
> contributor rather than a design leader. Be specific and blunt.

> This case study is too long. Cut it by a third without losing any of the
> leadership or impact material.

> I can't publish the real Okta screens because of NDA. Suggest four ways to show
> this work without exposing confidential UI, and tell me which you'd pick.

> Add a "what I'd do differently" section to every case study that's missing one.

---

## Structure

> Build the /approach page. It should answer what a hiring manager for a Design
> Manager role actually asks: how I run critique, how I grew six designers, how I
> handle disagreement with PM and engineering, how I decide what the team doesn't
> do. Leave gaps where you need my material.

> Build the /work index page listing all case studies, matching the home page
> style.

> Build the /profile page. I want my career break framed as deliberate, not
> apologised for.

> Add my LinkedIn recommendations as a section. Here they are: <paste>

> Move the interactive section above the work rail and tell me whether you think
> that's better or worse for a recruiter skimming.

> The home page links to /work and /approach but those pages don't exist yet.
> Create simple working versions so nothing 404s.

---

## Images

> I've put my real images in public/images. Replace the placeholders on the home
> page with them and write proper alt text for each.

> These images are huge and slowing the site down. Compress them and convert to
> WebP without visible quality loss.

> The mosaic images are cropping badly on mobile. Fix it.

---

## Checking your work

> Run an accessibility check on the whole site. Check colour contrast, keyboard
> navigation, focus states, and screen reader labels. Fix what you find and tell
> me what you changed.

> Look at every page on mobile at 375px wide and fix anything broken or
> overflowing.

> Check every link on the site actually goes somewhere. List the broken ones.

> Find any leftover placeholder text or "REPLACE ME" images anywhere in the site.

> Run npm run build and fix any errors.

> Read the whole site as if you were a recruiter hiring a Design Manager at a
> SaaS company. You have 90 seconds. Tell me what you learned, what you missed,
> and what you'd have wanted to see sooner.

---

## Publishing

> Set this up as a git repo and walk me through putting it on GitHub. Assume I've
> never used git.

> Walk me through deploying to Vercel step by step.

> Add a password gate to my case studies so only people with the password can
> read them.

> Add proper social sharing previews so the site looks right when shared on
> LinkedIn.

---

## When something breaks

> Something's broken and I don't know what I did. Show me what changed since my
> last commit.

> Undo everything since my last commit.

> The site won't start. Here's the error: <paste>

> The nav stopped changing colour when I scroll. Find out why.

---

## Prompts worth avoiding

- **"Make it look better."** No direction, so you'll get a random change. Say
  what bothers you — too cramped, too loud, headline competing with the image.
- **"Redesign the home page."** Too large to review. Go section by section.
- **"Add some animations."** Motion is deliberately restrained here. Name the
  specific element and what you want it to do.
- **"Fix everything."** Ask for a list of problems first, then pick.

One more: if Claude Code suggests installing an animation library or a component
library, ask why before agreeing. `CLAUDE.md` deliberately rules those out —
they'd make this repo much harder for you to edit yourself.