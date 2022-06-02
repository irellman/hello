import {FC, useEffect, useMemo, useRef, useState} from "react";
import ArrowIcon from "components/icons/ArrowIcon";
import styles from "./Carousel.module.scss";
import {useAppSelector} from "hooks/redux";

interface props {
  images: string[]
}

const Carousel: FC<props> = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const container = useRef<any>();
  const windowWidth = useAppSelector(state => state.appReducer.width);

  const width = useMemo(() => {
    if (windowWidth > 620) {
      return 620;
    } else {
      return windowWidth;
    }
  }, [windowWidth])

  function prevImage() {
    if(activeImageIndex - 1 === -1) {
      setActiveImageIndex(images.length - 1);
    } else {
      setActiveImageIndex(activeImageIndex - 1);
    }
  }

  function nextImage() {
    if(activeImageIndex + 1 === images.length) {
      setActiveImageIndex(0);
    } else {
      setActiveImageIndex(activeImageIndex + 1);
    }
  }

  return (
    <div className={styles.container} ref={container}>
      {images.length >= 2 &&
        <div className={styles.controls}>
          <div className={styles.arrows}>
            <div className={styles.arrow} onClick={() => prevImage()}>
              <ArrowIcon className={styles.icon_left} size={15} color="rgb(40, 40, 40)" />
            </div>
            <div className={styles.arrow} onClick={() => nextImage()}>
              <ArrowIcon className={styles.icon_right} size={15} color="rgb(40, 40, 40)" />
            </div>
          </div>
          <div className={styles.indexing}>
            {images.map((_, index) => {
              return <div
                className={activeImageIndex === index ? styles.index_active : styles.index}
                onClick={() => setActiveImageIndex(index)}
                key={index}
              />
            })}
          </div>
        </div>
      }
      <div
        className={styles.images}
        style={{
          marginLeft: `-${activeImageIndex * width}px`,
          gridTemplateColumns: `repeat(${images.length}, ${width}px)`
        }}
      >
        {images.map((image: string, index: number) => {
          return (
            <div className={styles.image_container} style={{maxHeight: `${width}px`}} key={index}>
              <img className={styles.image} src={`http://127.0.0.1:8000${image}`} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Carousel;
