import Image from 'next/image';
import css from './hero.module.css';

const Hero = (props) => {
  return (
    <section className={css.hero}>
      <div className={css.image}>
        <Image
          src='/images/site/max.png'
          alt='An image showing Max'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Max</h1>
      <p>
        I blog about web development - especially fronted frameworks
        like Angular or React.
      </p>
    </section>
  );
};

export default Hero;
