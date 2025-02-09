#!/bin/bash

# Save the current directory where the script is located
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Define the desktop shortcut name
DESKTOP_DIR="$HOME/Desktop"
SHORTCUT_NAME="DocumentsShortcut"

# Check if the desktop directory exists
if [ ! -d "$DESKTOP_DIR" ]; then
    echo "Desktop directory does not exist!"
    exit 1
fi

# Remove existing symbolic link if it exists
if [ -L "$DESKTOP_DIR/$SHORTCUT_NAME" ]; then
    rm "$DESKTOP_DIR/$SHORTCUT_NAME"
fi

# Create the symbolic link
ln -s "$SCRIPT_DIR" "$DESKTOP_DIR/$SHORTCUT_NAME"

echo "Shortcut created: $DESKTOP_DIR/$SHORTCUT_NAME"
