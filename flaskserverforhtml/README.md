# Banwee Email Template Server

A Flask server to preview all Banwee email templates with realistic dummy data.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python server.py
```

3. Open your browser and navigate to:
- **Main index**: http://localhost:5001
- **API endpoint**: http://localhost:5001/api/templates

## Template Categories

- **Account Templates** (`/account/*`): Email activation, welcome, password reset, etc.
- **Pre-Purchase Templates** (`/pre/*`): Cart abandonment, back in stock, price drops, etc.
- **Purchase Templates** (`/purchase/*`): Order confirmation, delivery notifications, etc.
- **Post-Purchase Templates** (`/post/*`): Thank you, reviews, returns, warranties, etc.
- **Marketing Templates** (`/marketing/*`): Newsletters, flash sales, events, etc.
- **Legal Templates** (`/legal/*`): Policy updates, GDPR, cookie settings, etc.

## Features

- **39 email templates** with realistic dummy data
- **Responsive design** matching Banwee brand styling
- **JSON API** for programmatic access to template data
- **Easy navigation** with categorized template listing
- **Live preview** in browser with proper email rendering

## Usage

The server runs independently outside the backend/frontend structure, making it perfect for:
- Template development and testing
- Design reviews and approvals
- Marketing campaign previews
- Documentation and demos

All templates use the existing Banwee design system and include sample data that reflects real-world scenarios.
