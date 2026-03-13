import { MapContainer, TileLayer, Marker } from 'react-leaflet'
<MapContainer center={[28.6139, 77.2090]} zoom={5}  style={{ height: "400px" }}>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    />
    <Marker position={[51.505, -0.09]}/>


</MapContainer>
function Analytics() {
    return (
        <div>
            <h1>Employee Analytics</h1> 
        
        </div>
    );

}
export default Analytics;


