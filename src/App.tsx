import { FunctionComponent, useEffect, useState } from 'react';
import { Person } from './types';
import data from './data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const peopleInitialState: Person[] = data;
const verifyIndex = (idx: number, max: number) => {
  if (idx > max) {
    idx = 0;
  }
  if (idx < 0) {
    idx = max;
  }
  return idx;
}

const App: FunctionComponent = () => {
  const [people] = useState(peopleInitialState);
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((old) => {
      let index = old + 1;
      return verifyIndex(index, people.length - 1);
    });
  }

  const prevSlide = () => {
    setIndex((old) => {
      let index = old - 1;
      return verifyIndex(index, people.length - 1);
    });
  }

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((old) => {
        let index = old + 1;
        return verifyIndex(index, people.length - 1);
      });
    }, 3000);
    return () => clearInterval(slider)
  }, [index, people]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = 'nextSlide';

          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = 'lastSlide';
          }

          return <article key={id} className={position}>
            <img src={image} alt={name} className="person-img" />
            <h4>{name}</h4>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        })}
        <button className="prev" onClick={prevSlide}><FiChevronLeft /></button>
        <button className="next" onClick={nextSlide}><FiChevronRight /></button>
      </div>
    </section>
  );
}

export default App;
