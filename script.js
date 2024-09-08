let currentStockKey = "AAPL";
let currentChartData = null;
let chartInstance = null;

async function main() {
  const stocksdata = await fetchdata();
  const stocksdata2 = await fetchdata2();
  const stocksdata3 = await fetchdata3();
  displayStocks(
    stocksdata.stocksStatsData,
    stocksdata2.stocksProfileData,
    stocksdata3.stocksData
  );

  // Set currentChartData for the default stock
  currentChartData = stocksdata3.stocksData;

  // Display the default chart for AAPL
  displaychart(currentStockKey, currentChartData, "5y");

  // Display the default details for AAPL
  displaydetails(currentStockKey, stocksdata2.stocksProfileData);

  // Set default details for AAPL on page load
  setDefaultStockDetails();

  // Add event listeners to the period buttons once
  document.querySelector(".btn-1mon").addEventListener("click", () => {
    displaychart(currentStockKey, currentChartData, "1mo");
  });
  document.querySelector(".btn-3mon").addEventListener("click", () => {
    displaychart(currentStockKey, currentChartData, "3mo");
  });
  document.querySelector(".btn-1year").addEventListener("click", () => {
    displaychart(currentStockKey, currentChartData, "1y");
  });
  document.querySelector(".btn-5year").addEventListener("click", () => {
    displaychart(currentStockKey, currentChartData, "5y");
  });
}



async function fetchdata() {
  const request = await fetch(
    "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata"
  );
  const response = await request.json();
  return response;
}

async function fetchdata2() {
  const request2 = await fetch(
    "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata"
  );
  const response2 = await request2.json();
  return response2;
}

async function fetchdata3() {
  const request3 = await fetch(
    "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
  );
  const response3 = await request3.json();
  return response3;
}

function displayStocks(data, profileData, chartdata) {
  const stockContainer = document.querySelector(".right-box");
  stockContainer.innerHTML = "";

  const stocks = data[0];

  for (const stockKey in stocks) {
    if (stockKey !== "_id") {
      const stockData = stocks[stockKey];

      const stockElement = document.createElement("div");
      stockElement.classList.add("stock-item");
      stockElement.innerHTML = `
          <button>${stockKey}</button>
          <span>$${stockData.bookValue}</span>
          <span class="${stockData.profit > 0 ? "positive" : "negative"}">
            ${(stockData.profit * 100).toFixed(2)}%
          </span>
        `;

      stockContainer.appendChild(stockElement);
      const button = stockElement.querySelector("button");
      button.addEventListener("click", () => {
        const nam = document.querySelector(".one");
        const bokvl = document.querySelector(".two");
        const prfit = document.querySelector(".three");
        nam.textContent = ` ${stockKey}`;
        bokvl.textContent = ` $${stockData.bookValue}`;
        prfit.textContent = ` ${(stockData.profit * 100).toFixed(2)}%`;

        prfit.className = `three ${
          stockData.profit > 0 ? "positive" : "negative"
        }`;

        currentStockKey = stockKey;
        currentChartData = chartdata;

        displaydetails(stockKey, profileData);
        displaychart(stockKey, chartdata, "5y");
      });
    }
  }
}

async function displaydetails(stockKey, profileData) {
  const detailsContainer = document.querySelector(".content");
  detailsContainer.innerHTML = "No details available";

  const details = profileData[0][stockKey];
  if (details) {
    detailsContainer.innerHTML = `<p>${details.summary}</p>`;
  }
}

async function displaychart(stockKey, chartdata, timePeriod="5y") {
  const chartdetails = document.querySelector(".useful");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const detail = chartdata[0][stockKey]?.[timePeriod];

  if (detail) {
    const values = detail.value;
    const timestamps = detail.timeStamp.map((ts) =>
      new Date(ts * 1000).toLocaleDateString()
    );

    // Calculate peak and low values
    const peakValue = Math.max(...values);
    const lowValue = Math.min(...values);
    const peakIndex = values.indexOf(peakValue);
    const lowIndex = values.indexOf(lowValue);

    const ctx = chartdetails.getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: stockKey,
            data: values,
            borderColor: "green",
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
          },
          {
            label: "Peak",
            data: [{ x: timestamps[peakIndex], y: peakValue }],
            backgroundColor: "red",
            borderColor: "red",
            pointStyle: "rect",
            pointRadius: 5,
          },
          {
            label: "Low",
            data: [{ x: timestamps[lowIndex], y: lowValue }],
            backgroundColor: "blue",
            borderColor: "blue",
            pointStyle: "rect",
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Date",
            },
            ticks: {
              display: false, // Hide the x-axis ticks (dates)
            },
          },
          y: {
            title: {
              display: true,
              text: "Stock Price",
            },
          },
        },
      },
    });
  } else {
    console.error(
      `No data available for ${stockKey} in the selected period: ${timePeriod}`
    );
  }
}

// Set default stock details on page load
function setDefaultStockDetails() {
  const nam = document.querySelector(".one");
  const bokvl = document.querySelector(".two");
  const prfit = document.querySelector(".three");
  nam.textContent = ` ${currentStockKey}`;
  bokvl.textContent = ` $3.953`; // Default book value for AAPL
  prfit.textContent = ` 24.49%`; // Default profit for AAPL
  prfit.className = `three positive`; // Default profit class
}

main();