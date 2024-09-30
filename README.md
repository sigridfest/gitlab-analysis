# Project 2 - Repo statistics

## How to use:

To look at the repo statics the user need only fill in two field, a link to the repository and provide their access token.

The reposiory link should be on the form `https://www.gitlab.com/<projectSpecificPart>`

The access token has to be generated on gitlab, we recommend making a specific read-only access token for the purposes of using this utility page.

## What is included

We have chosen to display statistics on

-   Percentage of programming languages used, displayed as a pie chart.

-   Commits over time, displayed as a bar chart. This graph can be costumized to see commits in a particular period of time. Customization allows the user to select either per day of the week, per month of the year, or per year.

The page also consists of a form to submit the repo link and access token, as well as a list of previously used repo links.

### Components

We have made seperate components for each element of the UI, as the graphs are all of different variations. They are all organised in a folder named components. The primary components are functional, while the Title component is a class component.

Title component was made as a class due to requirements of the project. We generally found little point in the class components compared to functional components. In general the functional components yielded smaller and easier to write code, while also seeming to have more prevalence in online resources.

The Input-component is implemented manually. Other components, such as the pull-down menu for dates, are from external libraries. Specifically react-bootstrap(Input) and react-select(CommitsGraph). For the different graphs, we have utilized the chartjs-2 library.

The ListRepo-component takes in an array of Repository URLs for the input component, and creates an unordered list of repo inputs. The array is first transferred from input to App via state management, then Context API is used in order to access it from ListRepo. ListRepo also contains functionality to hide list title if the RepoList array is empty.

The CommitsGraph component takes in two strings as props. These are the bearer token and the repository url. These are processed and returns the right format to access the API. After accessing the API with axios, it performs some data processing on the API-response to get the commits per year, month and days of the week. Finally it returns a barchart that displays this data.

The Languages component is similar to the CommitsGraph, using the same Chartjs-2 library to display a Pie chart.

### API

Api calls, consisting of only get requests to some gitlab repository, is performed using [axios](https://github.com/axios/axios). Axios provides easy to use and implement html requests, and was therefore considered the obvious choice to handle api calls. Gitlab require api token to access repositories, which was easily solved by configuring axios to include the token in the header

```

axiosConfig = {
headers: {'PRIVATE-TOKEN': <Access token>}
}

```

### Storage

We have implemented the use of localStorage and sessionStorage in Input, where the last submitted input of repository is saved to local storage, and token is saved to session storage.

### Responsive design

To make the design responsive while maintaining a clean layout, we have placed all components in a flexbox column. Because we did not include many components, the flexbox solution with a single column was a better option than for example a grid. Using viewport, the UI is dynamic according to the size of browser. We have included a media query to adjust the component size when on smaller devices like an iPhone.

The project is based in node.js 16 and uses npm 18 and React 18.

## Testing

The project is set up with Jest as a testing framework. We have used Babel to handle the translate of the Typescript code for Jest. The initial idea was to make all tests run in CI with pipeline status and code coverage displayed wih badges, technical difficulties have forced us to abandon this idea and all tests are just run locally to check that they pass.

All of the tests are contained within the `src/tests` folder. There is a snapshot test in `Languages.test.tsx`.

We had implemented a simple component test in (now known as) Input.NotRunningtest.tsx, however we had to leave it out as it caused some conflicts in the final product. It used fireEvent to test whether the button in the input form changes color when the mouse leaves it. Because the component test would not run using the default node.js testing environment, we configured all tests to run in both the node and jsdom environment when npm test is run. It would then succeed in the jsdom environment. The configuration is left out of the final product.

### UX testing

The responsive design has been tested on desktop using different browser window sizes. It has also been tested on mobile(iPhone SE) and tablet(Microsoft Surface Go 2) in both vertical and horizontal mode.

The following devices were tested:

1. iPhone SE (4.7'', 1334x750) - Considered representative for phones

2. Surface Go 2 (10.5'', 1920x1080) - In vertical mode, considered representative for tablets

3. Surface Pro 6 (12.3'', 2736x1824) - Considered representative for 13'' laptops.

4. Display monitor (30''+ (The one in U1 vrimle), 1920x1080) - Considered representative for large displays.

The design was based on looking good for the iPhone SE, then adapted for the larger display sizes.
