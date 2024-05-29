let basic_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let i=1;
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value =currCode;
        if(select.name==="from"&&currCode=="USD"){
            newOption.selected ="selected";
        }
        else if(select.name==="to"&&currCode==="INR"){
            newOption.selected ="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const msg =document.querySelector(".msg")
const updateFlag = (element)=>{
    let currCode =element.value;
    let countryCode = countryList[currCode];
    let newSrc =`http://flagsapi.com/${countryCode}/flat/64.png`
    element.parentElement.querySelector("img").src =newSrc;
   
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amVal =amount.value;
    if(amVal <1 && amVal===""){
        amVal =1;
        amount.value="1";
    }
    const URL = `${basic_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response =await fetch(URL);
   let rate = data[toCurr.value.toLoerCase()];
    let finalAmnt =amVal*rate;
    msg.innerText=`${amVal} ${fromCurr.value} = ${finalAmnt} ${toCurr.value}`;
})
