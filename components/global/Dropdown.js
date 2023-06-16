import { Menu, MenuButton, MenuList, useDisclosure } from "@chakra-ui/react";
import styles from "../../styles/user/Header.module.css";



export const Dropdown = ({ title, childeren }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <li>
      <Menu isOpen={isOpen}>
        <MenuButton
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          className={styles.dropbtn}
        >
          {title} {isOpen}
        </MenuButton>
        <MenuList
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          className={styles.dropDown}
        >
          {childeren}
        </MenuList>
      </Menu>
    </li>
  );
};
