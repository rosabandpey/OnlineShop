
const p=fetch('http://localhost:3000/products');
const product=$("#product-list");
let shoppingArray=[];
let myShoppingArray=[];
let status=false;
var allShoppingcardArray=[{product:{productValue:[],quantity:0}}];
let quantity=0;
let products=[];
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




function renderProduct(products){
	const questionHtml=products.map(json=>{
		
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
	ShoppingCard(products);
}


//Implementing Shopping Card

function ShoppingCard(products){


function addToCart(itemId,products){
	 
	 
	 const addedProduct = products.filter(product => product.id == itemId)[0];
	 const productInCart = shoppingArray.find(item => item.id == itemId);

	 if (productInCart) {
		return shoppingArray.map(item =>
		  item.id == itemId ? {...item, quantity: item.quantity + 1} : item
		);
	  }

	  return [...shoppingArray, {...addedProduct, quantity: 1}];
		 
	 }
	
	
function removeFromCart(itemId,products){
	 
		const addedProduct = products.filter(product => product.id == itemId)[0];
		const productInCart = shoppingArray.find(item => item.id == itemId);
   
		if (productInCart) {
		   return shoppingArray.map(item =>
			 item.id == itemId ? {...item, quantity: item.quantity -1 } : item
		   );
		 }
   
		 return [...shoppingArray, {...addedProduct, quantity: 1}];
		   
			
		}
	   


function saveProductsToLocalStrorage(shoppingArr){

	
	console.log(shoppingArr)
}

function renderModal(products){
	const shoppingItem=products.map(json=>{
		return `
<div class="list-group-item d-flex justify-content-between align-items-center cart-item">
<span>${json.title}</span>
<div>
<button class="btn inc-quantity" data-product-id=${json.id}>+</button>
<span>${json.quantity}</span>
<button class="btn dec-quantity" data-product-id=${json.id}>-</button>
</div>
</div>
`;
});
const cardLists=$("#cart-list");
//console.log(cardLists)
cardLists.html(shoppingItem);

}





document.addEventListener("click",function(e){

  if(e.target && e.target.classList.contains('inc-quantity')) {
	let itemId=e.target.getAttribute('data-product-id');
	shoppingArray=addToCart(itemId,products);
	saveProductsToLocalStrorage(shoppingArray);
	renderModal(shoppingArray);
  }
  else if(e.target && e.target.classList.contains('dec-quantity')){
	let itemId=e.target.getAttribute('data-product-id');
	shoppingArray=removeFromCart(itemId,products);
	saveProductsToLocalStrorage(shoppingArray);
	renderModal(shoppingArray);
  }else if(e.target && e.target.classList.contains('add-to-cart')){
	let itemId=e.target.getAttribute('data-product-id');
	shoppingArray=addToCart(itemId,products);
    saveProductsToLocalStrorage(shoppingArray);
	renderModal(shoppingArray);
  }
})

}
