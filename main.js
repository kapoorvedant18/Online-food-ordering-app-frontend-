let i = 0;
let cart = [];

let initialization = function() {
    fetch('https://dummyjson.com/recipes').
        then(response => response.json()).then(data => {
            data.recipes.forEach(items => {
                let item = document.createElement("p");
                item.innerHTML = items.name;
                let image = document.createElement("img");
                image.src = items.image
                image.style.width = "200px";
                let addContainer = document.createElement("div");
                addContainer.id ="add button" + i;
                let addButton = document.createElement("button");
                addButton.innerHTML = "Add to Cart";
                addButton.onclick = ()=> {addToCart(items,i)};
                addContainer.appendChild(addButton);
                let itemContainer = document.createElement("div"); 
                itemContainer.appendChild(image);
                itemContainer.appendChild(item);
                itemContainer.appendChild(addContainer);
                itemContainer.style.display = "flex";
                document.getElementById("menu").appendChild(itemContainer);
                i++;
        })
    })  
}

function addToCart(items,x) {
    document.getElementsByTagName("button")[x].style.display = "none";
    let addcounter = document.createElement("p");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    plus.innerHTML = "+";
    minus.innerHTML = "-";
    addcounter.innerHTML = "1";
    // document.getElementById("add button" + i).appendChild(plus);
    // document.getElementById("add button" + i).appendChild(addcounter);
    // document.getElementById("add button" + i).appendChild(minus);
    cart.push(x);
    console.log(cart);
}