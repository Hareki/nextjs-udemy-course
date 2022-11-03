import Head from 'next/head';
import { Fragment } from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostNames } from '../../lib/posts-util';

const PostDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData
    },
    revalidate: 600
  };
};

export const getStaticPaths = async () => {
  const slugs = getPostNames();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths: paths,
    fallback: false
  };
};

export default PostDetailPage;
