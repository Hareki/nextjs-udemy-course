import Image from 'next/image';
import Link from 'next/link';
import css from './post-item.module.css';

const PostItem = (props) => {
  const { title, image, excerpt, date, slug } = props.post;
  const fullImagePath = `/images/posts/${slug}/${image}`;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const linkPath = `/posts/${slug}`;

  return (
    <li className={css.post}>
      <Link href={linkPath}>
        <div>
          <Image
            className={css.image}
            src={fullImagePath}
            alt={title}
            width={300}
            height={200}
          />
        </div>

        <div className={css.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
