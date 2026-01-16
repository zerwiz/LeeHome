# Lee Homepage

A modern, responsive homepage built for Netlify hosting.

**GitHub Repository:** [https://github.com/zerwiz/LeeHome](https://github.com/zerwiz/LeeHome)

## Features

- Clean, modern design
- Fully responsive
- Smooth scrolling navigation
- Optimized for performance
- Ready for Netlify deployment

## Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Netlify Deployment

### Option 1: Drag and Drop
1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Drag and drop the entire project folder onto the Netlify dashboard
4. Your site will be live in seconds!

### Option 2: Git Integration
1. Push your code to GitHub, GitLab, or Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically detect the settings from `netlify.toml`
4. Deploy!

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript
├── netlify.toml        # Netlify configuration
├── .cursorrules        # Cursor IDE rules
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Customization

- Edit `index.html` to change content
- Modify `styles.css` to update styling
- Add functionality in `script.js`
- Update `netlify.toml` for deployment settings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use and modify.
