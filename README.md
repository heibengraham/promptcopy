# Prompt Copy - ChatGPT Helper

A simple, responsive web application for copying prompts to use with ChatGPT. The app uses a clean grid layout that adapts to your browser window size.

## Features

- 📋 **One-click copying** - Click any prompt to copy it to your clipboard
- 🔄 **Auto-scroll** - Automatically scrolls to the next prompt after copying
- 📱 **Responsive design** - Adapts to any screen size with a flexible grid layout
- ⚙️ **Configurable** - Add your own prompts via JSON configuration
- 🎨 **Clean interface** - Distraction-free design focused on productivity
- ⌨️ **Keyboard navigation** - Use arrow keys and Enter for quick access
- 🚀 **Netlify Ready** - Deploy instantly to Netlify with zero configuration

## Quick Start

### Local Development
Simply open `index.html` in your browser - no server required!

### Deploy to Netlify
1. **Drag and drop** this folder to [Netlify Drop](https://app.netlify.com/drop)
2. **Or connect your Git repository** to Netlify for automatic deployments
3. **Or use Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir .
   ```

### Start Using
- Click any prompt to copy it to clipboard
- App will auto-scroll to the next prompt  
- Use arrow keys for keyboard navigation
- Resize your browser window - the layout adapts automatically

## Project Structure

```
prompt-copy/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
├── prompts.json        # Prompt configuration file
└── README.md           # This file
```

## Customizing Prompts

Edit `prompts.json` to add your own prompts:

```json
{
  "prompts": [
    {
      "title": "Your Prompt Title",
      "text": "Your prompt text here..."
    }
  ]
}
```

Each prompt should have:
- **title**: Short descriptive name
- **text**: The actual prompt text to copy

## Usage Tips

- **Responsive Layout**: The app automatically adjusts to your browser window size
- **Grid Layout**: Prompts are displayed in a responsive grid that adapts to screen width
- **Keyboard Shortcuts**:
  - `↓` Arrow Down: Navigate to next prompt
  - `↑` Arrow Up: Navigate to previous prompt  
  - `Enter`: Copy current prompt
- **Visual Feedback**: Prompts turn green when copied, next prompt is briefly highlighted
- **Auto-scroll**: After copying, the app automatically scrolls to show the next prompt

## Technical Details

- **Frontend**: Vanilla HTML, CSS, and JavaScript (no dependencies)
- **Hosting**: Static files only - works with any static hosting service
- **Browser Support**: Modern browsers with Clipboard API support
- **Responsive**: CSS Grid layout that adapts to any screen size
- **Zero Configuration**: Ready to deploy to Netlify, Vercel, GitHub Pages, etc.

## Netlify Deployment

This app is optimized for Netlify and requires zero configuration:

1. **Simple Deploy**: Drag the project folder to [netlify.com/drop](https://app.netlify.com/drop)
2. **Git Integration**: Connect your repository for automatic deployments
3. **CLI Deploy**: Use `netlify deploy --prod --dir .` 

The app will work immediately with no build process or server setup required.

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support
- Older browsers: Fallback copy method included

## License

This project is open source and available under the MIT License.