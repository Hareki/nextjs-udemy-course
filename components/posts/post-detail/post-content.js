import PostHeader from './post-header';
import ReactMarkdown from 'react-markdown';
import classes from './post-content.module.css';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'; //cjs = execute on serverSide, esm = client side?
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostContent = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    // img(image) {
    //   return (
    //     <Image
    //       alt={image.alt}
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph) {
      //Render image this way to avoid a p tag wrapping around the image, we will use div instead
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              alt={image.alt}
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here

      return (
        <SyntaxHighlighter
          //eslint-disable-next-line react/no-children-prop
          children={children}
          style={atomDark}
          language={language}
        />
      );
    }
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
