import React, { createContext, useState, useEffect, useCallback } from 'react';
import Client from './Contentful';

const RoomContext = createContext();

const initialState = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
};

function formatData(items) {
    return items.map(item => {
        const id = item.sys.id;
        const images = item.fields.images.map(image => image.fields.file.url);
        return { ...item.fields, images, id };
    });
}

export function RoomProvider({ children }) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        Client.getEntries({ content_type: 'beachResortRoom', order: 'sys.createdAt' })
            .then(response => {
                const rooms = formatData(response.items);
                const featuredRooms = rooms.filter(room => room.featured === true);
                const maxPrice = Math.max(...rooms.map(item => item.price));
                const maxSize = Math.max(...rooms.map(item => item.size));
                setState(s => ({ ...s, rooms, featuredRooms, sortedRooms: rooms, loading: false, price: maxPrice, maxPrice, maxSize }));
            })
            .catch(error => console.error(error));
    }, []);

    const getRoom = useCallback(slug => {
        return state.rooms.find(room => room.slug === slug);
    }, [state.rooms]);

    const filterRooms = useCallback((newState) => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = { ...state, ...newState };
        capacity = parseInt(capacity);
        price = parseInt(price);

        let tempRooms = [...rooms];
        if (type !== 'all') tempRooms = tempRooms.filter(room => room.type === type);
        if (capacity !== 1) tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        tempRooms = tempRooms.filter(room => room.price <= price);
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);
        if (breakfast) tempRooms = tempRooms.filter(room => room.breakfast === true);
        if (pets) tempRooms = tempRooms.filter(room => room.pets === true);

        return tempRooms;
    }, [state]);

    const handleChange = useCallback(event => {
        const { name, type, checked, value } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setState(s => {
            const updated = { ...s, [name]: newValue };
            return { ...updated, sortedRooms: filterRooms({ [name]: newValue }) };
        });
    }, [filterRooms]);

    return (
        <RoomContext.Provider value={{ ...state, getRoom, handleChange }}>
            {children}
        </RoomContext.Provider>
    );
}

export default RoomProvider;

export { RoomContext };