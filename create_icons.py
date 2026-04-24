"""
Generate Taskra logo PNG icons with red dot ABOVE the letter 'a'
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_taskra_icon(size, filename):
    """Create Taskra icon with red dot above 'a'"""
    
    # Create white background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)
    
    # Calculate font size
    font_size = int(size * 0.35)
    
    # Try to use system font (bold)
    try:
        # Windows fonts
        font = ImageFont.truetype("segoeuib.ttf", font_size)  # Segoe UI Bold
    except:
        try:
            font = ImageFont.truetype("arialbd.ttf", font_size)  # Arial Bold
        except:
            try:
                font = ImageFont.truetype("arial.ttf", font_size)  # Arial Regular
            except:
                font = ImageFont.load_default()
    
    # Text
    text = "Taskra"
    text_color = "#1C2833"  # Dark navy
    
    # Get text bounding box to center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center position
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2
    
    # Draw text
    draw.text((text_x, text_y), text, fill=text_color, font=font)
    
    # Calculate red dot position ABOVE the 'a'
    # Measure position of the 'a' in "Taskra"
    before_a = "Taskr"
    before_a_bbox = draw.textbbox((0, 0), before_a, font=font)
    before_a_width = before_a_bbox[2] - before_a_bbox[0]
    
    a_bbox = draw.textbbox((0, 0), "a", font=font)
    a_width = a_bbox[2] - a_bbox[0]
    
    # Position dot centered above 'a'
    dot_x = text_x + before_a_width + (a_width // 2)
    dot_y = text_y - int(font_size * 0.35)  # Well above the text
    dot_radius = int(font_size * 0.15)  # Larger dot
    
    # Draw red dot (filled circle)
    draw.ellipse(
        [dot_x - dot_radius, dot_y - dot_radius, 
         dot_x + dot_radius, dot_y + dot_radius],
        fill='#FF0000'  # Bright red
    )
    
    # Save
    img.save(filename, 'PNG', quality=100)
    print(f"✅ Created: {filename} ({size}x{size}px)")

if __name__ == "__main__":
    # Create both icon sizes
    create_taskra_icon(192, "icon-192.png")
    create_taskra_icon(512, "icon-512.png")
    print("\n🎉 Icons created successfully!")
    print("Red dot is positioned ABOVE the letter 'a'")
