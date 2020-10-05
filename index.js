var mymap = L.map('mapid').setView([51.505, -0.09], 1.5);

            const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

            tile_url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            const tiles=L.tileLayer(tile_url,{attribution});

            tiles.addTo(mymap);

            var myicon = L.icon({
                    iconUrl: 'radar.png',
                    iconSize: [20, 30],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                   
                    
                });

            const marker=L.marker([0,0]).addTo(mymap);
            mymap.options.minZoom=1.5;

        var firstTime=true;

         
        const url='https://api.wheretheiss.at/v1/satellites/25544';
        async function getISS()
        {
            const response= await fetch(url);
            const data=await response.json();
            const lat=data.latitude;
            const long=data.longitude;
            const velocity= data.velocity;
            const altitude=data.altitude;

            document.getElementById('lat').textContent=lat;
            document.getElementById('long').textContent=long;
            document.getElementById('vel').textContent=velocity;
            document.getElementById('alt').textContent=altitude;

            if(firstTime)
            {
                mymap.setView([lat,long],3);
                firstTime=false;
            }
            
            marker.setLatLng([lat,long]);
            

            

           
        }

        getISS();

        setInterval(getISS,1000);