var nameInput = document.getElementById("productName");
var categoryInput = document.getElementById("productCategory");
var priceInput = document.getElementById("productPrice");
var descriptionInput = document.getElementById("productDescription");
var tBody = document.getElementById("tBody");
var searchInput = document.getElementById("searchInput");


if(localStorage.getItem("productData")==null) {
  var productList =[];
}
else {
  var productList = JSON.parse(localStorage.getItem("productData"));
}

console.log(productList);

function addProduct() {
  var productValue = {
    nameValue: nameInput.value ,
    categoryValue: categoryInput.value ,
    priceValue: Number( priceInput.value ) ,
    descriptionValue: descriptionInput.value ,
  }

  productList.push(productValue);

  var strList = JSON.stringify(productList);

  localStorage.setItem( "productData" , strList);



  displayProduct();
  clearProduct();
}

displayProduct();

function clearProduct() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
}

function displayProduct() {
  var str = "" ;
  for(var i =0 ; i < productList.length ; i++) {
    str += `<tr id="tr${i}">
    <td>${i}</td>
    <td>${productList[i].nameValue}</td>
    <td>${productList[i].categoryValue}</td>
    <td>${productList[i].priceValue}</td>
    <td>${productList[i].descriptionValue}</td>
    <td><button onclick="updateProduct(${i})" class="btn btn-outline-success">Update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`
  };
  tBody.innerHTML = str;
}

function searchProduct() {
  var str = "";
  for(var i = 0 ; i < productList.length ; i++) {
    if(productList[i].nameValue.includes(searchInput.value)) {
      str += `<tr>
      <td>${i}</td>
      <td>${productList[i].nameValue}</td>
      <td>${productList[i].categoryValue}</td>
      <td>${productList[i].priceValue}</td>
      <td>${productList[i].descriptionValue}</td>
      <td><button onclick="updateProduct(${i})" class="btn btn-outline-success">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
      </tr>`
    };
    
    tBody.innerHTML = str;
  }
}

var newIndexUpdate ;

function updateProduct(index) {
  nameInput.value = productList[index].nameValue;
  categoryInput.value = productList[index].categoryValue;
  priceInput.value = productList[index].priceValue;
  descriptionInput.value = productList[index].descriptionValue;

  window.scrollTo(0,0);

  document.getElementById("btnMain").setAttribute( "onClick", "afterUpdateProduct()");
  document.getElementById("btnMain").innerHTML = "Update";

  var indexUpdate = index ;
  newIndexUpdate = indexUpdate ;
}

function afterUpdateProduct(){
  var newProductValue = {
    nameValue: nameInput.value ,
    categoryValue: categoryInput.value ,
    priceValue: Number( priceInput.value ) ,
    descriptionValue: descriptionInput.value ,
  }

  productList.splice(newIndexUpdate,1 ,newProductValue);

  var strList = JSON.stringify(productList);
  localStorage.setItem('productData', strList);

  displayProduct();

  document.getElementById("btnMain").setAttribute( "onClick", "addProduct()");
  document.getElementById("btnMain").innerHTML="Add Product";
  clearProduct();
}


function deleteProduct(index) {
  productList.splice(index,1);

  var strList = JSON.stringify(productList);

  localStorage.setItem( "productData" , strList);

  displayProduct();

}