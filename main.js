let initialization = function() {
    fetch('https://dummyjson.com/recipes').
        then(response => response.json()).then(data => {
            data.recipes.forEach(items => {
                let item = document.createElement("p");
                item.innerHTML = items.name;
                let image = document.createElement("img");
                document.getElementById("menu").appendChild(item);
        })
    })  
}