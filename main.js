let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total")
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchT = document.getElementById("searchTitle");
let searchC = document.getElementById("searchCategory");
let btnDA = document.getElementById("deleteAll");
let back = document.getElementById("back");

let mood = "create";
let tmp;

let searchMood = "title";




function getTotal(){
    if (price.value != "" & price.value>0 ){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = `${result}`;
        total.style.backgroundColor = "#19d300"
    }else{
        total.innerHTML = "";
        total.style.backgroundColor = "#ff3939"
    };
};

let dataPro;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
};

create.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };{
    if ( mood === "create" ){
        if(title.value != "" && price.value != "" && count.value != "" && newPro.count < 100 && category.value != ""){
            if(newPro.count > 1){
                for (let c=0;c < newPro.count; c++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }
    }else{
        dataPro[tmp] = newPro;
        count.style.display = "block";
        search.style.display = "none";
        searchT.style.display = "block";
        searchC.style.display = "block";
        btnDA.style.display = "block";
        create.innerHTML = "Create";
        mood = "create";
    }

    localStorage.setItem("product",JSON.stringify(dataPro));
    clearData();
    showPro();
    }
    
};

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
};

function showPro(){
    getTotal()
    let table = "";
    for(let i=0;i<dataPro.length;i++){
        table += `  <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}$</td>
                    <td>${dataPro[i].taxes}$</td>
                    <td>${dataPro[i].ads}$</td>
                    <td>${dataPro[i].discount}$</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button class="update" onclick="udpateData(${i})" " id="update">update</button></td>
                    <td><button class="delete" onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
    };

    document.getElementById("tbody").innerHTML = table;
    if (dataPro.length > 0){
        btnDA.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    }else{
        btnDA.innerHTML = ""
    }
}

showPro();

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showPro();
};

function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    showPro();
};

function udpateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = "none";
    search.style.display = "none";
    searchT.style.display = "none";
    searchC.style.display = "none";
    btnDA.style.display = "none";
    create.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
};

function searchBy(id){
    if (id == "searchTitle"){
        searchMood = "title";
    }else{
        searchMood = "category";
    }
    search.placeholder = "Search by "+ searchMood;
    search.style.display = "block";
    back.style.display = "block";
    title.style.display = "none";
    price.style.display = "none";
    taxes.style.display = "none";
    ads.style.display = "none";
    discount.style.display = "none";
    total.style.display = "none";
    count.style.display = "none";
    category.style.display = "none";
    create.style.display = "none";
    btnDA.style.display = "none";
    search.value = "";
    showPro();
};

function backTo(){
    search.style.display = "none";
    back.style.display = "none";
    title.style.display = "block";
    price.style.display = "inline";
    taxes.style.display = "inline";
    ads.style.display = "inline";
    discount.style.display = "inline";
    total.style.display = "inline";
    count.style.display = "block";
    category.style.display = "block";
    create.style.display = "block";
    btnDA.style.display = "block";
}

function searchData(value){
    let table = "";

    for ( let i=0 ; i < dataPro.length ; i++ ){
        if (searchMood == "title"){
            if (dataPro[i].title.includes(value.toLowerCase())){
                table += `  <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}$</td>
                            <td>${dataPro[i].taxes}$</td>
                            <td>${dataPro[i].ads}$</td>
                            <td>${dataPro[i].discount}$</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button class="update" onclick="udpateData(${i})" " id="update">update</button></td>
                            <td><button class="delete" onclick="deleteData(${i})" id="delete">delete</button></td>
                            </tr>`
            };
        }else{
            if (dataPro[i].category.includes(value.toLowerCase())){
                table += `  <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}$</td>
                            <td>${dataPro[i].taxes}$</td>
                            <td>${dataPro[i].ads}$</td>
                            <td>${dataPro[i].discount}$</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button class="update" onclick="udpateData(${i})" " id="update">update</button></td>
                            <td><button class="delete" onclick="deleteData(${i})" id="delete">delete</button></td>
                            </tr>`
            };
        };
    };

    document.getElementById("tbody").innerHTML = table;
};