import LightGallery from 'lightgallery/react';
import { useEffect } from 'react';
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
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import fjGallery from 'flickr-justified-gallery';

export default function Gallery({images}) {
    const [firstImage, ...restImages] = images;
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
    const onInit = () => {
        console.log('lg initialized');
    };
    if (!images) {
        return null;
      }
    return (
            <LightGallery
                onInit={onInit}
                speed={500}
                download={false}
                plugins={[lgThumbnail, lgZoom, lgVideo]}
                mode="lg-fade"
                pager={false}
                thumbnail={true}
                galleryId={'nature'}
                autoplayFirstVideo={false}
                elementClassNames={'gallery'}
                mobileSettings={{
                  controls: false,
                  showCloseIcon: false,
                  download: false,
                  rotate: false,
                }}
            >   
            {firstImage.src.includes('youtube') ? (
                <a
                    className="first"
                    data-src={`https://www.youtube.com/embed/${firstImage.src.split('v=')[1]}`}
                >
                    <img

                        alt={'image' || "video"}
                        src={`https://img.youtube.com/vi/${firstImage.src.split('v=')[1]}/0.jpg`}
                        className="gallery_cover_first mb-12"
                    />
                    <div className="lg-video-play-button"></div>
                </a>
            ) : (
                <a
                    href={firstImage.src}
                    data-sub-html={'image'}
                    
                    data-src={firstImage.src}
                >
                    <img  alt={'image' || 'image'} src={firstImage.src} className="gallery_cover_first mb-12" />
                </a>
            )}

                {restImages.map((image, index) => (
                    image.src.includes('youtube') ? (
                        <a
                            key={index}
                            className={`gallery__item ${index === 0 ? 'first' : 'rest'}`}
                            data-src={`https://www.youtube.com/embed/${image.src.split('v=')[1]}`}
                        >
                            <img 
                                alt={image.alt || 'video' } 
                                src={`https://img.youtube.com/vi/${image.src.split('v=')[1]}/0.jpg`}
                                className={`img-responsive ${index === 0 ? 'first' : 'rest'}`}
                                />
                            <div className="lg-video-play-button"></div>
                        </a>
                    ) : (
                        <a
                            key={index}
                            href={image.src}
                            data-sub-html={image.alt || 'image'}
                            className={`gallery__item ${index === 0 ? 'first' : 'rest'}`}
                            data-src={image.src}
                        >
                            <img alt={image.alt || 'image'} src={image.src} className={`img-responsive ${index === 0 ? 'first' : 'rest'}`} />
                        </a>
                    )
                ))}

            </LightGallery>
    );
}
