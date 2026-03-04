export function sendBookingToChat(booking) {

  if (!window.Tawk_API) return;

  window.Tawk_API.maximize();

  window.Tawk_API.addEvent("booking_success", {
    room: booking.room,
    checkin: booking.checkin,
    checkout: booking.checkout,
    total: booking.total
  });

}