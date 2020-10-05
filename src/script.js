// all the detail about the components
var componentData = [
  {
    id: 1,
    name: "Hero",
    icon: "picture_in_picture",
    description: "Usually at the top",
    html:
      '<div class="jumbotron container-fluid"><h1 class="display-4">This is a hero</h1><p class="lead">Write some engaging text here to draw in a customer</p><a class="btn btn-primary btn" href="#" role="button">Learn more</a></p></div>'
  },
  {
    id: 2,
    name: "Spacer",
    icon: "height",
    description: "Add vertical space",
    html: '<div class = "builder-spacer"></div>'
  },
  {
    id: 3,
    name: "Header",
    icon: "format_size",
    description: "For titles of sections",
    html:
      '<div class = "builder-header col col-8"><h2>This is a header</h2></div>'
  },
  {
    id: 4,
    name: "Text",
    icon: "notes",
    description: "Plain text",
    html:
      '<div class = "builder-text col col-lg-8"><p>Text types in literature form the basic styles of writing. Factual texts merely seek to inform, whereas literary texts seek to entertain or otherwise engage the reader by using creative language and imagery. There are many aspects to literary writing, and many ways to analyse it, but four basic categories are descriptive, narrative, expository, and argumentative.<p></div>'
  },
  {
    id: 5,
    name: "Button",
    icon: "play_circle_outline",
    description: "Triggers something",
    html:
      '<div class = "builder-button col col-8"><button type="button" class="btn btn-primary">Button</button></div>'
  },
  {
    id: 6,
    name: "Cards",
    icon: "crop_portrait",
    description: "Displays info",
    html:
      '<div class = "card-container col-centered"><div class="card" style="width: 18rem;"><img class="card-img-top" src="//via.placeholder.com/640x420" alt="Card image cap"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div><div class="card" style="width: 18rem;"><img class="card-img-top" src="//via.placeholder.com/640x420" alt="Card image cap"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div><div class="card" style="width: 18rem;"><img class="card-img-top" src="//via.placeholder.com/640x420" alt="Card image cap"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>'
  },
  {
    id: 7,
    name: "Checkbox",
    icon: "check_box",
    description: "Multiple answers",
    html:
      '<div class="form-check col col-8"><input class="form-check-input" type="checkbox" value="" id="defaultCheck1"><label class="form-check-label" for="defaultCheck1">Answer for a multi-choice question</label></div>'
  },
  {
    id: 8,
    name: "Radio Button",
    icon: "radio_button_checked",
    description: "Single answers",
    html:
      '<div class="form-check col col-8"><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"><label class="form-check-label" for="exampleRadios1">Default radio</label></div>'
  },
];

function applyBuilderClass(elem) {
  elem.attr("contenteditable", "true");
  elem.addClass("builder-element");
}

function generateSidebar()
{

// generating the sidebar
for (var i = 0; i < componentData.length; i++) {
  var component = componentData[i];

  // the HMTL of the cards
  var cardHTML = "";
  cardHTML += "<div class = 'sidebar-card'>";
  cardHTML += "<span class='material-icons'>" + component.icon + "</span>";
  cardHTML +=
    "<span class = 'sidebar-card-title'><b>" + component.name + "</b></span>";
  cardHTML += "</br>" + component.description;
  cardHTML += "</div>";

  var cardjquery = $(cardHTML);

  cardjquery.data("component", component);

  // when the card is clicked, it will add the component HTML to the page
  cardjquery.click(function () {
    $(".preview-instructons").remove();

    // add the element to the preview
    var elem = $($(this).data("component").html);

    // adds the component details to the element
    elem.data("component", $(this).data("component"));

    applyBuilderClass(elem);

    $(".preview").append(elem);
    window.scrollTo(0, document.body.scrollHeight);
  });

  // added the cards to the menu

  $(".sidebar").append(cardjquery);
}

};

function importPage(elements)
{

  elementArray = elements.split(",");

  if (elementArray.length < 1)
    return;

  for (var i = 0; i < elementArray.length; i++) {

    var exportid = elementArray[i];

    // finds the relevant component
    var item = componentData.find((item) => item.id == exportid);

    // if the component is found, add it to the page
    if (item != undefined) {
      elem = $(item.html);

      $(".preview-instructons").remove();

      applyBuilderClass(elem);

      $(".preview").append(elem);
    }
  }  
}

function addMenuEvents()
{
// meny button functionality
$(".remove-button").click(function () {
  console.log($(".builder-element").last());

  $(".builder-element").last().remove();
});

$(".export-button").click(function () {
  if ($(".builder-element").length > 0) {
    var elements = [];
    $(".builder-element").each(function (index, element) {
      var component = $(this).data("component");

      // adds the component ID to the array
      elements.push(component.id);
    });

    var newWin = open("url", "windowName", "height=300,width=300");
    newWin.document.write(elements);
  } else {
    alert("There's nothing to export.");
  }
});

$(".import-button").click(function () {
  console.log("import");

  if ($(".builder-element").length == 0) {
    let elements = prompt("Enter the exported code from a previous project");
    
    if (elements == "null" || elements == "") {
      alert("nothing entered");

    }
    else
    {
        importPage(elements);
    }
  } 
  else
  {
    alert("You can only import on a blank page.");
  }
});
}

$('document').ready(function(){

  generateSidebar();
  addMenuEvents();

});