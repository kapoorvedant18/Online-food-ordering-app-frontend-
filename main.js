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
                addContainer.id = i;
                let addButton = document.createElement("button");
                addButton.innerHTML = "Add to Cart";
                let id = i;
                addButton.id = "addbutton" + id;
                addButton.onclick = ()=> {addToCart(items,id)};
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

function addToCart(items,id) {
    document.getElementById("addbutton"+id).style.display = "none";
    let addcounter = document.createElement("p");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    plus.innerHTML = "+";
    minus.innerHTML = "-";
    addcounter.innerHTML = "1";
    document.getElementById(id).appendChild(plus);
    document.getElementById(id).appendChild(addcounter);
    document.getElementById(id).appendChild(minus);
    document.getElementById(id).style.display = "inline-block";
    cart.push(id);
    console.log(cart);
}