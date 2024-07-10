const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
       const {latitude , langitude} = position.coords;
       socket.emit("send-location" , {latitude , langitude});
    }, (error)=>{
        console.error(error);
    },{
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    })
}

const map = L.map("map").setView([0,0], 16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
        attribution : "Amar Pisal creation"
}).addTo(map)

const markers = {};

socket.on("receive-location" , (data)=>{
    const {id , latitude , langitude} = data;
    map.setView([latitude , langitude] , 16);
    if(markers[id]){
        markers[id].setLatLng([latitude , langitude]);
    }else{
        markers[id] = L.marker([latitude , langitude]).addTo(map)
    }
})

socket.on("disconnect" , ()=>{
    
})