"""从 cc-desk.png 生成所有图标并部署到 CC-Desk/ 目录."""
from PIL import Image
from pathlib import Path

script_dir = Path(__file__).parent
cc_desk = script_dir.parent / 'CC-Desk'
png_src = script_dir / 'cc-desk.png'
icons_dir = cc_desk / 'desktop' / 'src-tauri' / 'icons'

src = Image.open(png_src)
print(f'Source: {png_src} ({src.size[0]}x{src.size[1]} {src.mode})')

def save_png(size, path):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    src.resize((size, size), Image.LANCZOS).save(path, 'PNG')

# -- app-icon.png at src-tauri/ root (primary source for Tauri v2) --
img1024 = src.resize((1024, 1024), Image.LANCZOS)
img1024.save(cc_desk / 'desktop' / 'src-tauri' / 'app-icon.png', 'PNG')
print('[1] app-icon.png 1024x1024 -> src-tauri/')

# -- ICO --
src.save(str(icons_dir / 'icon.ico'), 'ICO', sizes=[(256,256),(128,128),(64,64),(48,48),(32,32),(16,16)])
print('[2] icon.ico -> icons/')

# -- Tauri PNG --
for name, size in {'icon.png':256, '32x32.png':32, '64x64.png':64, '128x128.png':128, '128x128@2x.png':256}.items():
    save_png(size, icons_dir / name)
print('[3-7] Tauri PNG x5 -> icons/')

# -- Square Logos --
for name, size in {
    'Square30x30Logo.png':30, 'Square44x44Logo.png':44, 'Square71x71Logo.png':71,
    'Square89x89Logo.png':89, 'Square107x107Logo.png':107, 'Square142x142Logo.png':142,
    'Square150x150Logo.png':150, 'Square284x284Logo.png':284, 'Square310x310Logo.png':310,
    'StoreLogo.png':50,
}.items():
    save_png(size, icons_dir / name)
print('[8-17] Square Logos x10 -> icons/')

# -- App distribution --
img256 = src.resize((256, 256), Image.LANCZOS)
img256.save(cc_desk / 'desktop' / 'public' / 'app-icon.png', 'PNG')
img256.save(cc_desk / 'desktop' / 'dist' / 'app-icon.png', 'PNG')
print('[18-19] App distribution PNGs -> public/ + dist/')

# -- Android --
android_base = icons_dir / 'android'
for folder, size in {'mipmap-mdpi':48, 'mipmap-hdpi':72, 'mipmap-xhdpi':96, 'mipmap-xxhdpi':144, 'mipmap-xxxhdpi':192}.items():
    for name in ('ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'):
        save_png(size, android_base / folder / name)
print('[20-34] Android x15 -> icons/android/')

# -- iOS --
ios_base = icons_dir / 'ios'
for name, size in {
    'AppIcon-20x20@1x.png':20, 'AppIcon-20x20@2x.png':40, 'AppIcon-20x20@2x-1.png':40,
    'AppIcon-20x20@3x.png':60, 'AppIcon-29x29@1x.png':29, 'AppIcon-29x29@2x.png':58,
    'AppIcon-29x29@2x-1.png':58, 'AppIcon-29x29@3x.png':87, 'AppIcon-40x40@1x.png':40,
    'AppIcon-40x40@2x.png':80, 'AppIcon-40x40@2x-1.png':80, 'AppIcon-40x40@3x.png':120,
    'AppIcon-512@2x.png':1024, 'AppIcon-60x60@2x.png':120, 'AppIcon-60x60@3x.png':180,
    'AppIcon-76x76@1x.png':76, 'AppIcon-76x76@2x.png':152, 'AppIcon-83.5x83.5@2x.png':167,
}.items():
    save_png(size, ios_base / name)
print('[35-52] iOS x18 -> icons/ios/')

# -- SVGs with embedded PNG --
import base64
png_b64 = base64.b64encode(png_src.read_bytes()).decode()
svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="768" height="768" viewBox="0 0 768 768">
  <image width="768" height="768" xlink:href="data:image/png;base64,{png_b64}"/>
</svg>'''
for t in [
    cc_desk/'desktop/src-tauri/app-icon.svg',
    cc_desk/'desktop/src-tauri/app-icon-macos.svg',
    cc_desk/'desktop/public/app-icon.svg',
    cc_desk/'desktop/dist/app-icon.svg',
    cc_desk/'docs/images/app-icon.svg',
    cc_desk/'docs/images/app-icon-dark.svg',
    cc_desk/'docs/images/app-icon-light.svg',
]:
    t.parent.mkdir(parents=True, exist_ok=True)
    t.write_text(svg, encoding='utf-8')
print(f'[53-59] SVG x7 -> all targets (with embedded PNG)')

print(f'\n=== Done! 59 icons from cc-desk.png ===')
