let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: "Wedding Package",
        tag: "weddingpackage",
        img: "wedding",
        price: 5000,
        inCart: 0
    },
    {
        name: "Architectural",
        tag: "architectural",
        img: "architectural",
        price: 1000,
        inCart: 0
    },
    {
        name: "Studio",
        tag: "studio",
        img: "studio",
        price: 2000,
        inCart: 0
    },
    {
        name: "Drone",
        tag: "drone",
        img: "drone",
        price: 3500,
        inCart: 0
    },
    {
        name: "Outdoor",
        tag: "outdoor",
        img: "outdoor",
        price: 3000,
        inCart: 0
    },
    {
        name: "Product",
        tag: "product",
        img: "product",
        price: 4500,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.tag;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '',
            Object.values(cartItems).map((item) => {
                productContainer.innerHTML += `
                <div class="product">
                    <i class="delete far fa-times-circle fa-2x"></i>
                    <img class="cart-img" src="./PhotoStudio/${item.img}.jpg">  
                    <span class="sm-hide">${item.name}</span>
                </div>
           <div class="price sm-hide">$${item.price}.00</div>
           <div class="quantity">
            <i class="decrease far fa-arrow-alt-circle-left fa-2x"></i>
            <span>${item.inCart}</span>
           <i class="increase far fa-arrow-alt-circle-right fa-2x"></i>
           </div>
           <div class="total">$${item.inCart * item.price}.00</div>`;
            });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart}.00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }

}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            // console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            // console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            // console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product .delete');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    // console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}


// This if the function for the sign up form and it register the information in the local storage.
function store() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var userName = document.getElementById('userName').value;
    var email = document.getElementById('email').value;
    var pw = document.getElementById('pw').value;
    var address = document.getElementById('address').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    var postal = document.getElementById('postal').value;
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (userName.length == 0) {
        alert('Please fill in Username');

    } else if (pw.length == 0) {
        alert('Please fill in password');

    } else if (userName.length == 0 && pw.length == 0) {
        alert('Please fill in username and password');

    } else if (pw.length > 8) {
        alert('Max of 8');

    } else if (!pw.match(numbers)) {
        alert('please add 1 number');

    } else if (!pw.match(upperCaseLetters)) {
        alert('please add 1 uppercase letter');

    } else if (!pw.match(lowerCaseLetters)) {
        alert('please add 1 lowercase letter');
    } else { alert('Account Created') };

    let stored_users = JSON.parse(localStorage.getItem('users'));

    if (stored_users) {
        stored_users.push({
            name: firstName,
            lastName,
            userId: userName,
            password: pw,
            add: address,
            country: country,
            state: state,
            postal: postal
        });
        localStorage.setItem('users', JSON.stringify(stored_users));
    } else {
        localStorage.setItem('users', JSON.stringify([{
            name: firstName,
            lastName,
            userId: userName,
            password: pw,
            add: address,
            country: country,
            state: state,
            postal: postal
        }]));

    }
}

//Function for the purpose of checking the user data against the local storage.
function check() {
    var usrName = document.getElementById('username');
    var usrPw = document.getElementById('password');

    let stored_users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < stored_users.length; i++) {
        if (stored_users[i].userId === usrName.value && stored_users[i].password === usrPw.value) {
            alert('You are logged in ' + usrName.value);
            window.location.href = "http://127.0.0.1:5500/final_project/home.html";

        } else {
            return alert('Access denied. Valid username and password is required.');
        }
    }
}



// function check(){
//     var storedName = localStorage.getItem('userId');
//     var storedPw = localStorage.getItem('password');

//     var userName = document.getElementById('username');
//     var userPw = document.getElementById('password');
//     // var userRemember = document.getElementById("rememberMe");

//     if(userName.value == storedName && userPw.value == storedPw){
//         alert('You are logged in.');
//     }else{
//         alert('Error on login');
//     }
// }

// function check() {
//     var usrName = document.getElementById('username');
//     var usrPw = document.getElementById('password');
//     let user = localStorage.getItem('users')
//     for(i=0; i < user.length ; i++){
//         var storedName = [];
//         var storedPw = [];
//         storedName[i]=localStorage.getItem('user[i]');
//         storedPw[i]=localStorage.getItem('password[i]');
//         if(usrName.value == storedName[i] && usrPw.value == storedPw[i]) {
//             alert('You are logged in.');
//         }else {
//             alert('ERROR.');
//         }
//     }  
// }

// function check()
// {
//    const hash = Object.fromEntries(
//    a.map(e => [e.name, e.password])
// )
// var username = document.getElementById('username').value;
// var password = document.getElementById('password').value;
// for (let key of hash) 
// {

//     if(key[0] === username && key[1]===atob(password))
//      {
//          alert('Login successful');
//      }

// else
//      {
//          alert('Login fail');
//      }
// }
// }

function addToCart() {
    alert("Added to cart !");
}

function checkOut() {
    localStorage.clear()
}
// ################ TEST FETCH FUNCTION ################




// when page loads, this will run and check it
onLoadCartNumbers();
displayCart();