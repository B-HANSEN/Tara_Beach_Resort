import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import Client from './Contentful';

const RoomContext = createContext();

const initialState = {
    rooms: [],
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
                const maxPrice = Math.max(...rooms.map(item => item.price));
                const maxSize = Math.max(...rooms.map(item => item.size));
                setState(s => ({ ...s, rooms, loading: false, price: maxPrice, maxPrice, maxSize }));
            })
            .catch(error => console.error(error));
    }, []);

    const featuredRooms = useMemo(
        () => state.rooms.filter(room => room.featured),
        [state.rooms]
    );

    const sortedRooms = useMemo(() => {
        const { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = state;
        let temp = [...rooms];
        if (type !== 'all') temp = temp.filter(room => room.type === type);
        if (capacity !== 1) temp = temp.filter(room => room.capacity >= parseInt(capacity));
        temp = temp.filter(room => room.price <= parseInt(price));
        temp = temp.filter(room => room.size >= minSize && room.size <= maxSize);
        if (breakfast) temp = temp.filter(room => room.breakfast === true);
        if (pets) temp = temp.filter(room => room.pets === true);
        return temp;
    }, [state]);

    const getRoom = useCallback(
        slug => state.rooms.find(room => room.slug === slug),
        [state.rooms]
    );

    const handleChange = useCallback(event => {
        const { name, type, checked, value } = event.target;
        setState(s => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
    }, []);

    return (
        <RoomContext.Provider value={{ ...state, featuredRooms, sortedRooms, getRoom, handleChange }}>
            {children}
        </RoomContext.Provider>
    );
}

export default RoomProvider;

export { RoomContext };
