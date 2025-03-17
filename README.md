# Rock, Paper, Scissors, Lizard, Spock Extended solution - Frontend Mentor

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Additional features](#additional-features)
    - [Screenshots](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors (or Rock, Paper, Scissors, Lizard, Spock) against the computer
- Maintain the state of the score after refreshing the browser

### Additional features

In addition to the suggested challenges, the following features have been implemented:

- The option to choose between **Standard** (Rock, Paper, Scissors) and **Extended** (Rock, Paper, Scissors, Lizard, Spock) versions
- The selected game version is saved after refreshing the browser
- Separate score tracking for each version

### Screenshots

![Standard Version](/public/screenshots/screenshot_standard_version.png)
![Extended Version](/public/screenshots/screenshot_extended_version.png)

### Links

- Solution URL: [GitHub](https://github.com/SmartBlondie/rock-paper-scissors-lizard-spock)
- Live Site URL: [GitHub Pages](https://smartblondie.github.io/rock-paper-scissors-lizard-spock/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [Sass (SCSS)](https://sass-lang.com/) – For styles
- [Vue 3](https://vuejs.org/) – JavaScript framework
- Composition API – State management
- [Vite](https://vite.dev/) – Build tool
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) – Inline SVG support
- [Lodash](https://lodash.com/) – Utility library
- [Node.js & npm](https://nodejs.org/en) - Runtime and package manager

### What I learned

Throughout this project, I gained valuable insights and enhanced my skills in several areas:
1. **Composition API in Vue.js<br>**
   Transitioning from the `export default { setup() }` syntax to using `<script setup>` was a significant learning moment. While the traditional setup works in many scenarios, I found that `<script setup>` offers a cleaner and more concise way to work with the Composition API, especially in large projects. It allowed me to simplify the code and improve readability by eliminating the need to manually return variables and methods, as well as logically grouping related functionality.<br>
   - With `export default { setup() }`:
      ```js
        <script>
        import { computed } from "vue";
        
        export default {
          name: "SimpleButton",
          props: {
            label: {
              type: String,
              required: true,
            },
            buttonType: {
              type: String,
              default: 'primary',
            },
          },
          emits: ["button-click"],
          setup(props, context) {
            const getButtonTypeClass = computed(() => simple-button--${ props.buttonType });
        
            return {
              getButtonTypeClass,
            }
          }
        }
        </script>
      ```
   - With `<script setup>`:
      ```js
        <script setup>
        import { computed } from "vue";
        
        const props = defineProps({
          label: {
            type: String,
            required: true,
          },
          buttonType: {
            type: String,
            default: 'primary',
          },
        });
        
        defineEmits(['button-click']);
        
        const getButtonTypeClass = computed(() => `simple-button--${ props.buttonType }`);
        </script>
      ```
2. **Dynamic Icon Positioning with CSS Variables<br>**
   I learned how to dynamically position an icon on the homepage based on the selected game version. By using CSS variables (`--sides`, `--radius`, `--angle`), I calculated the exact position of the icon in relation to a background element, ensuring it aligns correctly with the figure in the background. The positioning depends on the number of sides and the rotation angle, which can vary based on whether the standard or extended version of the game is selected.
    ```js
    const getIconStyle = (index) => ({ "--i": index });
    
    const getBackgroundStyle = computed(() => {
        return {
            '--sides': isStandardVersion.value ? 3 : 5,
            '--triangle-turn': isStandardVersion.value ? '(180deg / var(--sides))' : '0deg',
        }
    });
    ```
    ```css
    &__icon {
      position: absolute;
      --angle: calc((360deg / var(--sides) * var(--i)) - 90deg + var(--triangle-turn));
      left: calc(50% + var(--radius) * cos(var(--angle)));
      top: calc(10%*var(--sides) + var(--radius) * sin(var(--angle)));
      transform: translate(-50%, -50%);
    }
    ```
3. **Complex Box Shadows in CSS<br>**
   One of the challenges I faced was adding a shadow effect to both the inner and outer circles. Initially, I struggled with how to apply the shadow to the border. Eventually, I achieved the desired effect by utilizing pseudo-elements (`::before` and `::after`), where the outer circle became a `::before` element with its own shadow and the inner circle a `::after` element.
    ```css
      &::before {
          content: "";
          width: var(--throw-icon-size);
          height: var(--throw-icon-size);
          background: var(--bg-color);
          border-radius: 50%;
          box-shadow: inset 0 -6px 2px var(--overlay-shadow);
          grid-area: 1 / 1;
      }
      
      &::after {
          content: "";
          width: calc(var(--throw-icon-size) / 4 * 3);
          height: calc(var(--throw-icon-size) / 4 * 3);
          background-color: var(--text-primary);
          border-radius: 50%;
          grid-area: 1 / 1;
          box-shadow: inset 0 6px 2px var(--overlay-shadow);
      }
    ```
4. **Efficient Use of `localStorage` for Persistent State<br>**
   I realized that for a smoother user experience, changes made to `localStorage` should be saved immediately after each update, rather than waiting for a later action. This ensures that the game state is consistently preserved across sessions.
    ```js
    watch(() => isStandardVersion.value, (value, oldValue) => {
    setScoreToStorage(oldValue);
    setTimeout(() => {
        getScoreFromStorage();
    },250)
    });
    ```

### Continued development

In future projects, I plan to continue focusing on the following areas to further refine my skills:

1. **Vue 3 Composition API<br>**
   While I've made great progress using the Composition API, I aim to deepen my understanding and gain more experience in its advanced use cases, such as managing complex state across multiple components and implementing reusable logic through custom composition functions.
2. **Dynamic Layouts and Responsiveness<br>**
   Although I’ve worked with responsive design, I want to refine my skills in creating truly dynamic layouts that adapt seamlessly to various screen sizes and orientations, especially with more complex UI components that require precise positioning and flexibility.
3. **Optimizing Performance<br>**
   I would like to continue learning about optimizing web performance, especially in terms of reducing load times, improving rendering speed, and leveraging techniques like lazy loading, code splitting, and caching to deliver faster and more efficient applications.
4. **CSS Grid and Advanced Layout Techniques<br>**
   While I’m comfortable with Flexbox, I’d like to dive deeper into CSS Grid and other advanced layout systems to handle more complex designs, particularly for responsive and modular layouts.

## Author

- LinkedIn - [Varvara Isaeva](https://www.linkedin.com/in/varvara-isaeva-388421332/)
- Frontend Mentor - [@SmartBlondie](https://www.frontendmentor.io/profile/SmartBlondie)
- GitHub - [@SmartBlondie](https://github.com/SmartBlondie)