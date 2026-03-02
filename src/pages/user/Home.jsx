import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

import "./Home.css";
import SearchBox from "./SearchBox";
import HotelCard from "./HotelCard";
import MiniHotelCard from "./MiniHotelCard";

export default function Home() {
  /* ========= LỰA CHỌN HÀNG ĐẦU (SUPABASE) ========= */
  const [topChoices, setTopChoices] = useState([]);

  useEffect(() => {
    const fetchTopHotels = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("price")
        .limit(5);

      if (!error) setTopChoices(data);
    };

    fetchTopHotels();
  }, []);

  /* ========= LỰA CHỌN PHỔ BIẾN (8 CÁI – GIỮ NGUYÊN) ========= */
  const popular = [
    {
      id: 1,
      name: "Shangri-la",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200",
    },
    {
      id: 2,
      name: "Top View",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1200",
    },
    {
      id: 3,
      name: "Green Villa",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200",
    },
    {
      id: 4,
      name: "Wooden Pit",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    },
    {
      id: 5,
      name: "Boutique",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    },
    {
      id: 6,
      name: "Modern",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    },
    {
      id: 7,
      name: "Silver Rain",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=1200",
    },
    {
      id: 8,
      name: "Coshville",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200",
    },
  ];

  return (
    <div className="homePage">
      <main className="homeContainer">
        <SearchBox />

        <section className="section">
          <div className="sectionHead">
            <h2>Lựa chọn hàng đầu</h2>
          </div>

          <div className="gridTop">
            {topChoices.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="sectionHead rowBetween">
            <h2>Lựa chọn phổ biến</h2>
            <span className="pill">Xem thêm</span>
          </div>

          <div className="gridPopular">
            {popular.map((hotel) => (
              <MiniHotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}