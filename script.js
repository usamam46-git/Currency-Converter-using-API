const BASE_URL = "https://v6.exchangerate-api.com/v6/9609f0d93ee61c0884cde4e6/pair"
const dropdowns = document.querySelectorAll(".select-section select");
let resultBtn = document.getElementById("get-result");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
for (const select of dropdowns) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && code === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    }
    )
};
const updateFlag = (element) => {
    let Code = element.value;
    let countryCode = countryList[Code];
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}
resultBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.getElementById("Amount").value;
    if (amount === "" || amount < 1) {
        amount = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}/${amount}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rate;
    let converted = data.conversion_result;
    let time = data.time_last_update_utc;
    let output = document.getElementById("message-box");
    if (data.result === "success") {
        output.innerHTML = `
      <p style="text-align: center;">1 ${fromCurr.value} = <b>${rate}</b> ${toCurr.value}</p>
      <p style="text-align: center;">${amount} ${fromCurr.value} = <b>${converted}</b> ${toCurr.value}</p>
      <p style="text-align: center;">Last Updated= ${time}</p>
    `;
    }
    else {
        document.getElementById("message-box").innerHTML =
            `<p style="color:red;">Error: ${data['error-type'] || 'Unable to fetch data'}</p>`;
    }
}
);



