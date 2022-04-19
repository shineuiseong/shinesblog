import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 100%;
  color: ${(props) => props.theme.text};
  z-index: 5;

  a {
    display: flex;
    align-items: flex-end;
  }

  svg {
    width: 4rem;
    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;

    path {
      fill: ${(props) => props.theme.text};
      stroke: ${(props) => props.theme.text};
    }
  }
`

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
`

const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,
    transition: {
      duration: 2,
      delay: 2,
      ease: 'easeInOut',
    },
  },
}

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
}

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M665.941 222.251C719.896 161.501 710.423 65 710.423 65s-96.923 2.066-150.892 62.831c-53.955 60.808-44.497 157.28-44.497 157.28S611.986 283.073 665.941 222.251zM581.823 147.605c27.486-30.95 70.164-43.813 98.887-49.124-1.862 29.131-9.56 73.031-37.046 103.98-27.326 30.804-70.121 43.726-98.902 49.095C546.639 222.396 554.351 178.555 581.823 147.605z"
          />

          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M852.439 389.906c0 0-52.907-97.156-152.552-103.85-99.644-6.737-140.546 48.367-178.96 44.104s-115.286-87.756-237.149-16.122c-87.902 51.597-165.036 191.591-123.304 345.248 41.703 153.628 142.235 294.028 207.713 298.307 65.42 4.263 112.915-38.414 152.74-37.003 39.84 1.426 92.471 31.896 130.885 37.265 38.414 5.428 139.44 1.135 223.37-237.877C875.183 719.978 634.729 587.666 852.439 389.906zM667.905 929.204c-0.015 0 0 0-0.015 0-3.957 0-7.857-0.276-11.902-0.858-14.1-1.965-33.234-9.08-51.729-15.948-27.297-10.142-55.525-20.633-82.271-21.593l-3.012-0.044c-22.422 0-43.478 8.57-65.77 17.65-23.776 9.676-48.353 19.687-75.795 19.687-2.401 0-4.831-0.087-7.29-0.247-42.387-2.765-139.179-122.692-180.896-276.379-36.261-133.562 27.269-263.385 109.641-311.737 28.403-16.704 55.235-24.809 82.023-24.809 35.97 0 66.032 15.133 90.171 27.297 16.952 8.527 31.575 15.89 46.577 17.563 2.532 0.277 5.064 0.408 7.61 0.408 20.531 0 38.895-8.861 58.349-18.247 25.887-12.499 55.221-26.657 99.601-26.657 4.729 0 9.618 0.16 14.682 0.495 57.563 3.87 97.156 45.093 115.927 69.844-61.303 61.87-88.614 125.035-81.193 188.012 9.37 79.578 72.273 134.275 106.425 158.473C790.686 859.447 730.314 929.204 667.905 929.204z"
          />
        </svg>
        <Text variants={textVariants} initial="hidden" animate="visible">
          Euiseong
        </Text>
      </Link>
    </Container>
  )
}

export default Logo
