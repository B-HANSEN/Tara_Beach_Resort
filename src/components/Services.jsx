import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import Title from './Title';

const services = [
    {
        icon: <FaCocktail />,
        title: 'free cocktails',
        info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?',
    },
    {
        icon: <FaHiking />,
        title: 'endless hiking',
        info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?',
    },
    {
        icon: <FaShuttleVan />,
        title: 'free shuttle',
        info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?',
    },
    {
        icon: <FaBeer />,
        title: 'strongest beer',
        info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?',
    },
];

export default function Services() {
    return (
        <section className="services">
            <Title title="services" />
            <div className="services-center">
                {services.map((item) => (
                    <article key={item.title} className="service">
                        <span>{item.icon}</span>
                        <h6>{item.title}</h6>
                        <p>{item.info}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
