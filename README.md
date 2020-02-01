## Tabby-native

Tabby electron app Native port made with **React Native**

(Build is available for **Android**)

Desktop version (Windows and Mac)
https://github.com/natixco/tabby

## Screenshots
| First Header  | Second Header |
:-------------------------:|:-------------------------:
<img src="/resources/screenshots/screenshot-2.png" /> |  <img src="/resources/screenshots/screenshot-4.png>
<img src="/resources/screenshots/screenshot-3.png" /> |  <img src="/resources/screenshots/screenshot-1.png>
<img src="/resources/screenshots/screenshot.png" width="360" />
## Translations

**Currently available languages**: English

To add your own language:
  1. Navigate to ***/resources/languages***
  2. Create a new file ***your_filename.json***
  3. Copy the content of ***en.json*** to your new language file
  4. Navigate to ***/resources/components/Redux/Store.js***
  5. Import your language like:
  ```js
  import en from '../../en.json';
  ```  
  Your import would look like:
  ```js
  import <code> from '../../<your_filename>.json';
  ```  
  6. Add your imported language to the languages object
  ```js
  languages:{
        en,
        <code> // your imported language
    }
  ```
  7. Make a fork of the repo, upload your translation and make a pull request or email us with the translation file and we will add it.

## Bugs
  Please open an issue if you've found a bug. 
