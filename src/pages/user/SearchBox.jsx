export default function SearchBox({ onSearch }) {
  return (
    <section className="search">
      <form className="searchBox" onSubmit={onSearch}>
        <div className="field">
          <span className="icon">📅</span>
          <input placeholder="Kiểm tra phòng trống" />
        </div>

        <div className="field">
          <span className="icon">👤</span>
          <select defaultValue="2">
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4">4 người</option>
          </select>
        </div>

        <div className="field">
          <span className="icon">📍</span>
          <input placeholder="Địa điểm" />
        </div>

        <button className="btn btnPrimary searchBtn">
          Tìm kiếm
        </button>
      </form>
    </section>
  );
}
