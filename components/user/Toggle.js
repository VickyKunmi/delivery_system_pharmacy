// components/Toggle.js

// import React, { useState } from 'react';
import styles from "../../styles/user/Toggle.module.css";

// const Toggle = () => {
//   const [isToggled, setIsToggled] = useState(false);

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//   };

//   return (
//     <label className={styles.toggle}>
//       <input type="checkbox" checked={isToggled} onChange={handleToggle} />
//       <span className={styles.slider} />
//       {isToggled ? 'On' : 'Off'}
//     </label>
//   );
// };


import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Toggle = () => {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (isToggled) {
      router.push('/page1');
    } else {
      router.push('/page2');
    }
  };

  return (
    <label className={styles.toggle}>
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span className={styles.slider} />
      <span className="label">{isToggled ? 'Page 1' : 'Page 2'}</span>
    </label>
  );
};

export default Toggle;
