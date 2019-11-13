import React from 'react';
import defaultBcg from '../images/room-2.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';


export default class SingleRoom extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props);

        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }

    static contextType = RoomContext;

    // componentDidMount() {  
    // }

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        if(!room) {
            return  <div className="error">
                        <h3>no such room could be found...</h3>
                        <Link to='/rooms' className="btn-primary">
                            back to rooms
                        </Link>
                    </div>
        }

        // object destructuring:
        const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
        
        // array destructuring:
        // use rest operator '...' instead of [ mainImg, img1, img2 ] ==> rest of the images in the array, apart from mainImg
        const [ mainImg, ...defaultImg ] = images;
        console.log(defaultImg);
        

        return  (
            <>
        
{/* use mainImg here */}
                <StyledHero img={ mainImg || this.state.defaultImg }>
                    <Banner title={ `${ name } room` }>
                        <Link to='/rooms' className='btn-primary'>
                            back to rooms
                        </Link>
                    </Banner>
                </StyledHero>

                <section className="single-room">
                    <div className="single-room-images">

{/* replace images with defaultImg to not repeat the mainImg */}
                        { defaultImg.map((item, index) => {
                            return <img key={ index } src={ item } alt={ name } />
                        })}
                    </div>
                </section>
            </>
        )
    }
}