from PIL import Image, ImageDraw, ImageFont
import os

def create_circular_badge(size, filename):
    """Create circular badge with T inside and red notification dot"""
    
    # Create transparent image
    img = Image.new('RGBA', (size, size), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Calculate circle dimensions
    padding = int(size * 0.02)  # 2% padding
    circle_size = size - (padding * 2)
    
    # Draw main white/cream circle
    draw.ellipse(
        [padding, padding, padding + circle_size, padding + circle_size],
        fill='#F5F5F0',  # Cream white
        outline=None
    )
    
    # Calculate font size for T (should take ~50% of circle)
    font_size = int(size * 0.5)
    
    # Try to load a bold font
    try:
        for font_name in ['arialbd.ttf', 'calibrib.ttf', 'Arial Bold.ttf']:
            try:
                font_path = f"C:\\Windows\\Fonts\\{font_name}"
                font = ImageFont.truetype(font_path, font_size)
                break
            except:
                continue
        else:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Draw the letter "T" centered in the circle
    letter = "T"
    bbox = draw.textbbox((0, 0), letter, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center text in circle
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2
    
    # Draw the "T" in dark navy
    draw.text((text_x, text_y), letter, fill='#1C2833', font=font)
    
    # Draw red notification dot at top-right edge
    dot_radius = int(size * 0.12)  # 12% of total size
    dot_center_x = padding + circle_size - int(dot_radius * 0.7)  # Position at edge
    dot_center_y = padding + int(dot_radius * 0.7)  # Position at edge
    
    # Draw red dot
    draw.ellipse(
        [dot_center_x - dot_radius, dot_center_y - dot_radius,
         dot_center_x + dot_radius, dot_center_y + dot_radius],
        fill='#FF4444',  # Bright red
        outline=None
    )
    
    # Save the image
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({size}x{size})")

# Generate multiple sizes
sizes = [
    (32, 'icon-circular-32.png'),
    (40, 'icon-circular-40.png'),
    (64, 'icon-circular-64.png'),
    (192, 'icon-circular-192.png'),
    (512, 'icon-circular-512.png'),
]

print("Generating circular badge with T and red notification dot...\n")

for size, filename in sizes:
    create_circular_badge(size, filename)

print("\n✅ All circular badges created successfully!")
print("\nFiles created:")
for size, filename in sizes:
    print(f"  • {filename} - {size}x{size}px")
