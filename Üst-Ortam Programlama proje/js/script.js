$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";


// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});


// Load the education view
dc.loadEducation = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    "./snippets/education.html",
    function(html){
      insertHtml("#main-content",html);
    },false);
};

// Load the licence terms view
dc.loadLicenceTerms = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    "./snippets/licenceTerms.html",
    function(html){
      insertHtml("#main-content",html);
    },false);
};
// Load the Licence Autumn Class terms view
dc.loadLicenceAutumnClass = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    "./snippets/licenceAutumnClass.html",
    function(html){
      insertHtml("#main-content",html);
    },false);
};

// Load the Licence Summer Class view
dc.loadLicenceSummerClass = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    "./snippets/licenceSummerClass.html",
    function(html){
      insertHtml("#main-content",html);
    },false);
};




dc.loadAutuLessons=function (lessonId) {
  showLoading('#main-content');
  var json="./json/licenceAutumnLessons.json";
  $ajaxUtils.sendGetRequest(json, function (eduJson) {
                    $ajaxUtils.sendGetRequest("./snippets/lessonTable.html", function(itemHtml){
                            var finalHtml="<table align='center'>"+
                          "<th>Gün</th>"+
                          "<th>Ders</th>";
                          console.log(eduJson);
                            var program=eduJson.classes[lessonId].program;

                            for(var i=0;i<program.length;i++){
                              var lesson=program[i];
                              var rowHtml=insertProperty(itemHtml,"lessonDate",lesson.date);
                              var rowHtml=insertProperty(rowHtml,"lessonName",lesson.name);
                              finalHtml+=rowHtml;
                          }

                          finalHtml+="</table>";
                          insertHtml("#main-content",finalHtml);
                        },false
                      )
                  }
                
          )
}
dc.loadSumLessons=function (lessonId) {
  showLoading('#main-content');
  var json="./json/licenceSummerLessons.json";
  $ajaxUtils.sendGetRequest(json, function (eduJson) {
                    $ajaxUtils.sendGetRequest("./snippets/lessonTable.html", function(itemHtml){
                            var finalHtml="<table align='center'>"+
                          "<th>Gün</th>"+
                          "<th>Ders</th>";
                          console.log(eduJson);
                            var program=eduJson.classes[lessonId].program;

                            for(var i=0;i<program.length;i++){
                              var lesson=program[i];
                              var rowHtml=insertProperty(itemHtml,"lessonDate",lesson.date);
                              var rowHtml=insertProperty(rowHtml,"lessonName",lesson.name);
                              finalHtml+=rowHtml;
                          }

                          finalHtml+="</table>";
                          insertHtml("#main-content",finalHtml);
                        },false
                      )
                  }
                
          )
}
dc.loadGraduateTerms = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    "./snippets/graduateTerms.html",
    function(html){
      insertHtml("#main-content",html);
    },false);
};
dc.loadGraduateSumLessons=function () {
  showLoading('#main-content');
  var json="./json/graduateSummerLessons.json";
  $ajaxUtils.sendGetRequest(json, function (eduJson) {
                    $ajaxUtils.sendGetRequest("./snippets/lessonTable.html", function(itemHtml){
                            var finalHtml="<table align='center'>"+
                          "<th>Gün</th>"+
                          "<th>Ders</th>";
                          console.log(eduJson);
                            var program=eduJson.program;

                            for(var i=0;i<program.length;i++){
                              var lesson=program[i];
                              var rowHtml=insertProperty(itemHtml,"lessonDate",lesson.date);
                              var rowHtml=insertProperty(rowHtml,"lessonName",lesson.name);
                              finalHtml+=rowHtml;
                          }

                          finalHtml+="</table>";
                          insertHtml("#main-content",finalHtml);
                        },false
                      )
                  }
                
          )
}
dc.loadGraduateAutuLessons=function () {
  showLoading('#main-content');
  var json="./json/graduateAutumnLessons.json";
  $ajaxUtils.sendGetRequest(json, function (eduJson) {
                    $ajaxUtils.sendGetRequest("./snippets/lessonTable.html", function(itemHtml){
                            var finalHtml="<table align='center'>"+
                          "<th>Gün</th>"+
                          "<th>Ders</th>";
                          console.log(eduJson);
                            var program=eduJson.program;

                            for(var i=0;i<program.length;i++){
                              var lesson=program[i];
                              var rowHtml=insertProperty(itemHtml,"lessonDate",lesson.date);
                              var rowHtml=insertProperty(rowHtml,"lessonName",lesson.name);
                              finalHtml+=rowHtml;
                          }

                          finalHtml+="</table>";
                          insertHtml("#main-content",finalHtml);
                        },false
                      )
                  }
                
          )
}

