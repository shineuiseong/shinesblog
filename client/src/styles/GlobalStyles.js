import { createGlobalStyle } from 'styled-components'
import '@fontsource/kaushan-script'
import '@fontsource/sirin-stencil'
import '../common/fonts.css'

const GlobalStyles = createGlobalStyle`


*,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    font-family: "Spoqa Han Sans Neo", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
    overflow-x: hidden;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
a{
    color:inherit;
    text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#root {
  min-height: 100%;
}

`

export default GlobalStyles
