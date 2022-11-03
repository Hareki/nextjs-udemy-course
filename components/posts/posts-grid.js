import PostItem from './post-item';
import css from './posts-grid.module.css';
const PostsGrid = (props) => {
  const { posts } = props;

  return (
    <ul className={css.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
