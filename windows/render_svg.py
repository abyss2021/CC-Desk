"""渲染 cc-desk.svg 图标为 PIL Image（纯 Pillow 实现）."""
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# ── SVG 设计参数 (基于 256x256 viewBox) ──
_SVG_SIZE = 256
_BG_C1 = (30, 30, 45)      # #1E1E2D
_BG_C2 = (42, 42, 61)      # #2A2A3D
_PURPLE_C1 = (200, 140, 255)  # #C88CFF
_PURPLE_C2 = (160, 94, 255)   # #A05EFF
_CYAN_C1 = (100, 200, 255)    # #64C8FF
_CYAN_C2 = (61, 165, 232)     # #3DA5E8

_RECT_MARGIN = 12
_RECT_RADIUS = 40
_PURPLE_CX, _PURPLE_CY, _PURPLE_R = 85, 85, 60
_CYAN_CX, _CYAN_CY, _CYAN_R = 171, 171, 60
_TEXT_CX, _TEXT_CY, _TEXT_SIZE = 128, 148, 90
_CC_CX, _CC_CY, _CC_SIZE = 218, 235, 28

_FONT_PATH = None
_CONSOLAS_PATHS = [
    'C:/Windows/Fonts/consola.ttf',
    'C:/Windows/Fonts/consolab.ttf',
]
_SEGOE_PATHS = [
    'C:/Windows/Fonts/segoeui.ttf',
    'C:/Windows/Fonts/seguisb.ttf',
]


def _interp(a, b, t):
    return tuple(int(va + (vb - va) * t) for va, vb in zip(a, b))


def _scale(v):
    return v


def _draw_bg(draw, size, margin, radius):
    """绘制对角线渐变背景."""
    for i in range(size):
        t = i / (size - 1)
        color = _interp(_BG_C1, _BG_C2, t)
        # 对角线方向: 从左上到右下
        x0 = margin
        y0 = margin + i
        x1 = size - margin
        y1 = margin + i
        if y0 < size - margin:
            draw.line([(x0, min(y0, size - margin)), (x1, min(y0, size - margin))], fill=color, width=1)
    return draw


def _draw_circle(draw, size, cx, cy, r, c1, c2):
    """绘制径向渐变圆（从中心向外）."""
    for i in range(int(r), 0, -1):
        t = 1.0 - (i / r)
        color = _interp(c1, c2, t)
        draw.ellipse([cx - i, cy - i, cx + i, cy + i], fill=color)


def render_svg_to_png(svg_path=None, target_size=256):
    """渲染匹配 cc-desk.svg 设计的图标.

    svg_path 参数被忽略（仅用于保持接口兼容），始终使用内置设计参数。
    """
    size = target_size
    s = size / _SVG_SIZE

    margin = int(_RECT_MARGIN * s)
    radius = int(_RECT_RADIUS * s)

    # ── 画布 ──
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # ── 渐变背景 ──
    for i in range(size):
        t = i / max(size - 1, 1)
        color = _interp(_BG_C1, _BG_C2, t)
        y = i
        draw.line([(0, y), (size, y)], fill=color)

    # ── 紫圆 ──
    cx1, cy1, r1 = int(_PURPLE_CX * s), int(_PURPLE_CY * s), int(_PURPLE_R * s)
    _draw_circle(draw, size, cx1, cy1, r1, _PURPLE_C1, _PURPLE_C2)

    # ── 青圆 ──
    cx2, cy2, r2 = int(_CYAN_CX * s), int(_CYAN_CY * s), int(_CYAN_R * s)
    _draw_circle(draw, size, cx2, cy2, r2, _CYAN_C1, _CYAN_C2)

    # ── 圆角裁剪蒙版 ──
    mask = Image.new('L', (size, size), 0)
    mask_d = ImageDraw.Draw(mask)
    mask_d.rounded_rectangle([margin, margin, size - margin, size - margin], radius=radius, fill=255)
    img.putalpha(mask)

    # 重新创建 draw（因为 putalpha 可能改变了图像）
    draw = ImageDraw.Draw(img)

    # ── ">_" 文字 ──
    font_size = int(_TEXT_SIZE * s)
    font = None
    for fp in _CONSOLAS_PATHS:
        if Path(fp).exists():
            try:
                font = ImageFont.truetype(fp, font_size)
                break
            except Exception:
                pass
    if font is None:
        font = ImageFont.load_default()

    text = '>_'
    tx, ty = int(_TEXT_CX * s), int(_TEXT_CY * s)
    bbox = draw.textbbox((0, 0), text, font=font)
    draw.text(
        (tx - (bbox[2] - bbox[0]) // 2, ty - (bbox[3] - bbox[1]) // 2),
        text, fill=(255, 255, 255, 230), font=font,
    )

    # ── "CC" 文字 ──
    font_cc_size = int(_CC_SIZE * s)
    font_cc = None
    for fp in _SEGOE_PATHS:
        if Path(fp).exists():
            try:
                font_cc = ImageFont.truetype(fp, font_cc_size)
                break
            except Exception:
                pass
    if font_cc is None:
        font_cc = ImageFont.load_default()

    text_cc = 'CC'
    ccx, ccy = int(_CC_CX * s), int(_CC_CY * s)
    bbox_cc = draw.textbbox((0, 0), text_cc, font=font_cc)
    draw.text(
        (ccx - (bbox_cc[2] - bbox_cc[0]), ccy - (bbox_cc[3] - bbox_cc[1])),
        text_cc, fill=(255, 255, 255, 128), font=font_cc,
    )

    return img
