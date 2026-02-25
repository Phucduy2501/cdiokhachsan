import "./Rooms.css";

export default function Rooms() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      guests: 2,
      price: "1.200.000 VNĐ",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Premium Room",
      guests: 3,
      price: "1.800.000 VNĐ",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Family Room",
      guests: 4,
      price: "2.500.000 VNĐ",
      img: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="homeContainer roomsPage">
      <h2 className="roomsTitle">Danh sách phòng</h2>

      <div className="roomsGrid">
        {rooms.map((room) => (
          <div className="roomCard" key={room.id}>
            <img src={room.img} alt={room.name} />

            <div className="roomBody">
              <h3>{room.name}</h3>
              <p>{room.guests} người</p>

              <div className="roomBottom">
                <span className="roomPrice">{room.price} / đêm</span>
                <button className="btn btnPrimary">Đặt phòng</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
