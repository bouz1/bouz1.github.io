#!/bin/bash

# Save the current directory where the script is located
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Change to the script's directorycd
cd "/home/pcperso/VirtualEnvPython"
# Activate the virtual environment
source venv/bin/activate

# Run Jupyter Lab in the folder where the script is located
jupyter lab "$SCRIPT_DIR"
