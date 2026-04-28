"""从 cc-desk.svg 生成所有平台的图标并部署到 CC-Desk/ 目录."""
import os
import shutil

from render_svg import render_svg_to_png

script_dir = os.path.dirname(os.path.abspath(__file__))
CC_DESK = os.path.abspath(os.path.join(script_dir, '..', 'CC-Desk'))
SVG_SRC = os.path.join(script_dir, 'cc-desk.svg')
ICONS_DIR = os.path.join(CC_DESK, 'desktop', 'src-tauri', 'icons')


def save_png(size, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = render_svg_to_png(SVG_SRC, size)
    img.save(path, 'PNG')
    print(f"  PNG {size}x{size} -> {os.path.relpath(path, CC_DESK)}")


def save_ico(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = render_svg_to_png(SVG_SRC, 256)
    img.save(path, 'ICO', sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)])
    print(f"  ICO -> {os.path.relpath(path, CC_DESK)}")


def copy_svg(dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(SVG_SRC, dst)
    print(f"  SVG -> {os.path.relpath(dst, CC_DESK)}")


def main():
    # ── SVG files ──
    print("\n[SVG]")
    for t in [
        os.path.join(CC_DESK, 'desktop', 'src-tauri', 'app-icon.svg'),
        os.path.join(CC_DESK, 'desktop', 'src-tauri', 'app-icon-macos.svg'),
        os.path.join(CC_DESK, 'desktop', 'public', 'app-icon.svg'),
        os.path.join(CC_DESK, 'desktop', 'dist', 'app-icon.svg'),
        os.path.join(CC_DESK, 'docs', 'images', 'app-icon.svg'),
        os.path.join(CC_DESK, 'docs', 'images', 'app-icon-dark.svg'),
        os.path.join(CC_DESK, 'docs', 'images', 'app-icon-light.svg'),
    ]:
        copy_svg(t)

    # ── ICO ──
    print("\n[ICO]")
    save_ico(os.path.join(ICONS_DIR, 'icon.ico'))

    # ── Tauri PNG ──
    print("\n[Tauri PNG]")
    for name, size in {
        'icon.png': 256, '32x32.png': 32, '64x64.png': 64,
        '128x128.png': 128, '128x128@2x.png': 256,
    }.items():
        save_png(size, os.path.join(ICONS_DIR, name))

    # ── Square logos ──
    print("\n[Square Logos]")
    for name, size in {
        'Square30x30Logo.png': 30, 'Square44x44Logo.png': 44,
        'Square71x71Logo.png': 71, 'Square89x89Logo.png': 89,
        'Square107x107Logo.png': 107, 'Square142x142Logo.png': 142,
        'Square150x150Logo.png': 150, 'Square284x284Logo.png': 284,
        'Square310x310Logo.png': 310, 'StoreLogo.png': 50,
    }.items():
        save_png(size, os.path.join(ICONS_DIR, name))

    # ── App distribution ──
    print("\n[App Distribution]")
    save_png(256, os.path.join(CC_DESK, 'desktop', 'public', 'app-icon.png'))
    save_png(256, os.path.join(CC_DESK, 'desktop', 'dist', 'app-icon.png'))

    # ── Android ──
    print("\n[Android]")
    android_base = os.path.join(ICONS_DIR, 'android')
    for folder, size in {
        'mipmap-mdpi': 48, 'mipmap-hdpi': 72, 'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144, 'mipmap-xxxhdpi': 192,
    }.items():
        for name in ('ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'):
            save_png(size, os.path.join(android_base, folder, name))

    # ── iOS ──
    print("\n[iOS]")
    ios_base = os.path.join(ICONS_DIR, 'ios')
    for name, size in {
        'AppIcon-20x20@1x.png': 20, 'AppIcon-20x20@2x.png': 40,
        'AppIcon-20x20@2x-1.png': 40, 'AppIcon-20x20@3x.png': 60,
        'AppIcon-29x29@1x.png': 29, 'AppIcon-29x29@2x.png': 58,
        'AppIcon-29x29@2x-1.png': 58, 'AppIcon-29x29@3x.png': 87,
        'AppIcon-40x40@1x.png': 40, 'AppIcon-40x40@2x.png': 80,
        'AppIcon-40x40@2x-1.png': 80, 'AppIcon-40x40@3x.png': 120,
        'AppIcon-512@2x.png': 1024, 'AppIcon-60x60@2x.png': 120,
        'AppIcon-60x60@3x.png': 180, 'AppIcon-76x76@1x.png': 76,
        'AppIcon-76x76@2x.png': 152, 'AppIcon-83.5x83.5@2x.png': 167,
    }.items():
        save_png(size, os.path.join(ios_base, name))

    print("\n=== Done! All icons replaced from cc-desk.svg ===")


if __name__ == '__main__':
    main()
