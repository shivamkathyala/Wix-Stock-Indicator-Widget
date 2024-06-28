# Wix-Stock-Indicator-Widget
This widget provides a real-time visual indicator for stock availability on your Wix site by fetching data from the GoPos platform.

## Key Features

### Real-Time Stock Updates:

- **Continuously fetches stock data from GoPos every 5 seconds.**
- **Updates the stock indicator dynamically on your Wix site.**

### Visual Stock Indicator:

- **Uses a custom HTML component to display stock levels with a dynamic moving rectangle.**
- **Provides visual feedback such as messages and a progress bar based on the current stock.**

### Automated Stock Management:

- **Integrates with Wix Data Collection to fetch, insert, and delete stock data seamlessly.**

## Components Used

### JavaScript Files:

- **`stock.js`**: Manages fetching, inserting, and updating stock data in Wix.
- **`gopostoken.web.js`**: Generates an authentication token to access the GoPos API.
- **`goposstockapi.js`**: Uses the token to fetch current stock data from GoPos.

### HTML and CSS:

- **`widget.html`**: Contains the HTML structure and CSS for the stock indicator widget, including a dynamic progress bar and message area.

### Wix Data Collection:

- **Utilizes Wix's database to store and manage stock data, ensuring the widget remains up-to-date.**
