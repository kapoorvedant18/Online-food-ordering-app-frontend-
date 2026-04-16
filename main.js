let cart = [];
let order = [];
let users = [];
let currentUserIndex = null;
let currentController = null; 

let initialization = function() {
    users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users); 
    currentUserIndex = JSON.parse(localStorage.getItem("currentuserindex"));
    console.log(currentUserIndex);
    fetch('https://dummyjson.com/recipes').
        then(response => response.json()).then(data => {
            data.recipes.forEach(items => {
                let item = document.createElement("p");
                item.innerHTML = items.name;
                let image = document.createElement("img");
                image.src = items.image
                image.style.width = "200px";
                let price = document.createElement("p");
                price.innerHTML = "10 $";
                let rating = document.createElement("p");
                rating.innerHTML = "Rating : " + items.rating;
                let reviews = document.createElement("p");
                reviews.innerHTML = "Reviews : " + items.reviewCount;
                let tags = document.createElement("p");
                tags.innerHTML = "Tags : " + items.tags.join(", ");
                let addContainer = document.createElement("div");
                addContainer.id = items.id;
                let addButton = document.createElement("button");
                addButton.innerHTML = "Add to Cart";
                addButton.id = "addbutton" + items.id;
                addButton.onclick = ()=> {addToCart(items.id,true)};
                addContainer.appendChild(addButton);
                let itemContainer = document.createElement("div");
                itemContainer.id = "itemcontainer"; 
                itemContainer.appendChild(image);
                itemContainer.appendChild(item);
                itemContainer.appendChild(price);
                itemContainer.appendChild(rating);
                itemContainer.appendChild(reviews);
                itemContainer.appendChild(tags);
                itemContainer.appendChild(addContainer);
                itemContainer.style.display = "flex";
                document.getElementById("menu").appendChild(itemContainer);
                try{
                    if (users[currentUserIndex].cart.find((cartitem) => cartitem.itemid === items.id)) {
                    addToCart(items.id,false);
                    }
                }catch{
                    console.log("No user logged in");
            }
                // console.log(cart.find((cartitem) => cartitem.itemid === items.id));
        })
    }).
    catch(error => {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
    });

}

function addToCart(id,push) {
    document.getElementById("addbutton"+id).style.display = "none";
    if (push === true) {
    users[currentUserIndex].cart.push({itemid : id, quantity : 1,price : 10});
    console.log(users[currentUserIndex]);
    //localStorage.setItem("", JSON.stringify(cart));
    }
    let addcounter = document.createElement("p");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    plus.innerHTML = "+";
    minus.innerHTML = "-";
    addcounter.innerHTML = users[currentUserIndex].cart.find((cartitem) => cartitem.itemid === id).quantity;
    document.getElementById(id).appendChild(plus);
    document.getElementById(id).appendChild(addcounter);
    document.getElementById(id).appendChild(minus);
    document.getElementById(id).style.display = "inline-block";
    plus.onclick = () => {
        let item = users[currentUserIndex].cart.findIndex((item) => item.itemid === id);
        users[currentUserIndex].cart[item].quantity++;
        addcounter.innerHTML = users[currentUserIndex].cart[item].quantity;
        localStorage.setItem("users", JSON.stringify(users));
        console.log(users[currentUserIndex]);
    }
    minus.onclick = () => {
        let item = users[currentUserIndex].cart.findIndex((item) => item.itemid === id);
        if (users[currentUserIndex].cart[item].quantity > 0) {
            users[currentUserIndex].cart[item].quantity--;
            addcounter.innerHTML = users[currentUserIndex].cart[item].quantity;
            localStorage.setItem("users", JSON.stringify(users));
            console.log(users[currentUserIndex]);
        }
        if (users[currentUserIndex].cart[item].quantity === 0) {
            plus.style.display = "none";
            minus.style.display = "none";
            addcounter.style.display = "none";
            document.getElementById("addbutton"+id).style.display = "";
            users[currentUserIndex].cart.splice(item, 1);
            localStorage.setItem("users", JSON.stringify(users));
            console.log(users[currentUserIndex]);
        }
    }
}
 

