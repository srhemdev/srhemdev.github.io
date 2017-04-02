-------------------------------
HOME AUTOMATION CONTROL APP
-------------------------------

Components:
--------------------------------

-- app (Main App Directory)

     -- modules
        -- curtainsControl
            An independent curtains module which can be used to control the
            lights of the house. It is a control which is created off the
            switchControl Factory class. In addition to the available common functions,
            contains functionality to control the curtains range based on scale from 0-100
            (ranging from slightly open to fully open);

        -- lightsControl
            An independent lights module which can be used to control the
            lights of the house. It is a control which is created off the
            switchControl Factory class. In addition to the available common functions,
            contains functionality to control the light range based on scale from 0-100.
            (ranging from dim to bright)

        -- switchControl
            An factory module which can be used to generate different controls based on the
            type of control you wish to create. Contains some basic common functions which
            can be shared across different modules

        -- temperatureControl
           An independent temperature module which can be used to control the
           temperature of the house. It is a control which is created off the
           switchControl Factory class. In addition to the available common functions,
           contains functionality to control the temperature range.


    --- css
        -- common.css
           Include common styles shared across the different components, classes like
           toggles, disabled, flex, hidden etc.

        -- control-panel.css
           Contains styles specific to the control panel.

    --- data
        Mock data response(to simulate get and update values for the different switch controls)
        Due to lack of server we are manually updating values on client side.

        --curtain-state.json
          curtain status

        --light-state.json
          light status

        --temperature.json
          temperature status

        -- mock-data.js
           Returns back the object service exposing path to the above json files.

    --- libraries (Imported 3rd Party libraries)
        Have stored the following libraries locally to avoid making HTTP requests to retrieve
        the library.
        -- jQuery(from jquery.com)
           Used across the app to access element values.

        -- Modernizer
           Used to help maintain cross browser compatibility with respect to styles and browser
           support.

        -- Material Icons(from Google Material Design)
           Used font icons to add symbols for different controls.

    --- control Panel.js
        Configures the controls you want to see on your control panel.

    --- controlPanel.html
        Entry Point for Application. Contains the general layout of the control panel.
        The home automation controls are dynamically injected into the DOM depending on which
        ones you would like to add to your list of controls.

---------------------------------------------------------------------------------------
CHOICE OF BROWSERS TO RUN THE APPLICATION: CHROME OR FIREFOX(latest versions preferred)
---------------------------------------------------------------------------------------



How to run the app:
------------------
Option 1:(RECOMMENDED)
---------
The same version of this app is available on a plunker.
It has slight modification just to get it up and running on plunker.

Here is the link:
https://plnkr.co/edit/8D3gCrjhMj1mXOJdJG3T?p=preview

Please make sure to click on STOP and then RUN, so that the styles are
rendered correctly.

Option 2:
---------
-Open the file in your local editor(eg: Sublime or Webstorm if available)
-Right Click on the file control-panel.html, there will be an option at
the bottom to Open in Browser(Choose Chrome or Firefox)
-A page will open up in your browser with similar URL:
http://localhost:63342/House-Automation/home-automation/app/control-panel.html

P.S:
----
I have not used any web server to run the code.

Improvements:
-------------
- We can always add a local web server or http server using npm to run this code
locally on a web server.
- I have not used any MVC frameworks to create this application. It is purely based
on Javascript and jQuery as suggested in Problem Statement.
- Can add unit tests and also karma configuration to run unit tests.
- Add gulp configuraton.
- Can use SASS framework to simplify stylesheets capitalizing on its abilities.









