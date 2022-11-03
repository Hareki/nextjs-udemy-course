import PostsGrid from './posts-grid';
import css from './all-posts.module.css';

const AllPosts = (props) => {
  return (
    <section className={css.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default AllPosts;
