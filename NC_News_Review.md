# Tara Galloway - CryLittleSister

https://github.com/CryLittleSister/FE-FT-NC-News

## Overall

- Remove extra READMEs - just have yours: call it README.md. This is what will show automatically on your GitHub repo
- Also, write a readme. Something like https://gist.github.com/PurpleBooth/109311bb0361f32d87a2 but adapt as necessary.
- Remove App.test.js if you aren’t using it
- Some Components are .js, some are .jsx. Choose one, just for the sake of keeping it tidy and consistent
- Need something on home page - too much white space

## UX

- Can only vote once through UI but on refresh it appears all clicks called api
- Voting on a comment changes article votes
- Dates are (too?) precise: Thu Aug 18 2016 13:07:52 GMT+0100 (BST), could use moment / dayjs to change to more human readable string?
- Very responsive on small screen sizes.
- Maybe articles page could do with some more info rather than just title
- User avatar is not correct aspect ratio
- Newly added comment doesn’t display on page
- Can’t post article - keeps saying please choose a topic
- Deleting a comment doesn’t remove it from the page
- Maybe over use of alert. Not many modern websites use alert often.
- Would expect `/articles` to show articles

## Code

- Nice that all api functions are extracted into their own file
- Could destructure data from axios response. Prevents having data.data.
- Great DRY general function for getSingleItem
- If you aren’t passing down props, use `component` in route
- Good that you are using prop-types
- I would extract `post comment` part into its own component so that typing doesn’t cause a re-render of much larger parent component.
- Nested routes lack clarity - could make another api call to get articleByTopic, instead of filtering articles
- displayArticlesByTopic does essentially the same thing as Articles.
- Wrong article ID renders `loading…` forever
- Topics accepts an unused argument `p`
- UserBar: for conditional rendering with only two outcomes, use a ternary
- Remove commented out lines of code.
- Excellent reusable Vote component
- Css: break up into component files
- Don’t need polyfills like “-o-moz-linear-gradient”. Create-react-app uses webpack to do this for us when we `npm run build`
