import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

export default function FeaturedRooms() {
    const { loading, featuredRooms } = useContext(RoomContext);

    return (
        <section className="featured-rooms">
            <Title title="featured rooms" />
            <div className="featured-rooms-center">
                {loading ? (
                    <Loading />
                ) : (
                    featuredRooms.map((room) => <Room key={room.id} room={room} />)
                )}
            </div>
        </section>
    );
}
