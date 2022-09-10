/**** Start Varibles ****/
// Universal
const menu = document.querySelector(".div-menu-btn-toggle");
const menuLinks = document.querySelector(".ul-menu-items");
let menuClickCounter = 0;
menuLinks.style.visibility = "collapse";

// Index page
const animeRedBand = document.querySelector(".div-red-band");
const animeBlueBand = document.querySelector(".div-blue-band");
const animeGreyBand = document.querySelector(".div-grey-band");

// Watch Purchase Page
let btn = document.querySelectorAll(".btn");
let mainImg = document.querySelector(".mainDisplay");

// Grab Specific Page
const indexPg = document.querySelector("#indexPg");
const section = document.querySelectorAll("#indexPg > section");
const watchPgRed = document.querySelector("#body-watchPgRed-container");
const watchPgGrey = document.querySelector("#body-watchPgGrey-container");
const watchPgBlue = document.querySelector("#body-watchPgBlue-container");
const cartPg = document.querySelector("#body-cartPg-container");

let page = [watchPgRed, watchPgGrey, watchPgBlue, cartPg];

// Arrays for Watch Type imgs
const redWatch = 
["/src/images/Front Face Red.png", 
"/src/images/Side Face Red.png", 
"/src/images/Back Red.png"];

const blueWatch = 
["/src/images/Front Face Blue.png", 
"/src/images/Side Face Blue.png",
"/src/images/Back Blue.png"];

const greyWatch = 
["/src/images/Front Face.png", 
"/src/images/Side Face.png",
"/src/images/Back prod.png"];

/* Cart Buttons
   -Watch Purchase Page
   -Cart Page
*/
const amountBtn = document.querySelectorAll(".div-btn-ItemAmount");

let prodPgAmtBtn = document.querySelector(".prodPgAmtBtn");
let addCartBtn = document.querySelector(".btn-addToCart");

const addBtn = document.querySelectorAll(".btn-Add");
const rmBtn = document.querySelectorAll(".btn-Remove");

//Adjust quanity of watch; Watch Purch. pg & Cart pg
const numShown = document.querySelector(".p-displayItemAmount");

let key = 
[
"add0", "add1", "add2",
"amt0", "amt1", "amt2",
"num0", "num1", "num2"
];

let array = [];
let amount;

//stored data all info specific to each watch
let productArray = [];
let itemTemplateArray = ["item0","item1","item2"];

/****** End Varibles ******/

if(document.readyState == 'loading')
{
  document.addEventListener('DOMContentLoaded', pageReady);
}
else{
  pageReady();
}

function pageReady()
{
  pageBtnGet();
}

function refreshUpdatePage()
{
  document.location.reload();
}

//Universal
function menuDisplayToggle()
{
  menuClickCounter++;

  //Display X style icon, not found in index
  menu.classList.toggle("active-menu");

  //start 0, menu open 1, menu close 2, reset 0
  menuLinks.style.visibility = "visible";
  if(menuClickCounter === 2)
  {
    menuLinks.style.visibility = "collapse";
    menuClickCounter = 0;
  }
}
if(indexPg)
{
  let intro = document.querySelector(".div-text-front-container");
  let info = document.querySelector(".div-text-side-container");
  let info2 = document.querySelector(".div-text-back-container");
  let watch = document.querySelectorAll(".watch");

  section[0].addEventListener("mouseover", function()
  {
    intro.style.animation = "info 4s"
    watch[0].style.animation = "watch 4s"
  });

  section[1].addEventListener("mouseover", function()
  {
    info2.style.animation = "info2 4s"
    watch[1].style.animation = "watch 4s";
  });

  section[2].addEventListener("mouseover", function()
  {
    info.style.animation = "info 4s";
    watch[2].style.animation = "watch 4s";
    
  });
}
  

//Index page - "#product" section
function enterRotateBands()
{
  animeRedBand.style.animation = "rotateRedBand 3s";
  animeBlueBand.style.animation = "rotateBlueBand 3s";
  animeGreyBand.style.animation = "rotateGreyBand 3s";
}

//Watch pages - Set Array w. their imgs 
function checkSetType()
{
   if(page[0])
  {
    array = redWatch;
  }

  if(page[1])
  {
    array = greyWatch;
  }

  if(page[2])
  {
    array = blueWatch;
  }
}

