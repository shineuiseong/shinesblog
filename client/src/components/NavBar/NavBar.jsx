import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const NavContainer = styled(motion.div)`
  width: 100vw;
  z-index: 6;
  position: absolute;
  top: ${(props) => (props.click ? '0' : `-${props.theme.navHeight}`)};

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s;
`
const MenuItems = styled(motion.ul)`
  position: relative;
  height: ${(props) => props.theme.navHeight};
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  list-style: none;

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  padding: 0 10rem;
`
const MenuBtn = styled(motion.li)`
  background-color: ${(props) => `rgba(${props.theme.textRgba},0.7)`};
  list-style-type: style none;
  color: ${(props) => props.theme.body};
  width: 15rem;
  height: 2.5rem;

  clip-path: polygon(0 0, 100% 0, 82% 100%, 18% 100%);

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;
  text-transform: uppercase;

  cursor: pointer;
`

const MenuItem = styled(motion.li)`
  z-index: 6;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
`

const container = {
  hidden: {
    y: '-100%',
  },
  visible: {
    y: 0,

    transition: {
      duration: 2,
      delay: 2,
    },
  },
}

const menuItemsDrag = {
  drag: {
    top: 0,
  },
  dragConstraints: {
    top: 0,
    bottom: 70,
  },
}
const menuItemHover = {
  whileHover: {
    scale: 1.1,
    y: -5,
  },
  whileTap: {
    scale: 0.9,
    y: 0,
  },
}

const NavBar = () => {
  const [isOpen, setMenu] = useState(false)

  const toggleMenu = () => {
    setMenu((isOpen) => !isOpen)
  }
  const ClicktoBlog = () => {
    window.location.href = '/blog'
  }

  return (
    <NavContainer click={isOpen} variants={container} initial="hidden" animate="visible">
      <MenuItems variants={menuItemsDrag} drag="drag" dragConstraints="dragConstraints" dragElastic={0.05} dragSnapToOrigin>
        <MenuBtn onClick={toggleMenu}>Menu</MenuBtn>
        <MenuItem variants={menuItemHover} whileHover="whileHover" whileTap="whileTap">
          Home
        </MenuItem>
        <MenuItem variants={menuItemHover} whileHover="whileHover" whileTap="whileTap">
          About
        </MenuItem>
        <MenuItem onClick={ClicktoBlog} variants={menuItemHover} whileHover="whileHover" whileTap="whileTap">
          Blog
        </MenuItem>
      </MenuItems>
    </NavContainer>
  )
}

export default NavBar
