import PostsGrid from '../posts/posts-grid';
import css from './featured-posts.module.css';

const FeaturedPosts = (props) => {
  return (
    <section className={css.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default FeaturedPosts;
