let cart = [];

let initialization = function() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
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
                if (cart.find((cartitem) => cartitem.itemid === items.id)) {
                    addToCart(items.id,false);
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
    cart.push({itemid : id, quantity : 1,price : 10});
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    }
    let addcounter = document.createElement("p");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    plus.innerHTML = "+";
    minus.innerHTML = "-";
    addcounter.innerHTML = cart.find((cartitem) => cartitem.itemid === id).quantity;
    document.getElementById(id).appendChild(plus);
    document.getElementById(id).appendChild(addcounter);
    document.getElementById(id).appendChild(minus);
    document.getElementById(id).style.display = "inline-block";
    plus.onclick = () => {
        let item = cart.findIndex((item) => item.itemid === id);
        cart[item].quantity++;
        addcounter.innerHTML = cart[item].quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    }
    minus.onclick = () => {
        let item = cart.findIndex((item) => item.itemid === id);
        if (cart[item].quantity > 0) {
            cart[item].quantity--;
            addcounter.innerHTML = cart[item].quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart);
        }
        if (cart[item].quantity === 0) {
            plus.style.display = "none";
            minus.style.display = "none";
            addcounter.style.display = "none";
            document.getElementById("addbutton"+id).style.display = "";
            cart.splice(item, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart);
        }
    }
}

let currentController = null;  

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
                addButton.onclick = ()=> {addToCart(items.id)};
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
    })
})

    }else{
        document.getElementById("menu").innerHTML = "";
        initialization();
    }
}

function showCart() {
    let cart1 = JSON.parse(localStorage.getItem("cart")) || [];

    cart1.forEach(items => {
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
                    localStorage.setItem("cart", JSON.stringify(cart1));
                    console.log(cart1);
                }
                minus.innerHTML = "-";
                minus.onclick= () => {
                    if (items.quantity >= 1) {
                        items.quantity--;
                        quantity.innerHTML = items.quantity;
                        localStorage.setItem("cart", JSON.stringify(cart1));
                        console.log(cart1);
                    }
                    if (items.quantity === 0) {
                        const removeelement = document.getElementById("cartitems"+items.itemid);
                        removeelement.remove();     
                        cart1.splice(items, 1);
                        localStorage.setItem("cart", JSON.stringify(cart1));
                        console.log(cart1);
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

}