function searchItems() {
    let searchquery = document.getElementById("search").value;

      if (currentController) currentController.abort();
    currentController = new AbortController();
    
    if (searchquery != "") {
    document.getElementById("menu").innerHTML = "";
    fetch('https://dummyjson.com/recipes/search?q='+searchquery , { signal: currentController.signal }).
    then(response => response.json()).then(data => {
        data.recipes.forEach(items => {
             let item = document.createElement("p");
            item.innerHTML = items.name;
            let image = document.createElement("img");
            image.src = items.image
            image.style.width = "200px";
            let price = document.createElement("p");
            price.innerHTML = "10 $";
                let rating = document.createElement("p");
                rating.innerHTML = "Rating : " + items.rating;
                let reviews = document.createElement("p");
                reviews.innerHTML = "Reviews : " + items.reviewCount;
                let tags = document.createElement("p");
                tags.innerHTML = "Tags : " + items.tags.join(", ");
             let addContainer = document.createElement("div");
                addContainer.id = items.id;
                let addButton = document.createElement("button");
                addButton.innerHTML = "Add to Cart";
                addButton.id = "addbutton" + items.id;
                addButton.onclick = ()=> {addToCart(items.id,true)};
                addContainer.appendChild(addButton);
                let itemContainer2 = document.createElement("div");
                itemContainer2.id = "itemcontainer2"; 
                itemContainer2.appendChild(image);
                itemContainer2.appendChild(item);
                itemContainer2.appendChild(price);
                itemContainer2.appendChild(rating);
                itemContainer2.appendChild(reviews);
                itemContainer2.appendChild(tags);
                itemContainer2.appendChild(addContainer);
                itemContainer2.style.display = "flex";
                document.getElementById("menu").appendChild(itemContainer2);
                if (users[currentUserIndex].cart.find((cartitem) => cartitem.itemid === items.id)) {
                    addToCart(items.id,false);
                }
    })
})

    }else{
        document.getElementById("menu").innerHTML = "";
        initialization();
    }
}

