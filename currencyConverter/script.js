const Base_url = "https://api.freecurrencyapi.com/v1/latest";
const apiKey = "fca_live_wDoAT5IuRVHIoJCWhTAEnIFx9iGxhSeY81xD63cI";

const DropdownS = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

console.log(countryList);

for (let select of DropdownS) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
    console.log(currcode);
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(amtval);
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    // Construct the URL with the currencies to convert
    const URL = `${Base_url}?apikey=${apiKey}&currencies=${fromcurr.value},${tocurr.value}`;
    try {
        // Fetch data from the API
        let response = await fetch(URL);
        let data = await response.json();

        // Log the response to understand the structure
        console.log("API Response:", data);

        // Access the exchange rate directly from data
        let fromRate = data.data[fromcurr.value];
        let toRate = data.data[tocurr.value];
        
        console.log(`Rate from ${fromcurr.value}:`, fromRate);
        console.log(`Rate to ${tocurr.value}:`, toRate);

        // Ensure rates are valid numbers
        if (typeof fromRate !== "number" || isNaN(fromRate) || typeof toRate !== "number" || isNaN(toRate)) {
            throw new Error("Invalid rate received");
        }

        // Calculate the final amount
        let finalAmount = (amtval * toRate) / fromRate; // Adjusting for the correct conversion

        // Display the result
        msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
    } catch (error) {
        // Handle any errors, including network or parsing issues
        console.error("Error during conversion:", error);
        msg.innerText = `Failed to fetch conversion rate: ${error.message}`;
    }
});

