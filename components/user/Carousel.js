import { useState } from "react";
import styles from "../../styles/user/Carousel.module.css";
import Image from "next/image"

const Carousel= () => {
    const [index, setIndex ] = useState(0);
    const images = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg" ]
    const handleArrow = (direction) => {
        if (direction === "l") {
            setIndex(index !== 0 ? index - 1 : 2);
          }
          if (direction === "r") {
            setIndex(index !== 2 ? index + 1 : 0);
          }
        };
        return(
            <div className={styles.container}>
            <div
              className={styles.arrowContainer}
              style={{ left: 0 }}
              onClick={() => handleArrow("l")}
            >
              <Image
                src="/arrowl.png"
                alt="arrow"
                fill
                sizes="60vw"
                style={{
                  objectFit: "contain",
                  
                }}
              />
            </div>
      
            <div
              className={styles.wrapper}
              style={{ transform: `translateX(${-100 * index}vw)` }}
            >
              {images.map((img, i) => (
                <div className={styles.imgContainer} key={i}>
                  <Image
                    src={img}
                    alt="pic"
                    fill
                    sizes="80vw"
                    priority
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className={styles.arrowContainer}
              style={{ right: 0 }}
              onClick={() => handleArrow("r")}
            >
              <Image
                src="/arrowr.png"
                alt="arrow"
                fill
                sizes="80vw"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        )
      
    }






export default Carousel