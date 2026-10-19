import { api } from './client';

export async function fetchEvents() {
    const res = await api.get('api/events/');
    return res.data;
}

export async function fetchEvent(id) {
    const res = await api.get(`api/events/${id}/`);
    return res.data;
}

export async function createBooking(payload) {
    const res = await api.post('api/booking/', payload);
    return res.data;
}

export async function fetchBookings() {
    const res = await api.get('api/booking/');
    return res.data;
}
