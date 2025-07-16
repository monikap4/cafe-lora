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
    <Header showMenu={true} />
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

const onSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const id = form.dataset.id;

  const isOrdered = form.querySelector(".order-btn").classList.contains("order-btn--ordered");

  const patchData = [
    {
      op: "replace",
      path: "/ordered",
      value: !isOrdered,
    },
  ];

  const response = await fetch(`http://localhost:4000/api/drinks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patchData),
  });

  if (!response.ok) {
    alert("Chyba při komunikaci se serverem.");
    return;
  }

  const result = await response.json();
  console.log("Odpověď z API:", result);

  window.location.reload();
};

document.querySelectorAll(".drink__controls").forEach((form) =>
  form.addEventListener("submit", onSubmit)
);
