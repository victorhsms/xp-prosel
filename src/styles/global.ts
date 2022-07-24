import { createGlobalStyle } from 'styled-components'

// Workaroud for https://github.com/styled-components/vscode-styled-components/issues/175
const styled = { createGlobalStyle }

export const GlobalStyles = styled.createGlobalStyle`
  // custom

  @media (max-width: 1080px) {
    body.scrollock {
      height: 100%;
      overflow: hidden;
    }
  }
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Global font family */
  * {
    font-family: 'Noto Sans', sans-serif;
  }

  /* Global background */
  body {
    background-color: #252822;
  }

  /* Remove default margin and padding */
  body,
  h1,
  ul,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    padding: 0;
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* Allow percentage-based heights in the application */
  html,
  body {
    height: 100%;
  }

  /* Add accessible line-height and improve text rendering */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
    color: inherit;
    text-decoration: none;
  }

  /* Make media tags easier to work with */
  img,
  picture,
  video,
  canvas,
  svg {
    max-width: 100%;
    display: block;
  }

  /* 8. Avoid text overflows */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Create a root stacking context */
  #root,
  #__next {
    isolation: isolate;
  }

  button {
    background: transparent;
    border: none;
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .modal {
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 30px 45px;
    width: 90%;
    max-width: max-content;

    @media (max-width: 750px) {
      padding: 15px 20px;
    }
  }

  .modal-overlay {
    position: fixed;
    inset: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
`