//Product selected go to page w. updated info
function viewChoice()
{
  checkSetType();

  //Create & Append - Side Trio Images
  for(let i = 0; i < btn.length; i++)
  {
    //Create img tag
    const img = document.createElement("img");

    //Add the new img tag inside the following button tag
    btn[i].append(img);

    //Apply the img details to each img sequentially
    img.setAttribute("src",array[i]);
  }

  //Create & Append - Center img
  if((mainImg) && (!cartPg))
  {
    let img = document.createElement("img");
    img.src = array[0];
    mainImg.append(img);

    //Change Main img via Side Trio selection 
    for(let i = 0; i < btn.length; i++)
    {
      btn[i].addEventListener("click", function()
      {
        mainImg.children[0].setAttribute("src",array[i]);
      });
    }
  }
} viewChoice();

/** Start Product Page Add to Cart Button **/
function addCartBtnClick()
{
  amount = 0;
  itemAmountAdd();
}

function itemAmountAdd()
{ 
  //Add +1 to -/+ btn show amount and local store & retrieve amount
  //Send amount change to storeData()
  amount++;

  addCartBtn.style.visibility = "collapse";
  prodPgAmtBtn.style.visibility = "visible";

  pageBtnSet();
  pageBtnGet();
  setLocalStorageProductPg();
  refreshUpdatePage();
  addToCart();
}

//Remove Item from Cart, -1
function itemAmountRemove()
{
  //Keep range 0 or above else switch view to "Add to Cart" button
  if(amount > 0) 
  {
    amount--;
    pageBtnSet();
    pageBtnGet();
    setLocalStorageProductPg();
    refreshUpdatePage();
    addToCart();
  }

  if(amount == 0)
  {
    addCartBtn.style.visibility = "visible";
    prodPgAmtBtn.style.visibility = "collapse";
    pageBtnSet();
    pageBtnGet();
    setLocalStorageProductPg();
    refreshUpdatePage();
    addToCart();
  }
}

function pageBtnSet()
{
  if(page[0])
  {
    //add cart button hide
    localStorage.setItem(key[0], getComputedStyle(addCartBtn).visibility);

    //amount button show
    localStorage.setItem(key[3], getComputedStyle(prodPgAmtBtn).visibility);

    //amount show
    localStorage.setItem(key[6], amount);
  }

  if(page[1])
  {
    //add cart button hide
    localStorage.setItem(key[1], getComputedStyle(addCartBtn).visibility);

    //amount button show
    localStorage.setItem(key[4], getComputedStyle(prodPgAmtBtn).visibility);

    //amount show
    localStorage.setItem(key[7], amount);
  }

  if(page[2])
  {
    //add cart button hide
    localStorage.setItem(key[2], getComputedStyle(addCartBtn).visibility);

    //amount button show
    localStorage.setItem(key[5], getComputedStyle(prodPgAmtBtn).visibility);

    //amount show
    localStorage.setItem(key[8], amount);
  }
}

function pageBtnGet()
{
  if(page[0])
  {
    //add cart button hide
    addCartBtn.style.visibility = localStorage.getItem(key[0], getComputedStyle(addCartBtn).visibility);

    //amount button show
    prodPgAmtBtn.style.visibility = localStorage.getItem(key[3],getComputedStyle(prodPgAmtBtn).visibility);

    //amount show
    amount = localStorage.getItem(key[6] ,amount);
    numShown.innerText = amount;
  }

  if(page[1])
  {
    //add cart button hide
    addCartBtn.style.visibility = localStorage.getItem(key[1], getComputedStyle(addCartBtn).visibility);

    //amount button show
    prodPgAmtBtn.style.visibility = localStorage.getItem(key[4], getComputedStyle(prodPgAmtBtn).visibility);

    //amount show
    amount = localStorage.getItem(key[7], amount);
    numShown.innerText = amount;
  }

  if(page[2])
  {
    //add cart button hide
    addCartBtn.style.visibility = localStorage.getItem(key[2], getComputedStyle(addCartBtn).visibility);

    //amount button show
    prodPgAmtBtn.style.visibility = localStorage.getItem(key[5], getComputedStyle(prodPgAmtBtn).visibility);

    //amount show
    amount = localStorage.getItem(key[8], amount);
    numShown.innerText = amount;
  }
}

