import { render } from '@czechitas/render';
import '../global.css';
import './index.css';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { Menu } from '../components/Menu';
import { Gallery } from '../components/Gallery';
import { Footer } from '../components/Footer';
import { Contact } from '../components/Contact';

const response = await fetch('http://localhost:4000/api/drinks');
const data = await response.json();
console.log(data.data);

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <Header />
    <main>
      <Banner />
      <Menu drinks={data.data}/>
      <Gallery />
      <Contact />
    </main>
      <Footer />
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
