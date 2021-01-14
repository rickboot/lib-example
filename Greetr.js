// Greetr is an example library example from the Udemy course Javascript: Understanding the Weird Parts by Anthony Alicea

// Uses IIFE to wrap and hide variables  
// Pass in window and jQuery object
// leading semicolon in case previous js script does not include closing semicolon
;(function(global) {  

  // function constructor wrapper so no 'new' keyword is required 
  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }

  // hidden within scope of IIFE/lib
  var supportedLangs = ['en', 'es']; 

  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  }

  // public
  Greetr.prototype = {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw new Error("Invalid language");
      }
      console.log('Greetr object created')
    },

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function(isFormal) {
      var msg = isFormal ? this.formalGreeting() : this.greeting();
      console.log(msg);

      return this; // make function chainable
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());

        return this; // make function chainable
      }
    },

    setLang: function(lang) {
      this.language = lang;
      this.validate();
      return this; // make function chainable
    },

    // jQuery support
    // HTMLGreeting: function(selector, isFormal) {
    //   if (!$) throw 'JQuery not detected!';

    //   var msg = isFormat ? this.formalGreetin(): this.greeting();

    //   $(selector).html(msg);

    //   return this;
    // } 
  };

  // the actual object is created here, allowing us to create object without 'new' keyword
  Greetr.init = function(firstName, lastName, language) {
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en'; 
    self.validate();
  }

  Greetr.init.prototype = Greetr.prototype;

  global.Greetr = global.G$ = Greetr; 
  
}(global));
  
