from PIL import Image, ImageDraw, ImageFont
import os

def create_icon_badge(size, filename):
    """Create minimalist T with red dot icon badge"""
    
    # Create image with white background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)
    
    # Calculate font size (T should take ~60% of canvas height)
    font_size = int(size * 0.6)
    
    # Try to load a bold font, fallback to default
    try:
        # Try common Windows fonts
        for font_name in ['arialbd.ttf', 'calibrib.ttf', 'Arial Bold.ttf']:
            try:
                font_path = f"C:\\Windows\\Fonts\\{font_name}"
                font = ImageFont.truetype(font_path, font_size)
                break
            except:
                continue
        else:
            # If no font found, use default
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Draw the letter "T" centered
    letter = "T"
    
    # Get text bounding box for centering
    bbox = draw.textbbox((0, 0), letter, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 + int(size * 0.05)  # Slight downward adjustment
    
    # Draw the "T" in dark navy (matching app color)
    draw.text((text_x, text_y), letter, fill='#1C2833', font=font)
    
    # Calculate red dot position (centered above T, slightly higher)
    dot_radius = int(size * 0.08)  # 8% of canvas size
    dot_x = size // 2
    dot_y = text_y - int(font_size * 0.25)  # Well above the T
    
    # Draw red dot
    draw.ellipse(
        [dot_x - dot_radius, dot_y - dot_radius, 
         dot_x + dot_radius, dot_y + dot_radius],
        fill='#FF0000'
    )
    
    # Save the image
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({size}x{size})")

# Generate multiple sizes for different use cases
sizes = [
    (32, 'icon-badge-32.png'),    # Small header display
    (40, 'icon-badge-40.png'),    # Medium header display
    (64, 'icon-badge-64.png'),    # Retina displays
    (192, 'icon-badge-192.png'),  # Home screen icon
    (512, 'icon-badge-512.png'),  # Splash screen
]

print("Generating minimalist T● icon badges...\n")

for size, filename in sizes:
    create_icon_badge(size, filename)

print("\n✅ All icon badges created successfully!")
print("\nFiles created:")
for size, filename in sizes:
    print(f"  • {filename} - {size}x{size}px")
