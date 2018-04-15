import {GoalPage} from './goals.po';
import {browser, element, by} from 'protractor';

const origFn = browser.driver.controlFlow().execute;

// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    // This delay is only put here so that you can watch the browser do its thing.
    // If you're tired of it taking long you can remove this call
    // origFn.call(browser.driver.controlFlow(), function () {
    //     return protractor.promise.delayed(100);
    // });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('', () => {
    let page: GoalPage;

    beforeEach(() => {
        page = new GoalPage();
    });

    it('Should add a goal.', () => {
        GoalPage.navigateTo();
        expect(page.testAddNewGoal('Go to bed early', 'Every day')).toBeTruthy();
    });

    it('should check if all of the three tabs are there', () => {
        GoalPage.navigateTo();
        expect(element(by.id('all-goals-tab'))).toBeDefined();
        expect(element(by.id('completed-goals-tab'))).toBeDefined();
        expect(element(by.id('incomplete-goals-tab'))).toBeDefined();
    });

    it('Check if there is a check-buttons on the incomplete goals tab', () => {
        GoalPage.navigateTo();
        expect(element(by.id('incomplete-goals-tab'))).toBeDefined();
        expect(element(by.id('check-buttons'))).toBeDefined();
    });

    it('should be able to complete a goal and move it into the completed tab', () => {
        GoalPage.navigateTo();
        element(by.id('addNewGoal')).click();

        // Set goal name
        element(by.id('name')).sendKeys('Test Goals');

        // Set the start date of the goal
        element(by.id('startDate')).click();
        element(by.id('startDate')).sendKeys('4/1/2018');

        // Set the end date of the goal
        element(by.id('endDate')).click();
        element(by.id('endDate')).sendKeys('4/7/2018');

        // Set the category of the goal
        element(by.id('category-goals')).click();
        element(by.id('md-option-0')).click();

        // Set the frequency of the goal
        element(by.id('frequency')).click();
        element(by.id('frequency')).sendKeys('7');

        // Submit the goal
        element(by.id('confirmAddGoalButton')).click();

        // Complete the goal
        element(by.id('completeGoalButton')).click();

        // Check that the goal is in the right tab
        element(by.id('md-tab-label-0-2')).click();
        expect(element(by.id('goalName')).getText()).toContain('Test Goals');


    });


/*
     it('Should open the expansion panel and get the Name', () => {
         GoalPage.navigateTo();
         GoalPage.getOwner('DATA');
         browser.actions().sendKeys(Key.ENTER).perform();

         expect(page.getUniqueGoal('Drink more water')).toEqual('Drink more water');

         // This is just to show that the panels can be opened
         browser.actions().sendKeys(Key.TAB).perform();
         browser.actions().sendKeys(Key.ENTER).perform();
    })
    */

    it('should contain the crisis button', () => {
        GoalPage.navigateTo();
        expect(element(by.id('crisis-button'))).toBeDefined();
    });
});
