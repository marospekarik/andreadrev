function Menu({url, posts, tags}) {
  var openSection = null;
  if (url.pathname.includes('tags')) {
    openSection = decodeURIComponent(url.pathname.split('/')[2])
  }
  if (url.pathname.includes('posts')) {
    const id = url.pathname.split('/')[2];
    const post = posts.find((post) => post.slug === id);
    openSection = post?.data?.tags[0]
  }
  return (
    <div className="menu w-1/6">
      <div className="fixed">
        <h1 className="roboto-regular text-gray-950 mb-5">
          <a href="/about" >Andrea Drev</a>
        </h1>
        <ol role="list" className="flex flex-col">
          {tags.map((tag, index) => (            <li
              className={`roboto-thin-400 text-gray-500 hover:text-gray-700 text-xs ${openSection === index ? 'open' : ''}`}
            >
              <a href={`/tags/${tag}`} 
              className={`${openSection === tag ? 'font-bold' : ''}`}
            >{tag}</a>
              <ol className={`sub-sections ${openSection === tag ? 'open' : 'hidden'}`}>
                {posts
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
