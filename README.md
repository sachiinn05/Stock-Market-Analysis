# [ Stock-market-analysis-working-](https://instgram-post.netlify.app/)

Stock Market Analysis
This project is a stock market analysis tool that allows users to view stock performance over different time periods, including 1 month, 3 months, 1 year, and 5 years. The application fetches real-time stock data and displays it on an interactive chart, offering insights into book values, profit margins, and stock summaries.

Features
Interactive Stock Chart: View stock performance for multiple periods (1 month, 3 months, 1 year, and 5 years).
Stock Details: Displays book value, profit percentage, and a brief summary of the selected stock.
Responsive Design: Works seamlessly on both desktop and mobile devices.
Peak & Low Indicators: Highlights the highest (peak) and lowest (low) values on the chart with visual markers.
Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Fetches data from the stock API
Charting: Uses Chart.js for rendering stock performance charts
Styling: Custom CSS with responsive design
API Usage
This project interacts with the following APIs:

GET /api/stocks/getstockstatsdata: Fetches stock statistics data like book value and profit percentage.
GET /api/stocks/getstocksprofiledata: Fetches profile information for the selected stock, including stock summary.
GET /api/stocks/getstocksdata: Fetches stock price data for different time periods.
How to Run the Project
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/stock-market-analysis.git
Navigate to the project directory:

bash
Copy code
cd stock-market-analysis
Open the index.html file in your browser to view the application.

Project Structure
bash
Copy code
📦 stock-market-analysis
├── 📄 index.html       # Main HTML file
├── 📄 index.css        # Stylesheet
├── 📄 script.js        # Main JavaScript logic
└── 📄 README.md        # This readme file
How It Works
On page load, the application fetches stock data using the APIs.
The stock list is displayed on the right side, showing the stock symbol, book value, and profit percentage.
Users can select different time periods to view stock performance over time.
The chart displays stock price data, with red and blue markers indicating the peak and low points, respectively.
Clicking on any stock from the list updates the chart and details to reflect the selected stock.
Responsive Design
The application is optimized for both mobile and desktop viewports. Flexbox layout ensures smooth adjustment to smaller screens, while the chart remains interactive across devices.

Customization
You can easily swap out the API endpoints in script.js with your own.
Modify the styling in index.css to change the look and feel of the application.
Demo
[Link to live demo or screenshots (optional)]

License
This project is licensed under the MIT License. See the LICENSE file for more details.
