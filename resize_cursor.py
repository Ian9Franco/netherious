from PIL import Image
import os

def resize_cursor(filename):
    try:
        path = f"public/assets/cursor/{filename}"
        if not os.path.exists(path):
            print(f"File not found: {path}")
            return

        img = Image.open(path)
        img = img.resize((32, 32), Image.NEAREST) # Use NEAREST to keep pixel art look
        img.save(path)
        print(f"Resized {filename} to 32x32")
    except Exception as e:
        print(f"Error resizing {filename}: {e}")

resize_cursor("cursor-default.png")
resize_cursor("cursor-pointer.png")