function showCart() {
    users = JSON.parse(localStorage.getItem("users")) || [];
    currentUserIndex = JSON.parse(localStorage.getItem("currentuserindex"));
    //let cart1 = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    users[currentUserIndex].cart.forEach(items => {
        total += items.price * items.quantity;
        fetch('https://dummyjson.com/recipes/'+items.itemid).then(response => response.json()).
        then(cartitem=>{
                let item = document.createElement("p");
                item.innerHTML = cartitem.name;
                let image = document.createElement("img");
                image.src = cartitem.image
                image.style.width = "200px";
                let price = document.createElement("p");
                price.innerHTML = "10 $";
                let tags = document.createElement("p");
                tags.innerHTML = "Tags : " + cartitem.tags.join(", ");
                let quantity = document.createElement("p");
                let plus = document.createElement("button");
                let minus = document.createElement("button");
                plus.innerHTML = "+";
                plus.onclick = () => {
                    items.quantity++;
                    quantity.innerHTML = items.quantity;
                    total += items.price;
                    total_price.innerHTML = "Cart total :" + total + " $";
                    taxes.innerHTML = "Taxes : " + total*0.01 + " $";
                    platfrom_fee.innerHTML = "Platform fee : " + total*0.01 + " $";
                    final_price.innerHTML = "total Price : " + (total + total*0.02) + " $";
                    localStorage.setItem("users", JSON.stringify(users));
                    console.log(users[currentUserIndex]);
                }
                minus.innerHTML = "-";
                minus.onclick= () => {
                    if (items.quantity >= 1) {
                        items.quantity--;
                        if (items.quantity === 0) {
                        const removeelement = document.getElementById("cartitems"+items.itemid);
                        removeelement.remove(); 
                        total -= items.price;
                        total_price.innerHTML = "Cart total :" + total + " $";
                        taxes.innerHTML = "Taxes : " + total*0.01 + " $";
                        platfrom_fee.innerHTML = "Platform fee : " + total*0.01 + " $";
                        final_price.innerHTML = "total Price : " + (total + total*0.02) + " $";    
                        users[currentUserIndex].cart.splice(items, 1);
                        localStorage.setItem("users", JSON.stringify(users));
                        console.log(users[currentUserIndex]);
                        } else {
                        quantity.innerHTML = items.quantity;
                        total -= items.price;
                        total_price.innerHTML = "Cart total :" + total + " $";
                        taxes.innerHTML = "Taxes : " + total*0.01 + " $";
                        platfrom_fee.innerHTML = "Platform fee : " + total*0.01 + " $";
                        final_price.innerHTML = "total Price : " + (total + total*0.02) + " $";
                        localStorage.setItem("users", JSON.stringify(users));
                        console.log(users[currentUserIndex]);
                    }
                }
            }
                quantity.innerHTML =  items.quantity;
                let cartitemstatus = document.createElement("div");
                cartitemstatus.id = "cartitemstatus";
                cartitemstatus.appendChild(plus);
                cartitemstatus.appendChild(quantity);
                cartitemstatus.appendChild(minus);
                let cartitems = document.createElement("div");
                cartitems.id = "cartitems"+items.itemid;
                cartitems.style.display = "flex";
                cartitems.appendChild(image);
                cartitems.appendChild(item);
                cartitems.appendChild(price);
                cartitems.appendChild(tags);
                cartitems.appendChild(cartitemstatus);
                document.getElementById("cart_items").appendChild(cartitems); 
        })
    })
    let total_price = document.createElement("p");
    total_price.innerHTML = "Cart total :" + total + " $";
    let taxes = document.createElement("p");
    taxes.innerHTML = "Taxes : " + total*0.01 + " $";
    let platfrom_fee = document.createElement("p");
    platfrom_fee.innerHTML = "Platform fee : " + total*0.01 + " $";
    let final_price = document.createElement("p");
    final_price.innerHTML = "total Price : " + (total + total*0.02) + " $";
    let checkout = document.createElement("button");
    checkout.innerHTML = "Place your order";
    checkout.onclick = () => {
        users[currentUserIndex].orders.push({items : users[currentUserIndex].cart, total : total + total*0.02});
        console.log(users[currentUserIndex]);
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("success-message").style.display = "";
        setTimeout(() => {document.getElementById("success-message").style.display = "none";}, 3000);
        users[currentUserIndex].cart = [];
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("cart_items").innerHTML = "";
        document.getElementById("cart_ui").innerHTML = "";
        showCart();
    }
    cart_ui.appendChild(total_price);
    cart_ui.appendChild(taxes);
    cart_ui.appendChild(platfrom_fee);
    cart_ui.appendChild(final_price);
    cart_ui.appendChild(checkout);
}

