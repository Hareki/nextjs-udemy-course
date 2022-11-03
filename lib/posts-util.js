import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ''); //Using Regex to remove file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content
  };

  return postData;
}

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostNames() {
  const postFiles = getPostsFiles();
  const postNames = postFiles.map((name) =>
    name.replace(/\.md$/, '')
  );

  return postNames;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((fileName) => {
    return getPostData(fileName);
  });

  const sortedArray = allPosts.sort((postA, postB) =>
    postA.data > postB ? -1 : 1
  );
  return sortedArray;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(
    (postData) => postData.isFeatured
  );
  return featuredPosts;
}
