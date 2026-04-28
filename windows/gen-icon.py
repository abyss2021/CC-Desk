"""Generate CC-Desk icon PNG at arbitrary size using Pillow."""
from PIL import Image, ImageDraw


def create_icon(size: int = 256) -> Image.Image:
    """Create a CC-Desk icon as a PIL Image at the given size."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded-rect background (approximate with a circle for smaller sizes)
    margin = size // 20
    r = size // 7  # corner radius

    # Background fill — dark gradient approximation
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=r,
        fill=(30, 30, 45, 255),
    )

    # Purple circle (top-left)
    cx1 = int(size * 0.33)
    cy1 = int(size * 0.33)
    cr1 = int(size * 0.23)
    draw.ellipse(
        [cx1 - cr1, cy1 - cr1, cx1 + cr1, cy1 + cr1],
        fill=(200, 140, 255, 230),
    )

    # Cyan circle (bottom-right)
    cx2 = int(size * 0.67)
    cy2 = int(size * 0.67)
    cr2 = int(size * 0.23)
    draw.ellipse(
        [cx2 - cr2, cy2 - cr2, cx2 + cr2, cy2 + cr2],
        fill=(100, 200, 255, 230),
    )

    return img
