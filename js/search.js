// Function to fetch products and filter based on room type
function getProducts(callback) {
    fetch('https://672209072108960b9cc29c4a.mockapi.io/api/v1/T_room')
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function handleProducts(error, data) {
    if (error) {
        console.error('Error fetching products:', error);
    } else {
        const bodyCard = document.getElementById('main-card2');
        bodyCard.innerHTML = '';

        data.forEach(product => {
            const card = `
            <div class="w-[25rem] h-[53rem] bg-white rounded-lg">
                <img src="${product.image}" alt="" class="w-[25rem] h-[35rem] object-cover cursor-pointer" data-id="${product.id}" onclick="openModal(this)">
                <div class="flex flex-col text-center space-y-3 mt-2 p-3">
                    <span class="text-3xl font-medium">${product.name}</span>
                    <span class="text-lg font-medium">${product.price}$/Per Night</span>
                    <span>${product.desc}</span>
                    <button class="bg-[#487254] text-white p-2 px-3 font-medium rounded hover:opacity-90">Book Now</button>
                    <button class="underline underline-offset-4">Check Out</button>
                </div>
            </div>`;
            bodyCard.innerHTML += card;
        });
    }
}

// Search function triggered by the button
function searchRooms() {
    const selectedRoom = document.getElementById('room').value;

    getProducts((error, data) => {
        if (error) {
            console.error('Error fetching products:', error);
        } else {
            const filteredData = (selectedRoom === "All" || !selectedRoom) 
                ? data 
                : data.filter(product => product.name === selectedRoom);
            handleProducts(null, filteredData);
        }
    });
}