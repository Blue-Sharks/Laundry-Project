'use strict';

var customerArray = [];
var washingItems = ['T-Shirts', 'Pants', 'Shorts', 'Formal Wear', 'Socks and Underwear', 'Jackets', 'Others'];
var priceArray= [1, 1.5, 0.75, 2, 0.5, 1.5, 1];
var placeOrder =  document.getElementById("place-order");
placeOrder.style.display= "none";


function CustomerOrder(name, phone, address, chooses, checkedValue,promo, total) {
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.chooses = chooses;
    this.promo = promo;
    this.checkedValue=checkedValue;
    this.total = total;

    customerArray.push(this);

   
}

// create local storage to store data 
function customerData() {
    localStorage.setItem('customers', JSON.stringify(customerArray));
}

// back up the data from localstorage to object array 
function retrieveData() {
    if (localStorage.length > 0) {
        customerArray = JSON.parse(localStorage.getItem('customers'));
    }
    console.log(customerArray);
}

var formOrder = document.getElementById("order-from");
formOrder.addEventListener('submit', addNewCustomer);
var checked = [];
var checkedValue = [];


function addNewCustomer(event) {
    event.preventDefault();
    var name = event.target.name.value;
    var phone = event.target.contact.value;
    var address = event.target.address.value;
    var numberinput = document.querySelectorAll('input[type=number]');
  
    for (var i = 0; i < washingItems.length; i++) {
        if (numberinput[i].value === "") {
            checked.push(washingItems[i]);
            checkedValue.push(0);

        }
        else {
            checked.push(washingItems[i]);
            checkedValue.push(parseInt(numberinput[i].value));
        }
    }

    var promo = event.target.promo.value;

    var promoValue = 0;

    switch(promo){
        case "ST30":
            promoValue = 0.3;
            break;
        case "TA15":
            promoValue = 0.15;
            break;
        case "AD10":
            promoValue = 0.1;
            break;
        default:
            promoValue = 1;
            break;
    }
   
    var totalPrice =  renderReciept(promoValue);
    
        

    // student 30%  ST30  
    // Ta 15% TA15
    // Admin 10% AD10

    var customer = new CustomerOrder(name, phone, address, checked, checkedValue, promoValue, totalPrice);
    console.log(customer);
   
}


function renderReciept(promoValue){
    placeOrder.style.display= "block";
    
    var totalPrice = 0 ;

    var parent = document.getElementById("reciept");
    var table =document.createElement("table");
    table.setAttribute("border","1");
    parent.appendChild(table);
    var headRow =document.createElement("tr");
    table.appendChild(headRow);
    var headColumnOne =document.createElement("th");
    headColumnOne.textContent = "Item";
    headRow.appendChild(headColumnOne);
    var headColumnTwo =document.createElement("th");
    headColumnTwo.textContent = "Amount";
    headRow.appendChild(headColumnTwo);
    var headColumnThree =document.createElement("th");
    headColumnThree.textContent = "Price";
    headRow.appendChild(headColumnThree);
    var headColumnFour =document.createElement("th");
    headColumnFour.textContent = "Item Total";
    headRow.appendChild(headColumnFour);

    
    for(var j = 0; j< washingItems.length; j++){
         if(checkedValue[j] !== 0){
            var bodyRow = document.createElement("tr");
            table.appendChild(bodyRow);
      
            var bodyColumnOne =document.createElement("td");
            bodyColumnOne.textContent = checked[j];
            bodyRow.appendChild(bodyColumnOne);

            var bodyColumnTwo =document.createElement("td");
            bodyColumnTwo.textContent = checkedValue[j];
            bodyRow.appendChild(bodyColumnTwo);

            var bodyColumnThree =document.createElement("td");
            bodyColumnThree.textContent = priceArray[j];
            bodyRow.appendChild(bodyColumnThree);

            var bodyColumnFour =document.createElement("td");
            bodyColumnFour.textContent = checkedValue[j] *  priceArray[j] ;
            bodyRow.appendChild(bodyColumnFour);

         
            totalPrice = totalPrice + checkedValue[j] *  priceArray[j] ;   
        }
        
    }

    if(promoValue === 1 ){
    var footerRowOne =document.createElement("tr");
    table.appendChild(footerRowOne);
    var footerColumnOne =document.createElement("th");
    footerColumnOne.setAttribute("colspan","4");
    footerColumnOne.textContent = "Total Before Discount : "+ totalPrice +" JD" ;
    footerRowOne.appendChild(footerColumnOne);
    }else{
        var footerRowTwo =document.createElement("tr");
        table.appendChild(footerRowTwo);

        var footerColumnTwo =document.createElement("th");
        footerColumnTwo.setAttribute("colspan","4");
        footerColumnTwo.textContent = "Total After Discount : " + parseFloat(totalPrice-(totalPrice * promoValue)).toFixed(2) +" JD";
        footerRowTwo.appendChild(footerColumnTwo);

        var footerRowThree =document.createElement("tr");
        table.appendChild(footerRowThree);

        var footerColumnThree =document.createElement("th");
        footerColumnThree.setAttribute("colspan","4");
        footerColumnThree.textContent = "Please make sure to have your Uni ID on you at time of Payment" ;
        footerRowThree.appendChild(footerColumnThree);
    }

    
    return totalPrice;
}

placeOrder.addEventListener('click',function(event){
    customerData();
    alert("Order Submitted");
    location.reload();
  
});

retrieveData();

