(function(){
    const Socket = io();

    Socket.on('connect', () => {
        console.log('connected ');
    })

    Socket.on("inicio", (data) => {

    console.log(data);

    })

    let send = document.getElementById("send");

    send.addEventListener("click", (e) => {

        e.preventDefault();

        let product = getData();

        Socket.emit("product_list", JSON.stringify(product));
    })

    
})()


const getData = () => {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let thumbnail = document.getElementById("thumbnail").value;
    let code = document.getElementById("code").value;
    let stock = document.getElementById("stock").value;

    return {
        Title: title,
        Description: description,
        Price: price,
        Thumbnail: thumbnail,
        Code: code,
        Stock: stock
    }
}

const url = "http://localhost:8080/products"

function addToCart(comp) {
    let id = comp.id
    axios({
        method: 'post',
        url: url,
        data: {
            id
        }
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

}