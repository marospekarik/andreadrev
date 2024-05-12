import { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';
const allPosts = await getCollection('posts');
const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
const Menu = ({url}) => {
  const [openSection, setOpenSection] = useState(null);
  useEffect(() => {
    if (url.pathname.includes('tags')) {
      setOpenSection(url.pathname.split('/')[2]);
    }
    if (url.pathname.includes('posts')) {
      const id = url.pathname.split('/')[2];
      const post = allPosts.find((post) => post.slug === id);
      setOpenSection(post.data.tags[0]);
    }
  }, [url]);
  return (
    <div className="menu w-1/6">
      <div className="fixed">
        <h1 className="roboto-regular text-gray-950 mb-5">
          <a href="/" >Andrea Drev</a>
        </h1>
        <ol role="list" className="flex flex-col">
          {tags.map((tag, index) => (
            <li
              className={`roboto-thin-400 text-gray-500 hover:text-gray-700 text-xs ${openSection === index ? 'open' : ''}`}
            >
              <a href={`/tags/${tag}`} 
              className={`${openSection === tag ? 'font-bold' : ''}`}
            >{tag}</a>
              <ol className={`sub-sections ${openSection === tag ? 'open' : 'hidden'}`}>
                {allPosts
                  .filter((post) => post.data.tags.includes(tag))
                  .map((post) => (
                    <li className="roboto-thin-400 text-gray-400 hover:text-gray-700 text-xs">
                      <a href={`/posts/${post.slug}`}>{post.data.title}</a>
                    </li>
                  ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Menu;
