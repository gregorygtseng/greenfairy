## Installation

* For the typical User: you will need to:
-------------------------------------------
  1) open chrome and under the menu go to settings, then extensions.
  2) remove any old greenFairy extension
  3) download the greenFairy.crx file (link forthcoming) and ignore warnings from chrome.
  4) drag and drop the greenFairy.crx file onto the chrome extensions page
  5) open a new website (e.g. google.com) and click "Green Fairy" button on right side of address bar.

* For further development: follow these instructions below.
-----------------------------------------------------------
* Clone the repository `git clone https://git.geekli.st/dibyo/greenfairy`
* Follow the instructions under the load the extension section [here](https://developer.chrome.com/extensions/getstarted):

  * Visit chrome://extensions in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox:  The menu's icon is three horizontal bars.. and select Extensions under the Tools menu to get to the same place).

  * Ensure that the Developer mode checkbox in the top right-hand corner is checked.

  * Click Load unpacked extension… to pop up a file-selection dialog.

  * Navigate to the directory in which your extension files live, and select it.
* Now go to a website, e.g. www.amazon.com. Click on the extension button. That's it. You should see a score for the website.
* To debug issues, right click on the extension icon and select inspect element. For help [here](https://developer.chrome.com/extensions/tut_debugging).