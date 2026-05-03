import { useContext } from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { RoomContext } from '../context';
import Loading from './Loading';

export default function RoomContainer() {
    const { loading, error, sortedRooms, rooms } = useContext(RoomContext);
    if (loading) return <Loading />;
    if (error) return <p>Failed to load rooms. Please try again later.</p>;
    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    );
}
