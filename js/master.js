/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

/**
 * master.js テストアラート
 * @returns {masterJs}
 */
var masterJs = function(){
  this.localName = 'masterJs';
};
masterJs.prototype.alert = function(string){
  alert(this.localName + ':' + string);
};


/**
 * Ready
 * @param {type} param
 */
$(document).ready(function () {
  /**
   * フェード効果
   * @type type
   */
  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */
      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },
    fadeOut: function() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */
      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },
    fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */
      var _this = this;
      var $el = $(this.newContainer);
      $(this.oldContainer).hide();
      $el.css({
        visibility : 'visible',
        opacity : 0
      });
      $el.animate({ opacity: 1 }, 400, function() {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */
        _this.done();
      });
    }
  });
  
  /**
   * スライド効果
   * @type type
   */
  var SlideTransition = Barba.BaseTransition.extend({
    start: function() {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */
      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },
    fadeOut: function() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */
      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },
    fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */
      var _this = this;
      var $el = $(this.newContainer);
      $(this.oldContainer).hide();
      $el.css({
        visibility : 'visible',
        opacity : 0
      });
      $el.animate({ opacity: 1 }, 400, function() {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */
        _this.done();
      });
    }
  });
  /**
   * Next step, you have to tell Barba to use the new Transition
   */
  Barba.Pjax.getTransition = function() {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */
    return SlideTransition;
  };
  Barba.Pjax.start();
});




/*
 * ユーザーエージェント
 *
 * @returns {undefined}
 */
var UserAgent = function(){
    this.ua = {};
    this.ua.name = window.navigator.userAgent.toLowerCase();
    this.ua.isIE = (this.ua.name.indexOf('msie') >= 0 || this.ua.name.indexOf('trident') >= 0);
    this.ua.isiPhone = this.ua.name.indexOf('iphone') >= 0;
    this.ua.isiPod = this.ua.name.indexOf('ipod') >= 0;
    this.ua.isiPad = this.ua.name.indexOf('ipad') >= 0;
    this.ua.isiOS = (this.ua.isiPhone || this.ua.isiPod || this.ua.isiPad);
    this.ua.isAndroid = this.ua.name.indexOf('android') >= 0;
    this.ua.isTablet = (this.ua.isiPad || (this.ua.isAndroid && this.ua.name.indexOf('mobile') < 0));
    
    if (this.ua.isIE) {
        this.ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(this.ua.name);
        if (this.ua.verArray) {
            this.ua.ver = parseInt(this.ua.verArray[2], 10);
        }
    }
    if (this.ua.isiOS) {
        this.ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(this.ua.name);
        if (this.ua.verArray) {
            this.ua.ver = parseInt(this.ua.verArray[2], 10);
        }
    }
    if (this.ua.isAndroid) {
        this.ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(this.ua.name);
        if (this.ua.verArray) {
            this.ua.ver = parseInt(this.ua.verArray[2], 10);
        }
    }
    // this.ua.ver; バージョン番号などの詳細はこの値を参照する
};
UserAgent.prototype.isIe = function(){
    return this.ua.isIE;
};
UserAgent.prototype.isIOs = function(){
    return this.ua.isiOS;
};
UserAgent.prototype.isAndroid = function(){
    return this.ua.isAndroid;
};
