import LightGallery from 'lightgallery/react';
import { useEffect, useRef, useCallback, useState } from 'react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import fjGallery from 'flickr-justified-gallery';


export default function Gallery({images, shouldRenderCarousel = true}) {
    useEffect(() => {
        fjGallery(document.querySelectorAll('.gallery'), {
          itemSelector: '.gallery__item',
          rowHeight: 180,
          lastRow: 'start',
          gutter: 2,
          rowHeightTolerance: 0.1,
          calculateItemsHeight: false,
        });
      }, []);

    const containerRef = useRef(null);
    const [galleryContainer, setGalleryContainer] = useState(null);

    const onInit = useCallback((detail) => {
        if (detail && shouldRenderCarousel) {
            detail.instance.openGallery();
        }
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setGalleryContainer(containerRef.current);
        }
    }, []);
    if (images.length === 0 || !images) {
        return null;
      }
    return (
        <div>
            {shouldRenderCarousel && <div style={{ height: '800px' }} ref={containerRef}></div>}
            <LightGallery
                container={shouldRenderCarousel && containerRef.current}
                onInit={onInit}
                speed={500}
                download={false}
                plugins={[lgThumbnail, lgVideo]}
                mode="lg-fade"
                pager={false}
                thumbnail={true}
                galleryId={'nature'}
                autoplayFirstVideo={false}
                elementClassNames={'gallery'}
                closable={!shouldRenderCarousel}
                hash={false}
                dynamic={shouldRenderCarousel}
                appendSubHtmlTo={'.lg-item'}
                dynamicEl={shouldRenderCarousel && images.map((image) => {
                    return {
                        src: image,
                        thumb: image,
                        alt: 'image',
                    };
                })}
                mobileSettings={{
                  controls: false,
                  showCloseIcon: false,
                  download: false,
                  rotate: false,
                }}
            >   
            <GalleryItems shouldRenderCarousel={shouldRenderCarousel} images={images} />

            </LightGallery>
            </div>
    );
}

const GalleryItems = ({ shouldRenderCarousel, images }) => {
    if (shouldRenderCarousel) return null;

    const firstImage = images[0];
    const restImages = images.slice(1);

    return (
        <>
            {firstImage.includes('youtube') ? (
                <a
                    className="first hidden md:block"
                    data-src={`https://www.youtube.com/embed/${firstImage.split('v=')[1]}`}
                >
                    <img
                        alt="video"
                        src={`https://img.youtube.com/vi/${firstImage.split('v=')[1]}/0.jpg`}
                        className="gallery_cover_first md:mb-12"
                    />
                    <div className="lg-video-play-button"></div>
                </a>
            ) : (
                <a
                    href={firstImage}
                    data-sub-html="image"
                    className="first hidden md:block"
                    data-src={firstImage}
                >
                    <img alt="image" src={firstImage} className="gallery_cover_first md:mb-2" />
                </a>
            )}

            {restImages.map((image, index) => (
                image.includes('youtube') ? (
                    <a
                        key={index}
                        className={`gallery__item ${index === 0 ? 'first' : 'rest'}`}
                        data-src={`https://www.youtube.com/embed/${image.split('v=')[1]}`}
                    >
                        <img
                            alt={image.alt || 'video'}
                            src={`https://img.youtube.com/vi/${image.split('v=')[1]}/0.jpg`}
                            className={`img-responsive ${index === 0 ? 'first gallery_cover_first' : 'rest'}`}
                        />
                        <div className="lg-video-play-button"></div>
                    </a>
                ) : (
                    <a
                        key={index}
                        href={image}
                        data-sub-html={image.alt || 'image'}
                        className={`gallery__item ${index === 0 ? 'first' : 'rest'}`}
                        data-src={image}
                    >
                        <img alt={image.alt || 'image'} src={image} className={`img-responsive ${index === 0 ? 'first gallery_cover_first' : 'rest'}`} />
                    </a>
                )
            ))}
        </>
    );
};

// const GalleryItems = ({ shouldRenderCarousel, restImages }) => {
//     if (shouldRenderCarousel) return null;

//     return (
//         <>
//             {restImages.map((image, index) => (
//                 image.includes('youtube') ? (
//                     <a
//                         key={index}
//                         className={`gallery__item ${index === 0 ? 'first' : 'rest'}`}
//                         data-src={`https://www.youtube.com/embed/${image.split('v=')[1]}`}
//                     >
//                         <img
//                             alt={image.alt || 'video'}
//                             src={`https://img.youtube.com/vi/${image.split('v=')[1]}/0.jpg`}
//                             className={`img-responsive ${index === 0 ? 'first gallery_cover_first' : 'rest'}`}
//                         />
//                         <div className="lg-video-play-button"></div>
//                     </a>
//                 ) : (
//                     <a
//                         key={index}
//                         href={image}
//                         data-sub-html={image.alt || 'image'}
//                         className={`gallery__item ${index === 0 ? 'first' : 'rest'}`}
//                         data-src={image}
//                     >
//                         <img alt={image.alt || 'image'} src={image} className={`img-responsive ${index === 0 ? 'first gallery_cover_first' : 'rest'}`} />
//                     </a>
//                 )
//             ))}
//         </>
//     );
// };