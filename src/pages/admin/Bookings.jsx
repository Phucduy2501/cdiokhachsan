import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          check_in,
          check_out,
          status,
          rooms (
            name,
            price
          ),
          users (
            email
          )
        `)
        .order("check_in", { ascending: false });

      if (error) {
        console.error("Fetch bookings error:", error);
      } else {
        setBookings(data);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Đang tải...</p>;

  if (bookings.length === 0)
    return <p>Chưa có đơn đặt phòng</p>;

  return (
    <div className="table-card">
      <h4>Thông tin đặt phòng khách sạn</h4>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Phòng</th>
            <th>Giá</th>
            <th>Check in</th>
            <th>Check out</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.users?.email}</td>
              <td>{b.rooms?.name}</td>
              <td>
                {b.rooms?.price?.toLocaleString()} VNĐ
              </td>
              <td>{b.check_in}</td>
              <td>{b.check_out}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}