dc.loadPersonal = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    "./snippets/personalCategories.html",
    function(html){
      insertHtml("#main-content",html);
    },false);
};

dc.loadAcademic=function () {
  showLoading('#main-content');
  var json="./json/academic.json";
  $ajaxUtils.sendGetRequest(json, function (eduJson) {
                    $ajaxUtils.sendGetRequest("./snippets/personal.html", function(itemHtml){
                            var finalHtml="<div style='text-align: center'><span>AKADEMİK YARDIMCILAR</span></div><table align='center' id=\"table\">";
                          
                          
                            var personal=eduJson.personals;
                            console.log(eduJson);
                            for(var i=0;i<personal.length;i++){
                                var personalFlag=personal[i];
                                var rowHtml=insertProperty(itemHtml,"imgUrl",personalFlag.imageUrl);
                                var rowHtml=insertProperty(rowHtml,"name",personalFlag.name);
                                var rowHtml=insertProperty(rowHtml,"tel",personalFlag.tel);
                                                    
                              finalHtml+=rowHtml;
                          }

                          finalHtml+="</table>";
                          insertHtml("#main-content",finalHtml);
                        },false
                      )
                  }
                
          )
}
dc.loadProfessor=function () {
  showLoading('#main-content');
  var json="./json/professor.json";
  $ajaxUtils.sendGetRequest(json, function (eduJson) {
                    $ajaxUtils.sendGetRequest("./snippets/personal.html", function(itemHtml){
                            var finalHtml="<div style='text-align: center'><span>ÖĞRETİM ÜYLERİ</span></div><table align='center' id=\"table\">";
                          
                          
                            var personal=eduJson.personals;
                            console.log(eduJson);
                            for(var i=0;i<personal.length;i++){
                                var personalFlag=personal[i];
                                var rowHtml=insertProperty(itemHtml,"imgUrl",personalFlag.imageUrl);
                                var rowHtml=insertProperty(rowHtml,"name",personalFlag.name);
                                var rowHtml=insertProperty(rowHtml,"tel",personalFlag.tel);
                                                    
                              finalHtml+=rowHtml;
                          }

                          finalHtml+="</table>";
                          insertHtml("#main-content",finalHtml);
                        },false
                      )
                  }
                
          )
}
dc.loadTecnic=function () {
  showLoading('#main-content');
  var json="./json/tecnic.json";
  $ajaxUtils.sendGetRequest(json, function (eduJson) {
                    $ajaxUtils.sendGetRequest("./snippets/personal.html", function(itemHtml){
                            var finalHtml="<div style='text-align: center'><span>İDARİ/TEKNİK</span></div><table align='center' id=\"table\">";
                            
                          
                            var personal=eduJson.personals;
                            console.log(eduJson);
                            for(var i=0;i<personal.length;i++){
                                var personalFlag=personal[i];
                                var rowHtml=insertProperty(itemHtml,"imgUrl",personalFlag.imageUrl);
                                var rowHtml=insertProperty(rowHtml,"name",personalFlag.name+"Ç");
                                console.log(personal);
                                var rowHtml=insertProperty(rowHtml,"tel",personalFlag.tel);
                                                    
                              finalHtml+=rowHtml;
                          }

                          finalHtml+="</table>";
                          insertHtml("#main-content",finalHtml);
                        },false
                      )
                  }
                
          )
}

global.$dc = dc;

})(window);
