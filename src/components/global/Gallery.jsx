import LightGallery from 'lightgallery/react';

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

export default function Gallery({images}) {
    console.log(images);
    const onInit = () => {
        console.log('lightGallery has been initialized');
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
            >   
               {images.map((image, index) => (
                    image.src.includes('youtube') ? (
                        <a
                            key={index}
                            className="gallery-item"
                            data-src={`https://www.youtube.com/embed/${image.src.split('v=')[1]}`}
                        >
                            <img 
                                alt={image.alt} 
                                src={image.src} 
                                style={{ maxWidth: '400px' }}
                                className="img-responsive" />
                            <div className="lg-video-play-button"></div>
                        </a>
                    ) : (
                        <a
                            key={index}
                            href={image.src}
                            data-sub-html={image.alt}
                            className="gallery-item"
                        >
                            <img alt={image.alt} src={image.src} />
                        </a>
                    )
                ))}
            </LightGallery>
    );
}
