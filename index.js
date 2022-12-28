import {menuArray} from './data.js'
const addItems = document.getElementById('addBtn')
const inputFields = document.getElementById('inputFields')
let orderCompleted = document.getElementById('orderCompleted')
let orderList = []



document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleCheckoutClick(e.target.dataset.add)
        showOrder(e.target.dataset.add)
        
    } else if (e.target.dataset.del){
        deleteOrder(e.target.dataset.del)
    } else if (e.target.id === 'complete-order'){
        showPaymentDetails()
    } else if (e.target.id === 'modal-close-btn'){
        modal.style.display = 'none'
    } else if (e.target.id === 'pay-btn'){
        modal.style.display = 'none'
        document.getElementById('orderFeed').classList.add('hidden')
        completeOrder()
        
    }
    
    
})

inputFields.addEventListener('submit', function (e){
    e.preventDefault()
    
    const inputFieldsData = new FormData(inputFields)
    const fullName = inputFieldsData.get('fullName')
    let name = document.getElementById(`fullName`).value;
    
    orderCompleted.innerHTML = `
    <div class="completed-container" id="completed-container">
           <h2> Thanks, ${fullName}! Your order is on its way.</h2>
            </div>
    `
    
})




function getMenu(){
    
    let menuFeed = ``
    
    menuArray.forEach(function(menu){
        
        menuFeed += `
     
        <div class="menu-container" id="menu-container">
            <div class="container" id="container">
                <div class="emoji"><p>${menu.emoji}</p></div>
                    <div class="item-description">
                        <h2> ${menu.name} </h2>
                        <p> ${menu.ingredients} </p>
                        <h4> $${menu.price}</h4> 
                    </div>
                    <button class="eclipse" id="addBtn" data-add="${menu.id}">+</button>  
            </div>  
        </div> 
        
        
        `
    })
    
    return menuFeed
}

function renderFeed(){
   document.getElementById('menuFeed').innerHTML = getMenu()
}

renderFeed()


function handleCheckoutClick(foodId){
    
    const targetMenuObj = menuArray.filter(function(menu){
        return menu.id == foodId
    })[0]
        orderList.push(targetMenuObj)
        renderOrder()
        }
        
        
function showOrder(){
     
    if(orderList.length > 0){
        document.getElementById('orderFeed').classList.remove('hidden')
    }
    
}




function deleteOrder(orderId){
    getOrder()
    
    const targetOrderObj = orderList.filter(function(order){
        return order.id == orderId
    })[0]
    
    delete orderList[targetOrderObj.id]
    renderOrder()
}



function getOrder(){
    let totalPrice = 0       
    let orderHtml = `<h2> Your order </h2>`
   
    
  
    
    orderList.forEach(function(order){
            orderHtml+= `
           
            <div class="order-list"> 
                <div class="checkout-order" id="checkout-order">
                <span class="order">
                <h3> ${order.name} </h3>
                <p class="remove-item" data-del="${order.id}"> remove </p>
                </span>
                <h4> ${order.price} </h4>
                </div>
                </div>
            
            
             
        
           `
           totalPrice += order.price
        
    }) 
    
     
    
    orderHtml += `
    <div class="price-line" id="price-line"></div>
    <div class="total-price" id="total-price">
                <h3> Total Price </h3>
                <h4> ${totalPrice}</h4>
            </div>
    <button class="complete-order" id="complete-order"> Complete Order </button>
    
    `
    return orderHtml
    
}


function showPaymentDetails(){
    modal.style.display = "inline"
}


function completeOrder(){
    
    document.getElementById('orderCompleted').classList.remove('hidden')
}

function renderOrder(){
    document.getElementById('orderFeed').innerHTML = getOrder()
}

// function renderCompleted(){
//     document.getElementById('orderCompleted').innerHTML = getFirstName()
// }



renderOrder()



        

