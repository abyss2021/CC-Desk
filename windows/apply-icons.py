"""Replace all CC-Desk icons with cc-desk icons."""
import os
import sys
import shutil
import importlib.util

script_dir = os.path.dirname(os.path.abspath(__file__))

# Load gen-icon.py (hyphen in name prevents direct import)
gen_icon_path = os.path.join(script_dir, 'gen-icon.py')
spec = importlib.util.spec_from_file_location('gen_icon', gen_icon_path)
gen_icon = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen_icon)
create_icon = gen_icon.create_icon

CC_DESK = os.path.abspath(os.path.join(script_dir, '..', 'CC-Desk'))

def save_png(size, path):
    """Generate and save a PNG icon at the given size."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = create_icon(size)
    img.save(path, 'PNG')
    print(f"  PNG {size}x{size} -> {os.path.relpath(path, CC_DESK)}")

def copy_ico(src, dst):
    """Copy .ico file."""
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    print(f"  ICO -> {os.path.relpath(dst, CC_DESK)}")

def copy_svg(src, dst):
    """Copy .svg file."""
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    print(f"  SVG -> {os.path.relpath(dst, CC_DESK)}")

def main():
    ico_src = os.path.join(script_dir, 'cc-desk.ico')
    svg_src = os.path.join(script_dir, 'cc-desk.svg')
    icons_dir = os.path.join(CC_DESK, 'desktop', 'src-tauri', 'icons')

    # ── SVG files ──
    print("\n[SVG]")
    svg_targets = [
        os.path.join(CC_DESK, 'desktop', 'src-tauri', 'app-icon.svg'),
        os.path.join(CC_DESK, 'desktop', 'src-tauri', 'app-icon-macos.svg'),
        os.path.join(CC_DESK, 'desktop', 'public', 'app-icon.svg'),
        os.path.join(CC_DESK, 'desktop', 'dist', 'app-icon.svg'),
        os.path.join(CC_DESK, 'docs', 'images', 'app-icon.svg'),
        os.path.join(CC_DESK, 'docs', 'images', 'app-icon-dark.svg'),
        os.path.join(CC_DESK, 'docs', 'images', 'app-icon-light.svg'),
    ]
    for t in svg_targets:
        copy_svg(svg_src, t)

    # ── ICO files ──
    print("\n[ICO]")
    ico_targets = [
        os.path.join(icons_dir, 'icon.ico'),
    ]
    for t in ico_targets:
        copy_ico(ico_src, t)

    # ── Tauri standard PNG icons ──
    print("\n[Tauri PNG]")
    png_sizes = {
        'icon.png': 256,
        '32x32.png': 32,
        '64x64.png': 64,
        '128x128.png': 128,
        '128x128@2x.png': 256,
    }
    for name, size in png_sizes.items():
        save_png(size, os.path.join(icons_dir, name))

    # ── Square logos ──
    print("\n[Square Logos]")
    square_logos = {
        'Square30x30Logo.png': 30,
        'Square44x44Logo.png': 44,
        'Square71x71Logo.png': 71,
        'Square89x89Logo.png': 89,
        'Square107x107Logo.png': 107,
        'Square142x142Logo.png': 142,
        'Square150x150Logo.png': 150,
        'Square284x284Logo.png': 284,
        'Square310x310Logo.png': 310,
        'StoreLogo.png': 50,
    }
    for name, size in square_logos.items():
        save_png(size, os.path.join(icons_dir, name))

    # ── App distribution PNGs ──
    print("\n[App Distribution]")
    save_png(256, os.path.join(CC_DESK, 'desktop', 'public', 'app-icon.png'))
    save_png(256, os.path.join(CC_DESK, 'desktop', 'dist', 'app-icon.png'))

    # ── Android icons ──
    print("\n[Android]")
    android_sizes = {
        'mipmap-mdpi': 48,
        'mipmap-hdpi': 72,
        'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144,
        'mipmap-xxxhdpi': 192,
    }
    android_base = os.path.join(icons_dir, 'android')
    for folder, size in android_sizes.items():
        for name in ('ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'):
            save_png(size, os.path.join(android_base, folder, name))

    # ── iOS icons ──
    print("\n[iOS]")
    ios_sizes = {
        'AppIcon-20x20@1x.png': 20,
        'AppIcon-20x20@2x.png': 40,
        'AppIcon-20x20@2x-1.png': 40,
        'AppIcon-20x20@3x.png': 60,
        'AppIcon-29x29@1x.png': 29,
        'AppIcon-29x29@2x.png': 58,
        'AppIcon-29x29@2x-1.png': 58,
        'AppIcon-29x29@3x.png': 87,
        'AppIcon-40x40@1x.png': 40,
        'AppIcon-40x40@2x.png': 80,
        'AppIcon-40x40@2x-1.png': 80,
        'AppIcon-40x40@3x.png': 120,
        'AppIcon-512@2x.png': 1024,
        'AppIcon-60x60@2x.png': 120,
        'AppIcon-60x60@3x.png': 180,
        'AppIcon-76x76@1x.png': 76,
        'AppIcon-76x76@2x.png': 152,
        'AppIcon-83.5x83.5@2x.png': 167,
    }
    ios_base = os.path.join(icons_dir, 'ios')
    for name, size in ios_sizes.items():
        save_png(size, os.path.join(ios_base, name))

    print("\n=== Done! All icons replaced ===")

if __name__ == '__main__':
    main()
