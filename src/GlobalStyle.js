import { createGlobalStyle } from "styled-components";
// import resetStyle from './resetStyle';


const breakpoints = {
    desktop: '920px',
}

const GlobalStyle = createGlobalStyle`
    html {

        --sidebar-width: 210px;

        // ================================================================= Colors
        --color-primary: #0093fa;
        --color-primary-rgba: rgba(0, 147, 250, 1);
        --color-primary-hover: #008ff5;
        --color-secondary: #03a9f4;
        --color-secondary-rgba: rgba(3, 169, 244, 1);
        --color-secondary-hover: #028ccc;
        --color-border: #eef0f2);
        --color-border-hover: #0093fa;
        --color-border-valid: #ced4da;
        
        --main-color: #009efa;
        --title-color: #497fc3;
        --text-dark-color: #161212;
        --text-gray: #626070;
        --text-color-light: #8f8a8a; 
        --icon-color: #009efa;
        --border-color: #eef0f2;
        --border-hover-color: #009efa;
        --border-valid-color: #ced4da;
        --line-color: #d2d6da;
        --body-color: #fbfbfb;
        // #467bef
        // #4895ef
        // ================================================================= Margents
        --mb-1: .5rem;
        --mb-2: 1rem;
        --mb-3: 1.5rem;
        --mb-4: 2rem;
        --mb-5: 2.5rem;
        --mb-6: 3rem;

        --space-0: 0;
        --space-1: 5px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
        --space-5: 22px;
        --space-6: 30px;
        --space-7: 36px;
        --space-7: 44px;
        --space-8: 60px;
        --space-9: 80px;
        --space-10: 110px;
        
        // ================================================================= Font
        // =========================== Font Size
        --primary-font: "Poppins", sans-serif;
        --fsize-1: 8px;
        --fsize-2: 9px;
        --fsize-3: 11px;
        --fsize-4: 13px;
        --fsize-5: 15px;
        --fsize-6: 20px;
        --fsize-7: 26px;
        --fsize-8: 34px;
        --fsize-9: 44px;
        --fsize-10: 55px;
        --height-input: var(--space-4);
        --height-button: var(--space-4);
        --min-width-button: var(--space-4);
        --px-button: var(--space-2);

        --biggest-font-size: 2.25rem;
        --h1-font-size: 1.55rem;
        --h2-font-size: 1.25rem;
        --h3-font-size: 1.12rem;
        --h4-font-size: 1rem;
        --h5-font-size: .985rem;
        --h6-font-size: .975rem;
        --bigger-font-size: .968rem;
        --normal-font-size: .938rem;
        --small-font-size: .813rem;
        --smaller-font-size: .76rem;
        --smallest-font-size: .618rem;

        // =========================== Font Weight
        --font-medium: 500;
        --font-semi-bold: 600;
        --font-bold: 700;
        
        @media(max-width: ${breakpoints.desktop}) {
            --height-button: calc(var(--space-4) + 8px);
            --px-button: calc(var(--space-2) + 8px);
        }
    }

    *, ::before, ::after {
        box-sizing: inherit;
        -webkit-box-sizing: inherit;
        -moz-box-sizing: inherit;
        margin: 0;
        padding: 0;
        outline: none;
    }
    body {
        font-family: "Poppins", sans-serif;
        font-size: var(--normal-font-size);
        color: var(--text-dark-color);
    }
    ul, li {
        padding: 0;
        list-style: none;
    }
    a, a:hover  {
        text-decoration: none;
    }
    h1, h2, h3, h4, h4, h5, h6 {
        font-weight: var(--font-medium);
    }
    h1 {
        font-size: var(--h1-font-size);
    }
    h2 {
        font-size: var(--h2-font-size);
    } 
    h3 {
        font-size: var(--h3-font-size);
    }
    h4 {
        font-size: var(--h4-font-size);
    }
    h5 {
        font-size: var(--h5-font-size);
    }
    h6 {
        font-size: var(--h5-font-size);
    }
    p {
        font-size: var(--normal-font-size);
    }
`;

export default GlobalStyle;
export { breakpoints }