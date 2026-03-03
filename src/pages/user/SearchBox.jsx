import { useState } from "react";

export default function SearchBox({ onSearch }) {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      location,
      guests: Number(guests),
    });
  };

  return (
    <section className="search">
      <form className="searchBox" onSubmit={handleSubmit}>
        <div className="field">
          <span className="icon">📅</span>
          <input placeholder="Kiểm tra phòng trống" />
        </div>

        <div className="field">
          <span className="icon">👤</span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4">4 người</option>
          </select>
        </div>

        <div className="field">
          <span className="icon">📍</span>
          <input
            placeholder="Địa điểm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button className="btn btnPrimary searchBtn">
          Tìm kiếm
        </button>
      </form>
    </section>
  );
}