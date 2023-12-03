let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let category=document.getElementById('category')
let count=document.getElementById('count')
let submit=document.getElementById('submit')

//getTotal
let mood='Create'
let tmp;
let searchMode='title';
function getTotal(){

    if (price.value !=0){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result
        total.style.background='#040'

    }

    else{
        total.innerHTML=''
 

    }
}


//Create 

let dataproduct;
if(localStorage.product != null){
    dataproduct=JSON.parse(localStorage.product)
}
else{
    dataproduct=[]
}
function Createproduct(){
    
    let newproduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()

    }


    if (mood==='Create'){
        if(newproduct.count>1){
            for(let i=0;i<newproduct.count;i++){
                dataproduct.push(newproduct)
            }
        }
        else{
            dataproduct.push(newproduct)
        }
        
    }
    else{
        dataproduct[tmp]=newproduct
        mood='Create';
        submit.innerHTML='Create';
        count.style.display='block'
    }

    localStorage.setItem('product',JSON.stringify(dataproduct))
    clearData()
    ReadData()

}

//clear data

function clearData(){
    title.value='',
    price.value='',
    taxes.value='',
    ads.value='',
    discount.value='',
    total.innerHTML,
    count.value='',
    category.value=''
}


//Read Data

function ReadData(){
    getTotal()

    let table=''

    for(let i=0; i<dataproduct.length;i++){

        table +=

            `
                <tr>
                    <td>#${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td><button onclick="updateData(${i})" type="button" class="btn btn-outline-warning">Update</button></td>
                    <td><button onclick="DeleteData(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>  
                </tr>
            `

    }

    document.getElementById('tbody').innerHTML=table
    let btnDeleteAll=document.getElementById('deleteAll')

    if(dataproduct.length>0){
        btnDeleteAll.innerHTML=`
            <button onclick="DeleteAll()" type="button" class="btn btn-danger ">DeleteALL (${dataproduct.length})</button> 
        `

    }
    else{
        btnDeleteAll.innerHTML=''
    }
}



//Delete Row

function DeleteData(i){
    dataproduct.splice(i,1);
    localStorage.product=JSON.stringify(dataproduct)
    ReadData()

}


//DeleteAllProducts
function DeleteAll(){
    localStorage.clear()
    dataproduct.splice(0)
    ReadData()
}


//Update Data

function updateData(i){
    title.value=dataproduct[i].title;
    price.value=dataproduct[i].price;
    taxes.value=dataproduct[i].taxes;
    ads.value=dataproduct[i].ads;
    discount.value=dataproduct[i].discount;
    getTotal();
    count.style.display='none',
    category.value=dataproduct[i].category
    submit.innerHTML='Update'
    mood='Update'
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
   



}


//Search mode

function getSearchMode(id){
    let Search=document.getElementById('search')
    if(id=='SearchByTitle'){
        searchMode='title'
        Search.placeholder='SearchByTitle'
    }
    else{
        searchMode='category'
        search.placeholder='SearchByCategory'
    }
    console.log(searchMode)
    Search.focus()
    search.value=''
    ReadData()
    
}

// Search Data

// function SearchData(value){
//     let table=''
//     if(searchMode=='title'){
//         for(let i=0;i<dataproduct.length;i++){

//             if(dataproduct[i].title.includes(value.toLowercase())){
//                 table +=

//                 `
//                     <tr>
//                         <td>#${i}</td>
//                         <td>${dataproduct[i].title}</td>
//                         <td>${dataproduct[i].price}</td>
//                         <td>${dataproduct[i].taxes}</td>
//                         <td>${dataproduct[i].ads}</td>
//                         <td>${dataproduct[i].discount}</td>
//                         <td>${dataproduct[i].total}</td>
//                         <td>${dataproduct[i].count}</td>
//                         <td>${dataproduct[i].category}</td>
//                         <td><button onclick="updateData(${i})" type="button" class="btn btn-outline-warning">Update</button></td>
//                         <td><button onclick="DeleteData(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>  
//                     </tr>
//                 `

//             }
          
     
//         }
//     }
//     else{
//         for(let i=0;i<dataproduct.length;i++){

//             if(dataproduct[i].title.includes(value.toLowerCase())){
//                 table +=

//                 `
//                     <tr>
//                         <td>#${i}</td>
//                         <td>${dataproduct[i].title}</td>
//                         <td>${dataproduct[i].price}</td>
//                         <td>${dataproduct[i].taxes}</td>
//                         <td>${dataproduct[i].ads}</td>
//                         <td>${dataproduct[i].discount}</td>
//                         <td>${dataproduct[i].total}</td>
//                         <td>${dataproduct[i].count}</td>
//                         <td>${dataproduct[i].category}</td>
//                         <td><button onclick="updateData(${i})" type="button" class="btn btn-outline-warning">Update</button></td>
//                         <td><button onclick="DeleteData(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>  
//                     </tr>
//                 `

//             }
          
     
//         }
//     }
//     document.getElementById('tbody').innerHTML=table
// }


function SearchData(value){
    let table=''
    if(searchMode=='title'){

        for(let i=0;i<dataproduct.length;i++){

            if(dataproduct[i].title.includes(value.toLowerCase())){

                table +=

            `
                <tr>
                    <td>#${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td><button onclick="updateData(${i})" type="button" class="btn btn-outline-warning">Update</button></td>
                    <td><button onclick="DeleteData(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>  
                </tr>
            `
            }
        }
    }
    else{
        for(let i=0;i<dataproduct.length;i++){

            if(dataproduct[i].title.includes(value.toLowerCase())){

                table +=

            `
                <tr>
                    <td>#${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td><button onclick="updateData(${i})" type="button" class="btn btn-outline-warning">Update</button></td>
                    <td><button onclick="DeleteData(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>  
                </tr>
            `
            }
        }

    }
    document.getElementById('tbody').innerHTML=table

}
ReadData()