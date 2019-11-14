import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { withRoomConsumer } from '../context';
import Loading from './Loading';


function RoomContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
    if(loading) {
        return <Loading />;
    }
    return (
        <>
            {/* <RoomFilter rooms={ rooms } /> */}
            <RoomList rooms={ sortedRooms }/>
        </>
    )
};

// wrapping consumer around the component to make the context accessible:
export default withRoomConsumer(RoomContainer);




// context can be destructured as per below
// alternatively, in context.js a higher-order-component can be created and reused throughout the application
// beneficial in case context is used in functional component several times




// import React from 'react';
// import RoomFilter from './RoomFilter';
// import RoomList from './RoomList';
// import { RoomConsumer } from '../context';
// import Loading from './Loading';


// export default function RoomContainer () {

//     return (
//         <RoomConsumer>
//             { value => {
//                 const { loading, sortedRooms, rooms } = value;
//                 if(loading) {
//                     return <Loading />;
//                 }

//                 return  (
//                     <div>hello from rooms container
//                         <RoomFilter rooms={ rooms }/>
//                         <RoomList rooms={ sortedRooms }/>
//                     </div>
//                 )
//             }}
//        </RoomConsumer>  
//     )
// };