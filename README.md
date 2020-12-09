## Tabby-native

Tabby electron app for mobile devices made with **React Native**

(Build is available for **Android** & **Iphone**)

Desktop version (**Windows** & **MacOS**)
https://github.com/natixco/tabby

## Important

If the app does not work: (Android)
```
cd android
...
gradlew clean
```

If the app does not work: (IOS)
```
cd ios
...
pod install
```

( and make sure to use `npm i`)

## Screenshots
<table>
  <tr>
    <td><img src="/resources/screenshots/iphone-sc.png"/></td>
    <td><img src="/resources/screenshots/iphone-sc3.png"/></td>
  </tr>
  <tr>
    <td><img src="/resources/screenshots/iphone-sc2.png"/></td>
    <td><img src="/resources/screenshots/iphone-sc4.png"/></td>
  </tr>
  <tr>
    <td><img src="/resources/screenshots/screenshot-2.png"/></td>
    <td><img src="/resources/screenshots/screenshot-4.png"/></td>
  </tr>
 <tr>
    <td><img src="/resources/screenshots/screenshot-3.png"/></td>
    <td><img src="/resources/screenshots/screenshot-1.png"/></td>
  </tr>
</table>

## Installation
1. Install dependencies
```js
  npm i
```
```js
  cd ios/
  pod install
```
2. Link fonts
```js
  react-native link
```

## Translations

**Available languages**: English,Hungarian

To add your own language:
  1. Navigate to ***/resources/languages***
  2. Create a new file ***your_filename.json***
  3. Copy the content of ***en.json*** to your new language file
  4. Navigate to ***/resources/components/Redux/Reducers/MainReducer.js***
  5. Import your language:
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
  
To add your own language: 
**(Android)**

  1. Navigate to ***android/app/src/main/assets/languages***
  2. Create a new file ***your_filename.json***
  3. Copy the content of ***en.json*** to your new language file
  4. (Translate the values from english to your language)
  5. Make a fork of the repo, upload your translation and make a pull request or email us with the translation file and we will add it.
  
  **You don't need to import it, it'll be automatically included in the app, but you must exit and run it again**
  
**(IOS)**

  1. Open Xcode (from ios/tabby.xcodeproj)
  2. Drag & Drop or copy your language files to your xcode project (make sure to select your project as the target when copying)
  3. Make a fork of the repo, upload your translation and make a pull request or email us with the translation file and we will add it.
  
## Bugs
  Please open an issue if you've found a bug. 
