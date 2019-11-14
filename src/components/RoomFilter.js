import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';


// get all unique values:
const getUnique = (items, value) => {
    //new Set() checks if item is already in the array, if not it will be added
    return [...new Set(items.map(item => item[value]))]
};

const RoomFilter = ({ rooms }) => {

// React hooks:
    const context = useContext(RoomContext);
    const { handleChange, type, capacity, price,
        minPrice, maxPrice, minSize, maxSize, breakfast, pets
        } = context;
    
    // get unique types:
    let types = getUnique(rooms, 'type');
    // add all:
    types = ['all', ...types];
    // map to JSX:
    types = types.map((item, index) => {
        return <option key={ index } value={ item }>{ item }</option>
    });

    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => (
        <option key={ index } value={ item }>{ item }</option>
    ));
    

    return  <section className="filter-container">
                <Title title="search rooms" />
                <form className="filter-form">
                    {/* select type */}

                    <div className="form-group">
                        <label htmlFor="type">room type</label>
                        <select name="type" id="type"
                            value={ type } className="form-control"
                            onChange={ handleChange }>
                        { types }
                        </select>
                    </div>

                    {/* end select type */}


                    {/* guests */}

                     <div className="form-group">
                        <label htmlFor="capacity">Guests</label>
                        <select
                            name="capacity" id="capacity"
                            value={ capacity } className="form-control"
                            onChange={ handleChange }>
                        { people }
                        </select>
                    </div>

                    {/* end guests */}
                </form>
            </section>
}

export default RoomFilter;