//Store data fr. current prod pg AFTER "add to cart" btn click
function setLocalStorageProductPg()
{
  //Item info to be stored locally - Watch pg
  const prodTitle = document.querySelector(".h1-product-Title").innerText;
  const prodColor = document.querySelector(".h2-product-Color").innerText;
  const prodPrice = document.querySelector(".h2-product-Price").innerText;
  const storeImg = mainImg.children[0].src;

  //Store all the data values into Array
  productArray = 
  {
    image: storeImg,
    title: prodTitle,
    color: prodColor,
    price: prodPrice,
    quantity: amount
  };

  if(page[0])
  {
    localStorage.setItem("page[0]", JSON.stringify(productArray));
  }

  if(page[1])
  {
    localStorage.setItem("page[1]", JSON.stringify(productArray));
  }

  if(page[2])
  {
    localStorage.setItem("page[2]", JSON.stringify(productArray));
  }
}

function addToCart()
{ 
  if(cartPg)
  {
    let item0, item1, item2, checkSetPgArray = [];

    if(localStorage.getItem("page[0]"))
    {
      item0 = JSON.parse(localStorage.getItem("page[0]"));
      checkSetPgArray.push(item0);
    }

    if(localStorage.getItem("page[1]"))
    {
      item1 = JSON.parse(localStorage.getItem("page[1]"));
      checkSetPgArray.push(item1);
    }

    if(localStorage.getItem("page[2]"))
    {
      item2 = JSON.parse(localStorage.getItem("page[2]"));
      checkSetPgArray.push(item2);
    }

    for(let i = 0; i < checkSetPgArray.length; i++)
    {
      //create a new div
      let cartRowDiv = document.createElement("div");
      //new div set to class "div-item-row" take CSS style of class associated
      cartRowDiv.classList.add("div-item-row");
      //Container for cartRowDiv's
      let cartItemsContainer = document.querySelector(".div-items-container");

      // Cart row template
      const rowTemplate = 
      ` <div class="div-item prodColumn">
        <img src="${checkSetPgArray[i].image}" >
        </div>

        <div class="div-item prodInfo">
          <span class="cart-Title">${checkSetPgArray[i].title}</span>
          <span class="cart-Color">${checkSetPgArray[i].color}</span>
          <span class="cart-Price">${checkSetPgArray[i].price}</span>
        </div>

        <div class="div-item adjustColumn">
          <div class="div-btn-ItemAmount">
            <button type="button" class="btn-ItemAmount btn-Remove">-</button>
            <p class="p-displayItemAmount">${checkSetPgArray[i].quantity}</p>
            <button type="button" class="btn-ItemAmount btn-Add">+</button>
          </div>
        </div>`;

      cartRowDiv.innerHTML = rowTemplate;
      cartItemsContainer.append(cartRowDiv);   
    }
    
    let cartPgBtnRemove = document.querySelectorAll(".btn-Remove");
    let cartPgBtnAdd = document.querySelectorAll(".btn-Add");
    let cartItemAmount = document.querySelectorAll(".p-displayItemAmount");
    let cartPrice = document.querySelectorAll(".cart-Price")
    let cartItemRow = document.querySelectorAll(".div-item-row");
    let title = document.querySelectorAll(".cart-Title");
    const checkOutBtnClick = document.querySelector(".btn-checkout");
    const totalAmountDisplay = document.querySelector(".span-total");
    let total, amount ,string , parse, sum = 0;
    let costarr = [];

    //localStorage details to manage
    let stringPg, stringNum, add, amt;


    for(let i = 0; i < cartItemRow.length; i++)
    {    

      cartPgBtnRemove[i].addEventListener("click", function()
      {
        let store, storeString;
        //quantity
        amount = cartItemAmount[i].innerText;
      
        if(amount > 0)
        {
          //price
          string = JSON.stringify(cartPrice[i].innerText);
          parse = JSON.parse(string.replace("Price: $",""));

          amount--;
          cartItemAmount[i].innerText = amount;

          //Reset array for the amount adjustment to calculate properly
          costarr = [];

          costarr.push((amount * price));
          sum = parseFloat(costarr[i]);

          localStorage.setItem("Total", sum.toFixed(2));
          total = localStorage.getItem("Total");
          totalAmountDisplay.innerText = "$" + total;
        }

        //LocalStorage update based on "CLICK" will set specific to use for
        //getting stored data to then update across all related pages
        if(title[i].innerText === "Common Red Watch")
        {
          stringPg = "page["+`${[0]}`+"]";
          stringNum = "num"+`${0}`;
          add = "add"+`${0}`;
          amt = "amt"+`${0}`;
        } 
        if(title[i].innerText === "Common Grey Watch")
        {
          stringPg = "page["+`${[1]}`+"]";
          stringNum = "num"+`${1}`; 
          add = "add"+`${1}`;
          amt = "amt"+`${1}`;
        }
        if(title[i].innerText === "Common Blue Watch")
        {
          stringPg = "page["+`${[2]}`+"]";
          stringNum = "num"+`${2}`;
          add = "add"+`${2}`;
          amt = "amt"+`${2}`;
        } 

        //Turn into object that you can work with...
        storeString = localStorage.getItem(stringPg);
        store = JSON.parse(storeString);

        //clicked item set info will be used to get storage and convert to object to update
        store = 
        {
          image: store.image,
          title: store.title,
          color: store.color,
          price: store.price,
          quantity: store.quantity = amount
        }
        //Update QUANTITY in object....reference entire object
        localStorage.setItem(stringPg, JSON.stringify(store));
        localStorage.getItem(stringPg);

        //update quantity of item to reference back to other pageBtnSet
        localStorage.setItem(stringNum, JSON.stringify(store.quantity));
        // localStorage.getItem(stringNum);


        //Remove Row from cart page if item quantity is 0
        if(amount === 0)
        {
          //quantity
          amount = cartItemAmount[i].innerText;
          cartItemRow[i].remove();

          localStorage.removeItem(stringNum);
          localStorage.removeItem(stringPg);

          // other page update...
          localStorage.setItem(add,"visible")
          localStorage.setItem(amt,"collapse")
          
          localStorage.setItem("Total", sum.toFixed(2))
          totalAmountDisplay.innerText = "$" + localStorage.getItem("Total");
        }      
          
        refreshUpdatePage();
      });
    
      cartPgBtnAdd[i].addEventListener("click", function()
      {
        let  store, storeString;
        //quantity
        amount = cartItemAmount[i].innerText;

        //price
        string = JSON.stringify(cartPrice[i].innerText);
        parse = JSON.parse(string.replace("Price: $",""))
         
        amount++;
        cartItemAmount[i].innerText = amount;

        //Reset array for the amount adjustment to calculate properly
        costarr = [];

        costarr.push((amount * price));
        sum = parseFloat(costarr[i]);

        localStorage.setItem("Total", sum.toFixed(2));
        total = localStorage.getItem("Total");
        totalAmountDisplay.innerText = "$" + total;

        //LocalStorage update based on "CLICK" will set specific to use for
        //getting stored data to then update across all related pages
        if(title[i].innerText === "Common Red Watch")
        {
          stringPg = "page["+`${[0]}`+"]";
          stringNum = "num"+`${0}`;
          add = "add"+`${0}`;
          amt = "amt"+`${0}`;
        } 
        if(title[i].innerText === "Common Grey Watch")
        {
          stringPg = "page["+`${[1]}`+"]";
          stringNum = "num"+`${1}`;
          add = "add"+`${1}`;
          amt = "amt"+`${1}`;
        }
        if(title[i].innerText === "Common Blue Watch")
        {
          stringPg = "page["+`${[2]}`+"]";
          stringNum = "num"+`${2}`;
          add = "add"+`${2}`;
          amt = "amt"+`${2}`;
        } 

        //Turn into object that you can work with...
        storeString = localStorage.getItem(stringPg);
        store = JSON.parse(storeString);

        //clicked item set info will be used to get storage and convert to object to update
        store = 
        {
          image: store.image,
          title: store.title,
          color: store.color,
          price: store.price,
          quantity: store.quantity = amount
        }

        //Update AMOUNT OF ITEM....reference entire object
        localStorage.setItem(stringPg, JSON.stringify(store));
        localStorage.getItem(stringPg);

        //update quantity of item to reference back to other pageBtnSet
        localStorage.setItem(stringNum, JSON.stringify(store.quantity));
        refreshUpdatePage();
      });

      amount = cartItemAmount[i].innerText;
      let price = JSON.stringify(cartPrice[i].innerText);
      price = JSON.parse(price.replace("Price: $",""));
      
      costarr.push((amount * price));
      sum += parseFloat(costarr[i]);

      //set & get display for check out Total 
      localStorage.setItem("Total", sum.toFixed(2));
      total = localStorage.getItem("Total");
      totalAmountDisplay.innerText = "$" + total; 

    }//END array based on row count

    checkOutBtnClick.addEventListener("click", function()
    {
      alert("Order Successful\n\n\n...Data will now be cleared");
      localStorage.clear();
      refreshUpdatePage();
      localStorage.setItem("Total","0");
      totalAmountDisplay.innerText = localStorage.getItem("Total");
    });
  }//END if Cartpg....
}//END addToCart()....
onload = addToCart();