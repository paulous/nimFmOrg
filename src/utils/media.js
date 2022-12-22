import {css} from "styled-components"

/*
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}
*/
export const sizes = {
    desktop: 2560,
    laptopL: 1440,
    laptop: 1440,
    tablet: 768,
    phone: 576,
    mobileS: 320
  }

export default Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }
    `    
    return acc
}, {})