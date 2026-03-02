import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import BookingModal from "./BookingModal";
import "./Rooms.css";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true });

      if (error) {
        console.error("Fetch rooms error:", error);
        return;
      }

      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <div className="homeContainer roomsPage">
      <h2 className="roomsTitle">Danh sách phòng</h2>

      <div className="roomsGrid">
        {rooms.map((room) => (
          <div className="roomCard" key={room.id}>
            <img
              src={room.image_url}
              alt={room.name}
            />

            <div className="roomBody">
              <h3>{room.name}</h3>
              <p>{room.capacity} người</p>

              <div className="roomBottom">
                <span className="roomPrice">
                  {room.price.toLocaleString()} VNĐ / đêm
                </span>

                <button
                  className="btn btnPrimary"
                  onClick={() => setSelectedRoom(room)}
                >
                  Đặt phòng
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}