# Prompt Copy Web App

This is a simple web application designed for copying prompts to use with ChatGPT. The app uses a responsive grid layout that adapts to browser window size.

## Features
- Load prompts from a configuration file (prompts.json)
- One-click copy to clipboard
- Auto-scroll to next prompt after copying
- Responsive grid design that adapts to any screen size
- Clean, simple interface
- Zero-configuration Netlify deployment

## Project Structure
- `index.html` - Main HTML file
- `style.css` - Responsive grid styling 
- `script.js` - JavaScript functionality for copying and scrolling
- `prompts.json` - Configuration file with prompt data

## Usage
1. Edit `prompts.json` to add your custom prompts
2. Open `index.html` directly in browser (no server needed)
3. Or deploy to Netlify by dragging folder to netlify.com/drop
4. Click any prompt to copy it to clipboard
5. App will auto-scroll to the next prompt
6. Resize browser window - layout adapts automatically