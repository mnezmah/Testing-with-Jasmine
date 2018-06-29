/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /****** Test suite named "RSS Feeds" ******/
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
      * allFeeds variable has been defined and that it is not
      * empty. 
      */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* This test ensures that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it('each allFeeds object has URL defined', function() {
        allFeeds.forEach(function (feed){ 
          const feedUrl = feed.url;
          expect(feedUrl).toBeDefined();
          expect(feedUrl.length).not.toBe(0);
        });
      });

      /* This test ensures that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it('each allFeeds object has URL defined', function() {
        allFeeds.forEach(function (feed){ 
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toEqual("");
        });
      });
    });


    /****** suite named "The menu" ******/
    describe('The menu', function() {


      /* This test ensures the menu element is
      * hidden by default. 
      */
      it('menu is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /* This test ensures the menu changes
       * visibility when the menu icon is clicked. it has two expectations: 
       * Menu displays whenclicked and does 
       * Menu hides when clicked again.
       */
      it('displays menu when clicked', function(){
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(false);
      });

      it('hides menu when clicked again', function(){
        $(".menu-icon-link").trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });

    /****** suite named "Initial Entries" ******/
    describe('Initial Entries', function(){
      /* This test ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      beforeEach(function(done){
        loadFeed(0, done);
      });

      it('shows at least one entry in the feed when loadFeed called', function(){
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });

    /******suite named "New Feed Selection" ******/
    describe('New Feed Selection', function(){

      /* This test ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */

      let oldFeed;
      let newFeed;

      beforeEach(function(done) {
        loadFeed(0, function() {
          oldFeed =  $('.feed').html();
            done();
        });
      });   

      it('changes content when loadFeed called', function(done){
        loadFeed(1, function(){
          newFeed = $('.feed').html();
          expect(newFeed).not.toEqual(oldFeed);
          done();
        });
      });
    });
}());
