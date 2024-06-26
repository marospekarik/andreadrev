
function processTag(tag) {
  if(tag === 'Photography') {
    return "Photo"
  } 
  return tag
}


function Menu({url, posts, tags}) {
  var openSection = null;
  if (url?.pathname?.includes('tags')) {
    openSection = decodeURIComponent(url.pathname.split('/')[2])
  }
  if (url?.pathname?.includes('posts')) {
    const id = url.pathname.split('/')[2];
    const post = posts.find((post) => post.slug === id);
    openSection = post?.data?.tags[0]
  }
  return (
    <div className="menu my-2 md:my-0 md:w-1/6 lg:w-2/12 xl:w-1/12">
      <div className="md:fixed flex flex-col md:items-start ">
        <h1 className="roboto-regular text-gray-950 md:mb-5 self-center md:self-start">
          <a href="/about">Andrea Drev</a>
        </h1>
        <ol role="list" className="flex flex-row md:flex-col justify-evenly">
          {tags.map((tag, index) => (            <li
              className={`md:ml-0 roboto-thin-400 text-gray-500 hover:text-gray-700 text-xs ${openSection === index ? 'open' : ''}`}
            >
              <a href={`/tags/${tag}`} 
              className={`${openSection === tag ? 'font-bold' : ''}`}
            ><span className="md:hidden">{processTag(tag)}</span><span className="hidden md:block">{tag}</span></a>
              <ol className={`sub-sections hidden ${openSection === tag ? 'open md:block' : 'hidden'}  `}>
                {posts
                  .filter((post) => post.data.tags.includes(tag))
                  .map((post) => (
                    <li className="roboto-thin-400 text-gray-400 hover:text-gray-700 text-xs">
                      <a href={`/posts/${post.slug}`}>- {post.data.title} <span className=" font-mono">{post.data.year}</span></a>
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
