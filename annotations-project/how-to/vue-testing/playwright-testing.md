# Playwright Testing

## Installation
0. Open web_client folder only (not parent miqa folder) in VSC.
1. Install the Playwright Test for VSCode extension.
2. View -> Command Palette -> Test: Install Playwright.
3. Select all applicable browsers and okay.
4. The extension installs Playwright, the necessary browsers, and creates a basic setup and some test files.

## VSC UI
In VSC you should now see a lab beaker on the left-hand side. Clicking on this will show the tests that are available to run and also options for creating new tests, etc.

## Creating Tests
The easiest way to create a test is to click on "Record new". Playwright will open a new browser window. Enter in the desired URL and Playwright will record each action into a test. You can find the test in the tests folder, e.g. `test-1.spec.ts`.

Once created you can open this file and see new lines added to the file as you navigate in the Playwright launched browser.

## Running Tests
At the very top of the Test Explorer you can execute all tests. There is also the option to execute individual tests by clicking the play button next to the test name.

If you have the test opened you will be able to see Playwright executing the test line-by-line and the ms it took to run each step.

## Cleaning DB
The screenshots need to be identical in order for them to pass. To do this we need to ensure the DB is in essentially the same state as it was before commencing tests.

There is a new `test_db_reset` manage.py command that will delete scan decisions. Currently it is run manually as-needed (generally between each test run):

`./manage.py test_db_reset`

## Updating Screenshots
If changes are made to a page that should affect the screenshots then we need to have Playwright update it's "standard" screenshots:
- `npx playwright test --update-snapshots`