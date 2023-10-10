if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cartReady);
} else {
    cartReady();
}

// Array and class objects

let array = [];

function item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
}

function addItemToCart(name, price, count) {
    for (let i in array) {
        if (array[i].name === name) {
            array[i].count += count;
            saveCart();
            return;
        }
    }
    let addNewItem = new item(name, price, count);
    array.push(addNewItem);
    saveCart();
}

function removeItemFromCart(name) {
    if (array.length < 1) {
        alert("cart is alreay empty");
    } else {
        for (let i in array) {
            if (array[i].name === name) {
                array[i].count--;
                if (array[i].count === 0) {
                    array.splice(i, 1);
                    alert("item has been removed");
                }
                break;
            }
        }
    }
    saveCart();
}

function removeItemFromCartAll() {
    for (let i in array) {
        if (array[i].name === name) {
            array.splice(i, 1);
            break;
        }
    }
    saveCart();
}

function clearCart() {
    array = [];
    let dropDownMenu = document.getElementsByClassName("dropdown-menu")[0];
    while (dropDownMenu.hasChildNodes()) {
        dropDownMenu.removeChild(dropDownMenu.firstChild);
    }
    saveCart();
    displayCart();
}

function totalCount() {
    let totalItemCount = 0;
    for (let i in array) {
        totalItemCount += array[i].count;
    }
    return totalItemCount;
}

function totalCost() {
    let totalItemCost = 0;
    for (let i in array) {
        totalItemCost += array[i].price * array[i].count;
    }
    return totalItemCost;
}

function copyArray() {
    let copyList = [];
    for (var i in array) {
        let obj = array[i];
        let objCopy = {};
        for (let j in obj) {
            objCopy[j] = obj[j];
        }
        objCopy.totalPrice = objCopy.price * objCopy.count;
        copyList.push(objCopy);
    }
    return copyList;
}

function saveCart() {
    localStorage.setItem("shop-cart", JSON.stringify(array));
}

function loadCart() {
    array = JSON.parse(localStorage.getItem("shop-cart"));
    if (array === null) {
        array = [];
    }
}

//function to handle array with buttons

function cartReady() {
    loadCart();
    displayCart();
    let addToCart = document.getElementsByClassName("btn-primary");
    for (let i = 0; i < addToCart.length; i++) {
        let button = addToCart[i];
        button.addEventListener("click", addToCartClicked);
    }

    let removeFromCart = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeFromCart.length; i++) {
        let removeButton = removeFromCart[i];
        removeButton.addEventListener("click", removeToCartClicked);
    }

    let clearCartButton = document.getElementsByClassName("btn-warning")[0];
    clearCartButton.addEventListener("click", clearCartClicked);
}

function addToCartClicked(event) {
    let btn = event.currentTarget;
    let itemContainer = btn.parentElement.parentElement.parentElement;
    let itemTitle = itemContainer.getElementsByClassName("item-title")[0]
        .innerText;
    let valueStr = itemContainer.getElementsByClassName("item-price")[0]
        .innerText;
    let quantityStr = itemContainer.getElementsByClassName("item-quantity")[0]
        .innerText;
    let quantity = parseInt(quantityStr);
    let value = parseInt(valueStr);
    addItemToCart(itemTitle, value, quantity);
    displayCart();
}

function removeToCartClicked(event) {
    let removeBtn = event.target;
    let itemContainer = removeBtn.parentElement.parentElement.parentElement;
    let itemTitle = itemContainer.getElementsByClassName("item-title")[0]
        .innerText;
    removeItemFromCart(itemTitle);
    displayCart();
}

function clearCartClicked() {
    clearCart();
    document.getElementById("totalPrice").innerText = totalCost();
    document.getElementById("resultShow").innerText = totalCount();
}


function displayCart() {
    let displayArray = copyArray();
    let output = "";
    if (displayArray.length == 0) {
        output += `<span class="dropdown-item">
      cart is empty </span>`;
    } else {
        for (let i in displayArray) {
            output += `<span class="dropdown-item">
   ${displayArray[i].count} x ${displayArray[i].name}  ₹${displayArray[i].totalPrice} </span>`;
        }
    }

    document.getElementsByClassName("dropdown-menu")[0].innerHTML = output;
    document.getElementById("totalPrice").innerText = totalCost();
    document.getElementById("resultShow").innerText = totalCount();

    console.log(array);
    console.log(totalCount());
    console.log(copyArray());
}
