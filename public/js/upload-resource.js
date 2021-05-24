let languages;
let types;
let categories;
let photo = document.getElementById("photo-input");
let name = document.getElementById("name-input");
let transliteratedName = document.getElementById("transliterated-name-input");
let description = document.getElementById("description-input");
let link = document.getElementById("link-input");
let photoPreview = document.getElementById("photo-preview");
let photoContainer = document.getElementById("photo-container");

photo.addEventListener("change", (e) => {
  const [image] = photo.files;
  if (image) {
    photoPreview.src = URL.createObjectURL(image);
    photoContainer.hidden = false;
  }
});

const getLanguagesAndPopulateSelect = async () => {
  let res = await fetch("/language");
  languages = await res.json();
  let select = document.getElementById("language-select-1");

  languages.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    select.appendChild(option);
  });
};

const getTypesAndPopulateSelect = async () => {
  let res = await fetch("/type");
  types = await res.json();
  let select = document.getElementById("type-select-1");

  types.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    select.appendChild(option);
  });
};

const getCategoriesAndPopulateSelect = async () => {
  let res = await fetch("/resource-type");
  categories = await res.json();
  let select = document.getElementById("category-select-1");

  categories.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    select.appendChild(option);
  });
};

getLanguagesAndPopulateSelect();
getTypesAndPopulateSelect();
getCategoriesAndPopulateSelect();

let addSelectIcon = document.getElementById("add-new-language-select");
let selectContainer = document.getElementById("language-select-container");
let addTypeSelectIcon = document.getElementById("add-new-type-select");
let typeSelectContainer = document.getElementById("type-select-container");
let addCategorySelectIcon = document.getElementById("add-new-category-select");
let categorySelectContainer = document.getElementById(
  "category-select-container"
);

let submitButton = document.getElementById("submit-button");

const createNewLanguageSelect = (selectContainer, optionArray) => {
  // get id of previous child
  let children = selectContainer.children;
  let previousId = children[children.length - 1].id;

  let newId =
    previousId.split("-").slice(0, 3).join("-") +
    "-" +
    (parseInt(previousId.split("-")[3]) + 1);
  console.log(newId);

  let newSelectContainer = document.createElement("div");
  newSelectContainer.id = newId;
  let select = document.createElement("select");
  let deleteButton = document.createElement("i");
  deleteButton.className = "fa fa-minus-circle";
  deleteButton.style.color = "red";

  deleteButton.addEventListener("click", () => {
    selectContainer.removeChild(newSelectContainer);
  });

  optionArray.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    select.appendChild(option);
  });
  newSelectContainer.appendChild(select);
  newSelectContainer.appendChild(deleteButton);
  selectContainer.appendChild(newSelectContainer);
};

addSelectIcon.addEventListener("click", () =>
  createNewLanguageSelect(selectContainer, languages)
);
addTypeSelectIcon.addEventListener("click", () => {
  createNewLanguageSelect(typeSelectContainer, types);
});
addCategorySelectIcon.addEventListener("click", () => {
  createNewLanguageSelect(categorySelectContainer, categories);
});

const getSelectValues = (node) => {
  let ids = [];
  let input = node.children;
  for (let i = 0; i < input.length; i++) {
    let value = parseInt(input[i].children[0].value);
    ids.push(value);
  }

  return ids;
};

const getLevels = () => {
  let levels = [];
  let nodes = document.getElementById("checkbox-container").children;
  for (let i = 0; i < nodes.length; i++) {
    let level = nodes[i].children[0];
    if (level.checked) {
      levels.push(parseInt(level.name));
    }
  }
  return levels;
};

const checkForFormCompletion = (name, description, levelIds) => {
  if (
    name.value.length > 0 &&
    description.value.length > 0 &&
    levelIds.length > 0
  ) {
    return true;
  } else {
    alert("Form incomplete. Cannot submit");
    return false;
  }
};

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  let languageIds = getSelectValues(selectContainer);
  let typeIds = getSelectValues(typeSelectContainer);
  let categoryIds = getSelectValues(categorySelectContainer);
  let levelIds = getLevels();

  let json = {
    languageIds,
    typeIds,
    categoryIds,
    levelIds,
    name: name.value,
    transliteratedName: transliteratedName.value,
    description: description.value,
    link: link.value,
  };

  let photoFile = photo.files[0];

  let data = new FormData();
  data.append("photo", photoFile);
  data.append("json", JSON.stringify(json));

  if (!checkForFormCompletion(name, description, levelIds)) {
    return;
  }

  let res = await fetch("/resource/create", {
    method: "post",
    body: data,
  });
  let url = "https://polylogger.com/resource/upload-resource";
  if (res.status === 200) {
    window.location.replace(
      `${url}?message=The resource has been successfully uploaded. Thanks for contributing!`
    );
  } else {
    window.location.replace(
      `${url}?error=There has a been a problem uploading this resource. If the problem persists, please reach out on twitter @polylogger.`
    );
  }
});
