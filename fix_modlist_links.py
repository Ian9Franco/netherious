import re
import os

file_path = r'c:\Code Projects\netherious3\public\modlist\modlist.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <a> tags with <div> tags for mod-items
# Pattern: <a href="..." class="mod-item" target="_blank" title="...">...</a>
# We want: <div class="mod-item" title="...">...</div>

# Regex explanation:
# <a\s+href="[^"]*"\s+class="mod-item"\s+target="_blank"\s+title="([^"]*)">
# Capture group 1 is the title
# (.*?) content inside
# </a>

pattern = r'<a\s+href="[^"]*"\s+class="mod-item"\s+target="_blank"\s+title="([^"]*)">\s*(.*?)\s*</a>'
replacement = r'<div class="mod-item" title="\1">\2</div>'

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Update CSS to ensure cursor is default for mod-item
css_pattern = r'(\.mod-item\s*\{[^}]*?)(\s*cursor:\s*pointer\s*;)?([^}]*\})'
# Ensuring it doesn't look like a link
# Note: The original CSS didn't have cursor: pointer explicitly, usually <a> has it. 
# But let's add cursor: default to be sure.

# Just add cursor: default to the .mod-item css block
# We can find .mod-item { and add it.
if '.mod-item {' in new_content:
    new_content = new_content.replace('.mod-item {', '.mod-item {\n            cursor: default;')

if 'text-decoration: none;' in new_content:
     # keeping it is fine, but strictly <div> doesn't need it.
     pass

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated modlist.html to remove links.")
