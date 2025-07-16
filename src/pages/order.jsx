import { render } from '@czechitas/render';
import '../global.css';
import './index.css';
import './order.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Order } from '../components/Order';

const response = await fetch('http://localhost:4000/api/drinks?filter=ordered:eq:true&select=id,name,image');
const data = await response.json();
const orderItems = data.data;
console.log(orderItems);

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <div className="page">
      <Header showMenu={false} />
      <main className="order">
        <div className="container order__content">
          <h1>Vaše objedávnka</h1>
          <div className="order__items">
          <Order items={orderItems}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </div>
);

const navBtn = document.querySelector(".nav-btn");
const rolloutNav = document.querySelector(".rollout-nav");

navBtn.addEventListener("click", function () {
  rolloutNav.classList.toggle("nav-closed");
});

rolloutNav.addEventListener("click", function () {
  rolloutNav.classList.add("nav-closed");
});
