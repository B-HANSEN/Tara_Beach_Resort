import React from 'react';
import { RoomContext } from '../context';


export default class FeaturedRooms extends React.Component {

    // code for a class-based component:
    static contextType = RoomContext; 
    

    render() {
        const { featuredRooms: rooms } = this.context;
        console.log(rooms);
        
        
        return (
            <div>
                hello from featured rooms 
            </div>
        )
    }
};