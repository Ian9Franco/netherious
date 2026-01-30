from PIL import Image
import os

try:
    cursor_path = "public/assets/cursor/lore-cursor.png"
    img = Image.open(cursor_path)
    width, height = img.size
    
    # Assuming the image is split horizontally in the middle:
    # Left half = Default Cursor
    # Right half = Hover Cursor (Chest)
    
    half_width = width // 2
    
    default_cursor = img.crop((0, 0, half_width, height))
    pointer_cursor = img.crop((half_width, 0, width, height))
    
    default_cursor.save("public/assets/cursor/cursor-default.png")
    pointer_cursor.save("public/assets/cursor/cursor-pointer.png")
    print(f"Successfully split cursor. Original size: {width}x{height}")
    
except Exception as e:
    print(f"Error splitting cursor: {e}")