function showOrders() {
    // let order = JSON.parse(localStorage.getItem("orders")) || [];
    users = JSON.parse(localStorage.getItem("users")) || [];
    currentUserIndex = JSON.parse(localStorage.getItem("currentuserindex"));

    users[currentUserIndex].orders.forEach((order)=>{
        let orderimage = document.createElement("img")
        orderimage.src = "order.png";
        let orderitems = document.createElement("div");
        order.items.forEach((item)=>{
            let itemname = document.createElement("p");
            fetch('https://dummyjson.com/recipes/'+item.itemid).then(response => response.json()).then(data => {
                itemname.innerHTML = item.quantity + " x " + data.name;
            });
            orderitems.appendChild(itemname);
        })
        let ordertotal = document.createElement("p");
        ordertotal.innerHTML = "Total : " + order.total + " $";
        let ordercontainer = document.createElement("div");
        ordercontainer.appendChild(orderimage);
        ordercontainer.appendChild(orderitems);
        ordercontainer.appendChild(ordertotal);
        ordercontainer.style.display = "flex";
        ordercontainer.style.border = "2pt solid black";
        document.getElementById("orders").appendChild(ordercontainer);
        ordercontainer.onclick = () => {
            orders.innerHTML = "";
            let backbutton = document.createElement("button");
            backbutton.innerHTML = "Back to orders";
            backbutton.onclick = () => {
                document.getElementById("orders").innerHTML = "";
                document.getElementById("orders_ui").innerHTML = "";
                showOrders();
            }
        document.getElementById("orders").appendChild(backbutton);
            order.items.forEach((item)=>{
                fetch('https://dummyjson.com/recipes/'+item.itemid).then(response => response.json()).then(data => {
                    let itemimgae = document.createElement("img");
                    let itemname  = document.createElement("p");
                    let itemprice = document.createElement("p");
                    let itemrating = document.createElement("p");
                    let itemtag = document.createElement("p");
                    let itemreview = document.createElement("p");
                    itemimgae.src = data.image;
                    itemimgae.style.width = "200px";
                    itemname.innerHTML = data.name;
                    itemprice.innerHTML = "Price : "+ item.price + " $";
                    itemrating.innerHTML = "Rating : " + data.rating;
                    itemtag.innerHTML = "Tags : " + data.tags.join(", ");
                    itemreview.innerHTML = "Reviews : " + data.reviewCount;
                    let itemcontainer = document.createElement("div");
                    itemcontainer.style.display = "flex";
                    itemcontainer.appendChild(itemimgae);
                    itemcontainer.appendChild(itemname);
                    itemcontainer.appendChild(itemprice);
                    itemcontainer.appendChild(itemrating);
                    itemcontainer.appendChild(itemtag);
                    itemcontainer.appendChild(itemreview);
                    document.getElementById("orders").appendChild(itemcontainer);
                })
            })
            let total_price = document.createElement("p");
                total_price.innerHTML = "Items total :" + Math.floor(order.total) + " $";
                let taxes = document.createElement("p");
                taxes.innerHTML = "Taxes : " + Math.floor(order.total)*0.01 + " $";
                let platfrom_fee = document.createElement("p");
                platfrom_fee.innerHTML = "Platform fee : " + Math.floor(order.total)*0.01 + " $";
                let final_price = document.createElement("p");
                final_price.innerHTML = "Total Order Price : " + order.total + " $";
                document.getElementById("orders_ui").appendChild(total_price);
                document.getElementById("orders_ui").appendChild(taxes);
                document.getElementById("orders_ui").appendChild(platfrom_fee);
                document.getElementById("orders_ui").appendChild(final_price);
        }
    })
}

function logout(){
    window.location = "login_page.html";
    currentUserIndex = null;
    localStorage.setItem("currentuserindex", JSON.stringify(currentUserIndex));
    
}

function register(){
    users = JSON.parse(localStorage.getItem("users")) || [];
   let useremail = document.getElementById("email").value;
   let userpassword = document.getElementById("password").value;
    if (users.length === 0){
        users.push({userid : 1, email : useremail, password : userpassword ,cart : [], orders : []});
        currentUserIndex = 0;
        localStorage.setItem("currentuserindex", JSON.stringify(currentUserIndex));
        localStorage.setItem("users", JSON.stringify(users));
    }
    else {
        users.push({userid :users.length+1,email : useremail, password : userpassword ,cart : [], orders : []});
        currentUserIndex = users.length-1;
        localStorage.setItem("currentuserindex", JSON.stringify(currentUserIndex));
        localStorage.setItem("users", JSON.stringify(users));
    }

    let registration_sucess_message = document.createElement("p");
    registration_sucess_message.innerHTML = "Registration successful!";
    document.getElementsByTagName("body")[0].appendChild(registration_sucess_message);

    window.location = "dashboard.html";

}

function login(){
    users = JSON.parse(localStorage.getItem("users")) || [];
    const element = document.getElementsByTagName("p")[0];
    element.remove();

    let useremail = document.getElementById("email").value;
    let userpassword = document.getElementById("password").value;

    if (users.find((user)=> user.email === useremail && user.password === userpassword)) {
        currentUserIndex = users.findIndex((user)=> user.email === useremail && user.password === userpassword);
        localStorage.setItem("currentuserindex", JSON.stringify(currentUserIndex));
        let login_sucess_message = document.getElementsByTagName("p")[0].innerHTML = "Login successful!";
        window.location = "dashboard.html";
    }
    else {
        document.getElementsByTagName("p")[0].innerHTML = "Invalid email or password. Please try again.";
    }
    


}