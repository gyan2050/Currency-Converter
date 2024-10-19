const base_url = `https://latest.currency-api.pages.dev/v1/currencies`;
const dropdowns = document.querySelectorAll("form .dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

for( select of dropdowns){
    for( let currcode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currcode;
        newOption.innerText = currcode;

        if( select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        }
        else if( select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
        
    }
    select.addEventListener( "change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countcode = countryList[currcode];

    let newsrc = `https://flagsapi.com/${countcode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
    
};

const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;


    let URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let final_amt = rate * amtval;

    let msg = document.querySelector(".msg");
    let newmsg = `${amtval} ${fromCurr.value} = ${final_amt} ${toCurr.value}`;
    msg.innerText = newmsg;
};

window.addEventListener( "load", (evt) => {
    updateExchangeRate();
})