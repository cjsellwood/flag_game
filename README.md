# Flags

A game where the flags of each country are guessed, starting from the country with the highest population. The quicksort algorithm is implemented for the sorting of the countries and a trie is used to provide suggestions for countries when typing.

## Scripts

#### `npm run dev`
Run app in development mode with automatic reloading

#### `npm run build`
Create a production version of app for deployment

#### `npm run scripts`
Run the functions to fetch the country data from the <https://restcountries.com> API, clean the results, sort the countries, download the image of the flag of each country and generate a trie for the country names.

#### `npm run test:scripts`
Perform tests within the scripts folder. Includes tests for quicksort and trie.