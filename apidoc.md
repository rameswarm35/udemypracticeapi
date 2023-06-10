
* Udemy App

// page1

> List of category
 * http://localhost:7220/category

> List of Quick Search
* http://localhost:7220/student

//page2

> category wrt courses
* http://localhost:7220/course?categoryId=2

> category wrt course + edition
* http://localhost:7220/filter/2?edition=1

//Page3

> Details of course
* http://localhost:7220/details/6481f1b9d5e7186325937838

//Page4

> Details of course selected
* http://localhost:7220/courseDetails
{"id":[2,4,8]}

> Place Bookorder 
* http://localhost:7220/placeOrder
{
        "bookkorder_id":2,
        "name":"Manoj",
        "book_name":"Javascript for Beginners",
        "image":"https://i.ibb.co/YkHG1kL/javascript.jpg",
        "price":500,
        "pages": 266,
        "phone":7856942354,
        "email": "manoj@gmail.com",
        "status": "Delivered"
}

// Page5

> List of all the Bookorders
* http://localhost:7220/orders

> Update Bookorder details
* http://localhost:7220/updateOrder
{
    "_id":"6484e32c857efc45e054a09a",
    "status":"Out for Delivery"
}

> Delete Bookorder
* http://localhost:7220/deleteOrder
{"_id":"6484e4bb38ec8e8aafb14fe8"}

