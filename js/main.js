
const p=fetch('http://localhost:3000/products');
const product=$("#product-list");
let products=[];
let cart=[];
p.then((response)=>{
	if(response.ok){
		return response.json();
	}else{
		throw Error(response.status);
	}
})
.then(data => {
	products=data;
	renderProduct(products);
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

}



function addToCart(itemId,cart){
	 
	 
	 const addedProduct = products.filter(product => product.id == itemId)[0];
	 const productInCart = cart.find(item => item.id == itemId);

	 if (productInCart) {
		return cart.map(item =>
		  item.id == itemId ? {...item, quantity: item.quantity + 1} : item
		);
	  }

	  return [...cart, {...addedProduct, quantity: 1}];
		 
	 }
	
	
function removeFromCart(itemId,cart){
	 
		
	const productInCart = cart.find(item => item.id == itemId);

    if (productInCart.quantity === 1) {
      return cart.filter(item => item.id != itemId);
    } else {
    return cart.map(item =>
      item.id == itemId ? {...item, quantity: item.quantity - 1} : item
    );
      }
		}
	   


function saveProductsToLocalStrorage(cart){

  localStorage.setItem("cart",JSON.stringify(cart));

}

function getFromLocalStorage(){
	if(localStorage.getItem("cart")){
		return JSON.parse(localStorage.getItem("cart"));
	}
	else{
		return [];
	}
	
}
cart=getFromLocalStorage();

function renderModal(cart){
	const cardLists=$("#cart-list");
	console.log(cart.length)
	if (cart.length===0){
		cardLists.html("سبد خرید خالی است");
		return;
	}
	const shoppingItem=cart.map(json=>{
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

cardLists.html(shoppingItem);

}


document.addEventListener("click",function(e){

  if(e.target && e.target.classList.contains('inc-quantity')) {
	let itemId=e.target.getAttribute('data-product-id');
	cart=addToCart(itemId,cart);
	saveProductsToLocalStrorage(cart);
	renderModal(cart);
	
  }
  else if(e.target && e.target.classList.contains('dec-quantity')){
	let itemId=e.target.getAttribute('data-product-id');
	cart=removeFromCart(itemId,cart);
	saveProductsToLocalStrorage(cart);
	renderModal(cart);
	
  }else if(e.target && e.target.classList.contains('add-to-cart')){
	let itemId=e.target.getAttribute('data-product-id');
	cart=addToCart(itemId,cart);
    saveProductsToLocalStrorage(cart);
	renderModal(cart);
	
  }
})

let brandFilter = [];

const brandCheckboxes = document.getElementsByClassName('brand-select');

for (let i = 0; i < brandCheckboxes.length; i++) {
  brandCheckboxes[i].addEventListener('change', e => {
    const brandName = e.target.getAttribute('data-brand-name');

    if (e.target.checked) {
      brandFilter = [...brandFilter, brandName];

      renderProduct(
        products.filter(product => brandFilter.includes(product.brand))
      );
    } else {
      brandFilter = brandFilter.filter(b => b !== brandName);

      if (brandFilter.length === 0) {
        renderProduct(products);
      } else {
        renderProduct(
          products.filter(product => brandFilter.includes(product.brand))
        );
      }
    }
  });
}
