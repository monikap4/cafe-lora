import './index.css';
import { OrderItem } from '../OrderItem';

export const Order = ({ items }) => {
    if (items.length === 0) {
        return <p>Nemáte žádné objednané nápoje</p>;
    }

    return (
        <div className="order">
        {items.map((item) => (
            <OrderItem key={item.id} name={item.name} image={item.image} />
        ))}
        </div>
    );
}
