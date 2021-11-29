$(document).ready(function() {
const p=fetch('http://localhost:3000/products');
const product=$("#product-list");
let shoppingArray=[{
	productValue:[],
	quantity:0
}];
var allShoppingcardArray=[{product:{productValue:[],quantity:0}}];
let quantity=0;
p.then((response)=>{
	if(response.ok){
		return response.json();
	}else{
		throw Error(response.status);
	}
})
.then(data => {
	renderProduct(data);
})
.catch((error) => console.log(error));




function renderProduct(myArray){
	const questionHtml=myArray.map(json=>{
		
		return `
		<div class="product col-lg-4 col-md-6 mb-4">
				<div class="card h-100">
					<a href="#"
						><img
							class="card-img-top"
							src=${json.image}
							alt=${json.title}
					/></a>
					<div class="card-body">
						<h4 class="card-title">
						${json.title}
						</h4>
						<h5 class="product-price"> ${ new Intl.NumberFormat( { maximumSignificantDigits: 3 }).format(json.price)}  تومان</h5>
						<p class="card-text">
						   ${json.description}
						</p>
					</div>
					<div class="card-footer">
						<button class="btn btn-light add-to-cart" data-product-id=${json.id}>
							افزودن به سبد خرید
						</button>
					</div>
				</div>
			</div>
		`;
		
	});

	product.html(questionHtml.join(""));
	ShoppingCard(myArray);
}


//Implementing Shopping Card

function ShoppingCard(myArray){

$("button.add-to-cart").click(function(event) {
	let itemId=event.target.getAttribute('data-product-id');
	returnProductByItemId(itemId,myArray);
    saveProductsToLocalStrorage(shoppingArray);
	renderModal(shoppingArray);
	console.log(itemId);
	  });

}


function returnProductByItemId(itemId,myArray){

	 let myShoppingArray=myArray.find(json=>(json.id==itemId));
	 shoppingArray.push(myShoppingArray);
	 return shoppingArray;
}

function saveProductsToLocalStrorage(shoppingArr){
	
	console.log(shoppingArr);
}

function renderModal(myArray){
	const shoppingItem=myArray.map(json=>{
		return `
<div class="list-group-item d-flex justify-content-between align-items-center cart-item">
<span>${json.title}</span>
<div>
<button class="btn inc-quantity" data-product-id=${json.id}>+</button>
<span>تعداد محصول برای خرید</span>
<button class="btn dec-quantity" data-product-id=${json.id}>-</button>
</div>
</div>
`;
});
const cardLists=$("#cart-list");
//console.log(cardLists)
cardLists.html(shoppingItem);

}

});



