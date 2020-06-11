function renderSkills(skill_list) {
  //sort the skill_list by proficiency descending
  skill_list.sort(function (record1, record2) {
    return record2.rating - record1.rating;
  });

  //select the <tbody> element
  //you can make this more precise by using a descendant selector,
  //referring to a particular <table> by ID or style class name
  var tbody = document.querySelector(".skills  tbody");

  //clear any existing content in the body
  tbody.textContent = "";

  //for each skill
  for (var idx = 0; idx < skill_list.length; idx++) {
    //render the skill row
    var row = renderSkill(skill_list[idx]);
    //append it to table
    tbody.appendChild(row);
  }
}

function renderSkill(skill) {
  //create the <tr> element
  var tr = document.createElement("tr");

  //create and append the <td> elements
  tr.appendChild(renderSkillProp(skill.title, true));
  tr.appendChild(renderSkillProp(skill.genre, true));
  tr.appendChild(renderSkillProp(skill.rating));

  //return the table row to the caller
  return tr;
}

function renderSkillProp(content, nonNumeric) {
  //create the new <td> element
  var td = document.createElement("td");

  //set its text content to the provided value
  td.textContent = content;

  //if it should be formatted as numeric...
  if (nonNumeric) {
    //add the "numeric" style class
    td.classList.add("non-numeric");
  }

  //return the new element to the caller
  return td;
}

//listen to when a user types in the filter field
var searchInput = document.getElementById("skill-filter");

//if skill in list
function isSkillFound(skill) {
  //get user input
  var userInput = searchInput.value;
  //make the input lower case
  var lowercaseUserInput = userInput.toLowerCase();
  //make skill title lower case
  var lowercaseSkillTitle = skill.title.toLowerCase();
  if (lowercaseSkillTitle.indexOf(lowercaseUserInput) >= 0) {
    return true;
  } else {
    return false;
  }
}

searchInput.addEventListener("input", function () {
  //   console.log("user typed:", searchInput.value);

  //find any skills that match user input
  var filteredSkills = SKILLS.filter(isSkillFound);

  renderSkills(filteredSkills);
});

//update the skill table with the new list
