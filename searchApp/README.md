-------------------------------
TWITCH SEARCH APP
-------------------------------

Components:
--------------------------------

-- app (Main App Directory)

     -- widgets
        -- appLayout
           A general app layout widget module, wherein we can pass config about
           which element on the page do we want this app to be attached to.
           Consists of the css file and the constructor class called appLayout.

        -- feed
           A feed list widget module.
           It gets updated on any new search query result or page update.
           Consists of the css file and the constructor class called feed.

        -- feedCard
           A feed card widget module which contains the UI for each feed item in the
           feed list.
           It contains information about the feed item like title, viewers,
           description, image and link to the feed item.
           Consists of the css file and the constructor class called feedCard.

        -- paginationHeader
           A paginationHeader widget module which contains the UI for pagination of the
           feed list.
           It contains information about the total results, current page no, total
           pages of results.
           It has right and left buttons to navigate through remaining results.
           Consists of the css file and the constructor class called paginationHeader.

        -- search
           A search widget module which contains the UI for search bar section of the app.
           It contains a search box and search button.
           We can search for results by either hitting the enter button or clicking on
           the search button.
           Additionally it shows recent search results, which I am simulating on the client
           side for now, but preferred would be to maintain on BE.
           Consists of the css file and the constructor class called paginationHeader.


    --- css
        -- common.css
           Include common styles shared across the different components, classes like
           loader, disabled, flex, hidden etc.

        -- searchApp.css
           Contains styles specific to the search app.

    --- libraries
        --Modernizer
          Using 3rd party library to help with cross browser styles compatibility.

    --- services
        --searchService
          A service to get the query results from the search api.

        --commonService
          -Provides common methods to add css class name, remove css class name, check if css
           class name is present etc.

    --- searchApp.js
        The feed, search, paginationHeader widgets are dynamically injected into the DOM when
        the appLayout component is instantiated.

    --- searchApp.html
        Entry Point for Application. Contains the general layout of the Search App.


---------------------------------------------------------------------------------------

CHOICE OF BROWSERS TO RUN THE APPLICATION: CHROME OR FIREFOX(latest versions preferred)


---------------------------------------------------------------------------------------



How to run the app:
------------------

Go to this link: https://srhemdev.github.io/searchApp/app/searchApp.html

Additionally you can clone the link: git clone https://srhemdev.github.io/searchApp
to get the app and run the searchApp.html from your localhost available in your choice
of editor.

Improvements:
-------------
- I have not used any MVC frameworks to create this application. It is purely based
on Javascript as suggested in the Problem Statement.
- Can add unit tests and also karma configuration to run unit tests.
- Add gulp configuraton.
- Can use SASS framework to simplify stylesheets capitalizing on its abilities.
- Can cache the queries, if we use Ajax we can request for a cache response header from server
  so that we avoid making calls to fetch results for same query.
  This call can be made again based on the Expires Header.









