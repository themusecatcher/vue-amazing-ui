#!/usr/bin/env python3
"""Generate a 1200x630 OG/social-preview image for Vue Amazing UI.

Pillow-only, portable (no network, no external assets). Draws a dark-themed
card with the brand's V-fold logo mark in the site's gradient palette:
sky blue #57CCFF -> purple #AF48FF (outer), #B047FF -> #FFD0D0 -> #FFF3E6
(inner), plus the bilingual title "Vue Amazing UI" / "Amazing UI 组件库".
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (19, 20, 26)          # near-black with slight blue
CARD = (30, 32, 42)        # card panel
TEXT = (200, 205, 220)
TITLE = (255, 255, 255)
MUTED = (140, 145, 160)
BLUE = (87, 204, 255)      # #57CCFF
PURPLE = (175, 72, 255)    # #AF48FF
INNER = (176, 71, 255)     # #B047FF
CREAM = (255, 243, 230)    # #FFF3E6

FONT_DIR = "/usr/share/fonts/truetype"
def font(name, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def draw_v_fold(d, cx, cy, s):
    """Draw the brand V-fold mark centered at (cx, cy) with scale s."""
    # outer V (blue -> purple gradient, left-to-right)
    # outline points approximating the angular fold
    pts_outer = [
        (cx - 130*s, cy + 60*s),
        (cx - 74*s,  cy + 60*s),
        (cx + 6*s,   cy - 110*s),
        (cx + 86*s,  cy + 60*s),
        (cx + 130*s, cy + 60*s),
        (cx + 10*s,  cy - 150*s),
        (cx - 8*s,   cy - 150*s),
    ]
    n = len(pts_outer) - 1
    # fill outer as a closed polygon with horizontal gradient approximation:
    # draw many thin vertical slices in two halves
    # left half (x from cx-130 to cx+10)
    for i in range(60):
        t = i / 59.0
        x0 = (cx - 130*s) + (130*s + 10*s) * t
        x1 = x0 + 3.2*s
        # top edge interpolates between the two peaks
        top_left = (cx - 130*s) + (10*s + 130*s) * t
        color = lerp(BLUE, PURPLE, t)
        # bottom at cy+60, top is the fold line (V shape)
        # for x < cx+6, top rises; simple: use two line segments
        top_y = cy - 150*s + 60*s if t < 0.462 else cy - 110*s + 0
        # better: compute piecewise
        if x0 < cx + 6*s:
            y_top = cy - 150*s + ((x0 - (cx - 130*s)) / (140*s)) * (150*s - 110*s) * 0 + 0
            # rising edge from -150 to -110 as x goes -130 -> +6
            frac = (x0 - (cx - 130*s)) / (136*s)
            y_top = cy - 150*s + frac * (40*s)
        else:
            frac = (x0 - (cx + 6*s)) / (130*s)
            y_top = cy - 110*s + frac * (170*s)
        d.polygon([(x0, y_top), (x1, y_top), (x1, cy + 60*s), (x0, cy + 60*s)], fill=color)
    # inner fold (purple -> cream -> pink), smaller and brighter, offset right
    for i in range(46):
        t = i / 45.0
        x0 = (cx - 88*s) + (88*s + 60*s) * t
        x1 = x0 + 3.4*s
        if x0 < cx + 2*s:
            frac = (x0 - (cx - 88*s)) / (90*s)
            y_top = cy - 128*s + frac * (34*s)
            color = lerp(INNER, (255, 208, 208), t)
        else:
            frac = (x0 - (cx + 2*s)) / (60*s)
            y_top = cy - 94*s + frac * (134*s)
            color = lerp((255, 208, 208), CREAM, min(1.0, t * 1.4))
        d.polygon([(x0, y_top), (x1, y_top), (x1, cy + 34*s), (x0, cy + 34*s)], fill=color)

def rounded(d, box, r, fill):
    d.rounded_rectangle(box, radius=r, fill=fill)

def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # subtle top gradient bar (brand)
    for x in range(W):
        t = x / W
        col = lerp(BLUE, PURPLE, t)
        d.line([(x, 0), (x, 8)], fill=col)

    # card panel
    rounded(d, [70, 70, 1130, 560], 28, CARD)

    # V-fold logo mark on the left
    draw_v_fold(d, 330, 315, 1.0)

    # title
    d.text((480, 210), "Vue Amazing", font=font("dejavu/DejaVuSans-Bold.ttf", 76), fill=TITLE)
    d.text((480, 300), "UI", font=font("dejavu/DejaVuSans-Bold.ttf", 76), fill=TITLE)
    # bilingual subtitle
    d.text((480, 412), "Amazing UI 组件库 · Components Library", font=font("wqy/wqy-zenhei.ttc", 34), fill=TEXT)
    # description line
    d.text((480, 470), "Theme-able Vue3 UI components", font=font("dejavu/DejaVuSans.ttf", 26), fill=MUTED)

    # footer
    blue_purple = lerp(BLUE, PURPLE, 0.5)
    d.text((480, 528), "themusecatcher.github.io/vue-amazing-ui", font=font("dejavu/DejaVuSans-Bold.ttf", 26), fill=blue_purple)

    out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "og-image.png")
    img.save(out, "PNG")
    print("wrote", out)

if __name__ == "__main__":
    main()