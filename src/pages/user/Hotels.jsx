import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

import SearchBox from "./SearchBox";
import HotelCard from "./HotelCard";
import "./Hotels.css";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("name");

      if (error) {
        console.error("Fetch hotels error:", error);
        return;
      }

      setHotels(data);
    };

    fetchHotels();
  }, []);

  return (
    <div className="homePage">
      <main className="homeContainer hotelsPage">
        <SearchBox />

        <div className="hotelsHead">
          <h2>Tất cả khách sạn</h2>
          <span>{hotels.length} kết quả</span>
        </div>

        <div className="hotelsGrid">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </main>
    </div>
  );
}