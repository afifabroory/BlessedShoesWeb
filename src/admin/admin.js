import {
  insert,
  update,
  adminRead,
  itExists,
  ServerValue,
  read,
} from "../database/database";

import { getData, storeData, removeData } from "../database/local_database";

// !!!!!!!!!!!!!!! NEXTING TO DO !!!!!!!!!!
// DISPLAY FIRST CURRENT_DATA IF EXIST AND USER CLICK INSERT BUTTON (Still in consideration)
// ASK CONFIRMATION IF INPUT IN UPDATE OPERATION CHANGED.
// DISCARD DATA TO DEFAULT IF USER CLICK CANCEL

// TODO:
// 1. Enabled add button when certain condition meet to enabled of disabled add button.
// 2. Also develop next and back button for exsisting data,
//    if user already click add button but doesn't input data then ignore data.
//    also  if user already input data then ask user to click add button to save data.
//    BACK button are active when user click NEXT button. NEXT button are disabled when no more data.
// 3. If user already input data but doesn't insert data to database but click CANCEL button, then
//    tell user data are not stored to database. If user click yes then discard data if user click
//    no then back to popup.
// 4. Create new feature to clear data fast also create feature to generate new ID.
// 5. Create procedure to make sure ID are not exist in database.
// 6. Create new row element after input to send message something wrong to user.
// 7. Create success popup after user click insert button.
// 8. Add data to display data.
// 9. Filter display data to show only In Progress data.
// 10. Sort data by TIMESTAMP to display data. Using FIFO principle which is first item are in upper.
// 11. Input condtion handling (e.g. empty input, wrong input, etc.)
// 12. Update user page status!

async function generateID(length = 3) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const BANNED_ID = [
    "SEX",
    "ASS",
    "CUM",
    "GAY",
    "S3X",
    "GOD",
    "XXX",
    "TIT",
    "A55",
    "JAV",
  ];
  var result = "";

  while (true) {
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];

    if (
      !(await itExists(result).then((isExist) => {
        return !BANNED_ID.includes(result) && isExist;
      }))
    )
      break;
  }

  storeData("ID", JSON.stringify(result));
  return result;
}

function getParentOfDepth(n, element) {
  for (var i = 0; i < n; i++) element = element.parentNode;
  return element;
}

function isValidInsert(data) {
  // Function for handling insert database, yang mana fungsi ini akan memeriksa apakah
  // input yang diberikkan valid dan dapat disimpan ke database.
  return data["ShoesBrand"] !== "" || data["Size"] !== "";
}

function isValidUpdate(data, initData) {
  // Fungsi untuk menghandle update database, yang mana fungsi ini akan memriksa apakah
  // input yang berganti valid dan dapat diupdate ke database.

  var inputData = getInputData();
  var index =
    parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;
  data["Status"] = inputData["Status"];
  delete inputData["Status"];
  data[index] = inputData;

  var isChanged = false;
  for (var keys in data) {
    if (
      keys !== "timestampIn" ||
      keys !== "timestampOut" ||
      keys !== "Status"
    ) {
      for (var keys2 in data[keys]) {
        isChanged = data[keys][keys2] !== initData[keys][keys2] || isChanged;
      }
    }
  }

  isChanged = data["Status"] !== initData["Status"] || isChanged;

  return isChanged;
}

function nextDataInsert() {
  // Fungsi untuk menghandle next button pada insert operation.
  // Fungsi ini membutuhkan fungsi untuk menampilkan data ke input.
  var data = getData("CURRENT_DATA"); // Unefficient
  var currentIndex =
    parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;

  var dataLength = -3;
  for (var key in data) dataLength++;

  // Cek apakah data selanjutnya ada?
  console.log(`nextIndex: ${currentIndex}`);
  if (dataLength - 1 === currentIndex + 1) {
    // Jika tidak ada lagi data sebelumnya maka "BUTTON NEXT" di disabled
    document.querySelector(
      "#insertUpdate > div > button:last-child"
    ).disabled = true;
    document.querySelector(
      "#insertUpdate > div > button:nth-child(1)"
    ).disabled = false;
  }
  showData(data, currentIndex + 1);
}

function nextDataUpdate() {
  var id = document.querySelector("#shoesID>td>#shoesID").value;
  var data = getData("DATA"); // Unefficient?
  var currentIndex =
    parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;
  saveDataUpdate(id, currentIndex, data);
  data = data[id];

  var dataLength = -3;
  for (var key in data) dataLength++;

  // Cek apakah data selanjutnya ada?
  console.log(`nextIndex: ${currentIndex}`);
  if (dataLength - 1 === currentIndex + 1) {
    // Jika tidak ada lagi data sebelumnya maka "BUTTON NEXT" di disabled
    document.querySelector(
      "#insertUpdate > div > button:last-child"
    ).disabled = true;
    document.querySelector(
      "#insertUpdate > div > button:nth-child(1)"
    ).disabled = false;
  }
  showData(data, currentIndex + 1);
}

function backDataInsert() {
  // Fungsi untuk menghandle next button pada insert operation.
  // Fungsi ini membutuhkan fungsi untuk menampilkan data ke input.
  var data = getData("CURRENT_DATA"); // Unefficient
  var currentIndex =
    parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;
  console.log("nextDataInsert");
  console.log(currentIndex);
  showData(data, currentIndex - 1);

  // Cek apakah data sebelumnya ada?
  console.log(currentIndex - 1);
  if (currentIndex - 1 === 0) {
    // Jika tidak ada lagi data setelahnya maka "BUTTON NEXT" di disabled
    document.querySelector(
      "#insertUpdate > div > button:nth-child(1)"
    ).disabled = true;
    document.querySelector(
      "#insertUpdate > div > button:last-child"
    ).disabled = false;
  }
}

function backDataUpdate() {
  var id = document.querySelector("#shoesID>td>#shoesID").value;
  var data = getData("DATA"); // Unefficient?
  var currentIndex =
    parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;
  saveDataUpdate(id, currentIndex, data);
  data = data[id];
  showData(data, currentIndex - 1);

  // Cek apakah data sebelumnya ada?
  console.log(currentIndex - 1);
  if (currentIndex - 1 === 0) {
    // Jika tidak ada lagi data setelahnya maka "BUTTON NEXT" di disabled
    document.querySelector(
      "#insertUpdate > div > button:nth-child(1)"
    ).disabled = true;
    document.querySelector(
      "#insertUpdate > div > button:last-child"
    ).disabled = false;
  }
}

function getInputData() {
  /**
   * ID as a Key
   * Fromat data example:
   * AAA : {
   *  [
   *    {Service: -, Shoesbrand: -, Size: -, Status: - },
   *    {Service: -, Shoesbrand: -, Size: -, Status: - }
   *  ]
   * }
   */
  var data = {};
  data["Service"] = document.querySelector(
    "#shoesService>td>#shoesService"
  ).value;
  data["ShoesBrand"] = document.querySelector(
    "#shoesBrand>td>#shoesBrand"
  ).value;
  data["Size"] = document.querySelector("#shoesSize>td>#shoesSize").value;
  data["Status"] = document.querySelector("#shoesStatus>td>#shoesStatus").value;
  return data;
}

function isDone() {
  var status = document.querySelector("#shoesStatus>td>#shoesStatus").value;
  return status === "Done";
}

function clearInputData() {
  document.querySelector("#shoesNo>td>#shoesNo").value = "1";
  document.querySelector("#shoesBrand>td>#shoesBrand").value = "";
  document.querySelector("#shoesSize>td>#shoesSize").value = "";
  document.querySelector(
    "#shoesService>td>#shoesService"
  ).children[0].selected = true;
  // We don't clear status. Because status apply to all
}

function insertOnClick() {
  console.log("insertOnClick");
  // Insert data to database button
  // Ask confirmation, if "CURRENT_DATA" exits in sessionStorage
  // or when ShoesBrand and ShoesSize are not empty.

  var data = getInputData();
  var dataLocal = getData("CURRENT_DATA");
  var valid = isValidInsert(data);
  console.log("Validity of insert");
  console.log(valid);
  if (valid || dataLocal) {
    if (confirm("Are you sure you want to store data to database?")) {
      var index =
        parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;
      console.log(index);
      var dataLength = -3;
      for (var key in dataLocal) dataLength++;
      var valid = isValidInsert(data);

      if (valid || dataLocal) {
        if (index >= dataLength) {
          if (!dataLocal && valid) {
            dataLocal = {};
            dataLocal["Status"] = data["Status"];
            delete data["Status"];
            dataLocal[0] = data;
            dataLocal["timestampIn"] = ServerValue.TIMESTAMP;
            dataLocal["timestampOut"] = 0;
          } else if (valid) {
            dataLocal[dataLength] = data;
          }
        }
        var id = document.querySelector("#shoesID>td>#shoesID").value;
        insert(id, dataLocal);
        clearInputData();
        generateID().then((ID) => {
          document.querySelector("#shoesID>td>#shoesID").value = ID;
        });
        if (getData("CURRENT_DATA")) removeData("CURRENT_DATA");
      }
    }
  } else {
    alert("Invalid input!");
  }
}

function addOnClick() {
  // Add data more than one.

  var data = getInputData();
  var index =
    parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;
  console.log("addOnClick");
  console.log(index);
  var dataLength = -3;
  var dataLocal = getData("CURRENT_DATA");
  for (var key in dataLocal) dataLength++;
  console.log(dataLength);
  if (index >= dataLength || dataLength === -3) {
    if (isValidInsert(data)) {
      if (dataLocal) {
        // If CURRENT_DATA already exists.
        delete data["Status"];
        dataLocal[dataLength] = data;
      } else {
        dataLocal = {};
        dataLocal["Status"] = data["Status"];
        delete data["Status"];
        dataLocal[0] = data;
        dataLocal["timestampIn"] = ServerValue.TIMESTAMP;
        dataLocal["timestampOut"] = 0;
      }
      var nextNo =
        parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) + 1;
      storeData("CURRENT_DATA", JSON.stringify(dataLocal));
      clearInputData();
      document.querySelector("#shoesNo>td>#shoesNo").value = nextNo;
      document.querySelector(
        "#insertUpdate > div > button:nth-child(1)"
      ).disabled = false;
    } else {
      alert("Invalid input!");
    }
  } else {
    console.log(`from else ${dataLength + 1}`);
    clearInputData();
    document.querySelector("#shoesNo>td>#shoesNo").value = dataLength + 1;
    document.querySelector(
      "#insertUpdate > div > button:nth-child(1)"
    ).disabled = false;
  }
}

function saveDataUpdate(id, no, localData) {
  var data = getInputData();
  delete data["Status"];
  localData[id][no] = data;
  console.log(localData);
  storeData("DATA", JSON.stringify(localData));
}

function cancelOnClickInsert() {
  // Cancel data
  // Ask confirmation if CURRENT_DATA exists in sessionStorage
  // or ShoesBrand and ShoesSize are not empty
  if (getData("CURRENT_DATA") || isValidInsert(getInputData())) {
    if (confirm("Are you sure you want to discard the data?"))
      removeData("CURRENT_DATA");
  }
  document.querySelector(".popup-container").style.display = "none";
  document
    .querySelector("#insertupdate")
    .removeEventListener("click", insertOnClick);
  document.querySelector("#addBtn").removeEventListener("click", addOnClick);
  document
    .querySelector(".popup>.popup-buttons>#cancel")
    .removeEventListener("click", cancelOnClickInsert); // Self remove
}

function cancelOnClickUpdate() {
  // Only ask for confirmation if user has changed data.

  var id = document.querySelector("#shoesID>td>#shoesID").value.toUpperCase();
  var cancel = true;
  var initData;
  var data = getData("DATA");
  if (data[id]) {
    initData = getData(id);
    if (isValidUpdate(data[id], initData)) {
      cancel = confirm(
        "Are you sure you want to cancel update?\nThis will discard any changes you made."
      );
    }
  }

  if (cancel) {
    // Restore data back, when user click cancel and confirm OK.
    if (data[id]) {
      data[id] = initData;
      storeData("DATA", JSON.stringify(data));
      removeData(id);
    }

    document.querySelector(".popup-container").style.display = "none";
    document
      .querySelector("#insertUpdate")
      .removeEventListener("click", updateOnClick);
    document
      .querySelector(".popup>.popup-buttons>#cancel")
      .removeEventListener("click", cancelOnClickUpdate); // Self Remove
  }
}

function updateOnClick() {
  // Update only works when data is changged
  // Ask confirmation if above conditon meet.
  var id = document.querySelector("#shoesID>td>#shoesID").value;
  var dataLocal = getData("DATA")[id];
  var data = getInputData();

  if (confirm("Are you sure you want to update data?")) {
    var index =
      parseInt(document.querySelector("#shoesNo>td>#shoesNo").value) - 1;
    if (isDone()) {
      dataLocal["Status"] = data["Status"];
      dataLocal["timestampOut"] = ServerValue.TIMESTAMP;
    }
    delete data["Status"];
    dataLocal[index] = data;

    update(id, dataLocal);
    removeData(id);
    clearInputData();
    document.querySelector("#shoesID>td>#shoesID").value = "";
    document.querySelector("#shoesStatus>td>#shoesStatus").value =
      "In Progress";
  }
}

function inputHandler() {
  document.querySelector("#insertBtn").addEventListener("click", () => {
    document
      .querySelector("#insertupdate")
      .removeEventListener("click", updateOnClick);

    /* Popup part */
    if (document.querySelector(".popup>.content>div"))
      document.querySelector(".popup>.content>div").remove(); // Clear popup content
    document.querySelector(".popup>.popuptitle").innerText = "Insert Data";
    document.querySelector("#insertupdate").innerText = "INSERT";
    document
      .querySelector(".popup>.popup-buttons>#cancel")
      .addEventListener("click", cancelOnClickInsert);

    /* Template part */
    var template = document
      .querySelector("#insertUpdateTemplate")
      .content.cloneNode(true).children[0];
    template.children[1].children[0].addEventListener("click", backDataInsert); // back data
    template.children[1].children[1].addEventListener("click", addOnClick); // add data
    template.children[1].children[2].addEventListener("click", nextDataInsert); // next data
    template.children[0].children[0].children[0].children[1].children[0].value =
      getData("ID"); // ID input
    template.children[0].children[0].children[3].children[1].children[0].addEventListener(
      "input",
      (e) => {
        // Shoes size input
        import("../utils/validate").then((valid) => {
          var shoesSize = document.querySelector(
            "#insertUpdate>#input>tbody>#shoesSize>td:last-child>input"
          ).value;

          if (shoesSize.length === 4) {
            shoesSize = shoesSize.slice(0, -1);
          } else if (shoesSize.length > 4) {
            shoesSize = "";
          }

          if (!valid.is_intOnly(shoesSize)) {
            document.querySelector(
              "#insertUpdate>#input>tbody>#shoesSize>td:last-child>input"
            ).value = shoesSize; // Update content
          }
        });
      }
    );
    document.querySelector(".popup>.content").appendChild(template);
    document.querySelector(".popup-container").style.display = "";

    document
      .querySelector("#insertupdate")
      .addEventListener("click", insertOnClick);
  });
}

async function updateHandler() {
  document.querySelector("#updateBtn").addEventListener("click", () => {
    // Remove eventlistener for insert operation
    document
      .querySelector("#insertupdate")
      .removeEventListener("click", insertOnClick);

    /* Popup part */
    if (document.querySelector(".popup>.content>div"))
      document.querySelector(".popup>.content>div").remove(); // Clear popup content
    document.querySelector(".popup>.popuptitle").innerText = "Update Data";
    document.querySelector("#insertupdate").innerText = "UPDATE";
    document
      .querySelector(".popup>.popup-buttons>#cancel")
      .addEventListener("click", cancelOnClickUpdate);

    /* Template part */
    var template = document
      .querySelector("#insertUpdateTemplate")
      .content.cloneNode(true).children[0];
    template.children[1].children[1].remove();
    //template.children[1].children[1].classList.remove("plus-button");
    //template.children[1].children[1].classList.remove("plus-button--small");
    template.children[1].children[0].addEventListener("click", backDataUpdate); // back data
    //template.children[1].children[1].addEventListener("click", saveDataUpdate); // save data
    template.children[1].children[1].addEventListener("click", nextDataUpdate); // next data
    template.children[0].children[0].children[0].children[1].children[0].disabled = false; // ID input
    template.children[0].children[0].children[0].children[1].children[0].addEventListener(
      "input",
      async () => {
        var query = document
          .querySelector(
            "#insertUpdate>#input>tbody>#shoesID>td:last-child>input"
          )
          .value.toUpperCase();
        var queryLength = query.length;
        console.log(query);
        document.querySelector(
          "#insertUpdate>#input>tbody>#shoesID>td:last-child>input"
        ).value = query;

        // Disable next and back button if data not exist or not match condition queryLength === 3
        if (queryLength === 3) {
          var itExist = false;
          var data = getData("DATA");
          var fetchFirebase = true;
          if (data) {
            // This is when ID exist in DATA sessionStorage
            if (data[query]) {
              itExist = true;
              data = data[query];
              showData(data);
              fetchFirebase = false;
            }
          } else {
            data = {};
          }

          if (fetchFirebase) {
            var dataFromDB = await read(query); // Read from Firebase Database
            if (dataFromDB["timestampOut"] === 0) {
              data[query] = dataFromDB;
              storeData("DATA", JSON.stringify(data));
              data = data[query];

              console.log("else");
              console.log(data);
              if (data) {
                itExist = true;
                showData(data);
              }
              // Else do nothing.
            }
          }

          if (itExist) {
            storeData(query, JSON.stringify(data)); // This data store in sessionStorage, data are stored when
            // query exists in sessionStorage "DATA" or in Firebase.
            // With format "{ID: data}". This also act as "DEFAULT" DATA
            // or backup data, when user click cancel.

            // Shoes Status
            if (data["timestampOut"] === 0)
              document.querySelector(
                "#shoesStatus>td>#shoesStatus"
              ).options[0].selected = true;
            // In Progress
            else
              document.querySelector(
                "#shoesStatus>td>#shoesStatus"
              ).options[1].selected = true; // Done

            var dataLength = -3;
            console.log("dataLength ");
            for (var key in data) dataLength++;
            console.log(dataLength);
            if (dataLength >= 2) {
              // Enabled next button
              document.querySelector(
                "#insertUpdate > div > button:last-child"
              ).disabled = false;
            }
          } else {
            document.querySelector(
              "#insertUpdate > div > button:nth-child(1)"
            ).disabled = true;
            document.querySelector(
              "#insertUpdate > div > button:last-child"
            ).disabled = true;
            clearInputData();
          }
        } else {
          if (queryLength > 9) {
            document.querySelector(
              "#insertUpdate>#input>tbody>#shoesID>td:last-child>input"
            ).value = "";
          } else {
            while (queryLength > 3) {
              document.querySelector(
                "#insertUpdate>#input>tbody>#shoesID>td:last-child>input"
              ).value = insertText.slice(0, -1);
              newLength = document.querySelector(
                "#insertUpdate>#input>tbody>#shoesID>td:last-child>input"
              ).value;
              queryLength = newLength.length;
            }
          }
          document.querySelector(
            "#insertUpdate > div > button:nth-child(1)"
          ).disabled = true;
          document.querySelector(
            "#insertUpdate > div > button:last-child"
          ).disabled = true;
          document.querySelector("#shoesStatus>td>#shoesStatus").value =
            "In Progress";
          clearInputData();
        }
      }
    );

    template.children[0].children[0].children[3].children[1].children[0].addEventListener(
      "input",
      (e) => {
        // Shoes size input
        import("../utils/validate").then((valid) => {
          var shoesSize = document.querySelector(
            "#insertUpdate>#input>tbody>#shoesSize>td:last-child>input"
          ).value;

          if (shoesSize.length === 4) {
            shoesSize = shoesSize.slice(0, -1);
          } else if (shoesSize.length > 4) {
            shoesSize = "";
          }

          if (!valid.is_intOnly(shoesSize)) {
            console.log("I AM Inside");
            shoesSize = shoesSize.slice(0, -1);
          }

          document.querySelector(
            "#insertUpdate>#input>tbody>#shoesSize>td:last-child>input"
          ).value = shoesSize; // Update content
        });
      }
    );

    document.querySelector(".popup>.content").appendChild(template);
    document.querySelector(".popup-container").style.display = "";

    document
      .querySelector("#insertupdate")
      .addEventListener("click", updateOnClick);
  });
}

//function deleteHandler() {}

function displayData(data, prepend = false) {
  // Node-1
  for (var childKey in data) {
    var tree = document.querySelector("#treeTemplate").content.cloneNode(true)
      .children[0];

    // Node-1 Icon
    tree.children[0].children[0].classList.add("closed");
    tree.children[0].children[0].addEventListener("click", (e) => {
      console.log(e);

      var displayState = Boolean(
        getParentOfDepth(2, e.target).children[1].style.display
      );

      if (!displayState) {
        getParentOfDepth(2, e.target).children[1].style.display = "none";
        var elementCount =
          getParentOfDepth(2, e.target).children[1].childElementCount - 3;
        for (var idx = 0; idx < elementCount; idx++) {
          getParentOfDepth(2, e.target).children[1].children[
            idx
          ].children[0].children[0].classList.remove("opened");
          getParentOfDepth(2, e.target).children[1].children[
            idx
          ].children[0].children[0].classList.add("closed");
          getParentOfDepth(2, e.target).children[1].children[
            idx
          ].children[1].style.display = "none";
        }
      } else {
        getParentOfDepth(2, e.target).children[1].style.display = "";
      }

      var currentState = e.target.classList[1];

      if (currentState === "closed") {
        e.target.classList.remove("closed");
        e.target.classList.add("opened");
      } else if (currentState === "opened") {
        e.target.classList.remove("opened");
        e.target.classList.add("closed");
      } else {
        console.log("[Error]: No class state."); // This error happen when an elements doesn't have class closed nor opened.
      }
    });

    // Header content
    var contents = document
      .querySelector("#treeContent")
      .content.cloneNode(true);
    contents.children[0].children[0].innerText = childKey;
    tree.children[0].appendChild(contents);

    var ulInner = document.createElement("ul");

    // Node-2
    var dataChild = data[childKey];
    for (var childKey2 in dataChild) {
      var treeChild = document
        .querySelector("#treeTemplate")
        .content.cloneNode(true).children[0];
      var treeChildContent = treeChild.children[0];
      var content = document
        .querySelector("#childContent")
        .content.cloneNode(true);

      if (childKey2 === "Status") {
        treeChildContent.children[0].classList.add("leaf");
        content.children[0].children[0].innerText = `Status: ${dataChild[childKey2]}`;
        content.children[0].children[1].remove();
      } else if (childKey2 === "timestampIn") {
        treeChildContent.children[0].classList.add("leaf");
        content.children[0].children[0].innerText = `Entry date: ${new Date(
          dataChild[childKey2]
        ).toLocaleDateString("id", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;
        content.children[0].children[1].remove();
      } else if (childKey2 === "timestampOut") {
        var date;
        if (dataChild[childKey2] === 0) date = "-";
        else
          date = new Date(dataChild[childKey2]).toLocaleDateString("id", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        treeChildContent.children[0].classList.add("leaf");
        content.children[0].children[0].innerText = `Done date: ${date}`;
        content.children[0].children[1].remove();
      } else {
        treeChildContent.children[0].addEventListener("click", (e) => {
          var displayState = Boolean(
            getParentOfDepth(2, e.target).children[1].style.display
          );

          if (!displayState) {
            getParentOfDepth(2, e.target).children[1].style.display = "none";
          } else {
            getParentOfDepth(2, e.target).children[1].style.display = "";
          }

          var currentState = e.target.classList[1];

          if (currentState === "closed") {
            e.target.classList.remove("closed");
            e.target.classList.add("opened");
          } else {
            e.target.classList.remove("opened");
            e.target.classList.add("closed");
          }
        });
        treeChildContent.children[0].classList.add("closed");
        content = document
          .querySelector("#childContent")
          .content.cloneNode(true);
        content.children[0].children[0].innerText = parseInt(childKey2) + 1;

        // Node-3
        var ulInner2 = document.createElement("ul");
        var dataChildMeta = dataChild[childKey2];
        for (var childKey3 in dataChildMeta) {
          var treeDataChild = document
            .querySelector("#treeTemplate")
            .content.cloneNode(true).children[0];
          var treeDataContent = treeDataChild.children[0];

          treeDataContent.children[0].classList.add("leaf");

          var contents = document.createElement("span");
          contents.innerText = `${childKey3}: ${dataChildMeta[childKey3]}`;

          treeDataContent.appendChild(contents);
          ulInner2.appendChild(treeDataChild);
          ulInner2.style.display = "none";
        }
        treeChild.appendChild(ulInner2);
      }

      treeChildContent.appendChild(content);
      ulInner.appendChild(treeChild);
      ulInner.style.display = "none";
    }

    tree.appendChild(ulInner);
    console.log(tree);

    if (!prepend) document.querySelector("#display").appendChild(tree);
    else
      document
        .querySelector("#display")
        .insertBefore(tree, document.querySelector("#display>li"));
  }
}

function showData(data, idx = 0) {
  console.log("from showData");
  console.log(data);
  console.log(idx);
  document.querySelector("#shoesNo>td>#shoesNo").value = idx + 1; // ShoesNumber
  document.querySelector("#shoesStatus>td>#shoesStatus").value = data["Status"]; // Shoes Status
  document.querySelector("#shoesBrand>td>#shoesBrand").value =
    data[idx]["ShoesBrand"]; // Shoes Brand
  document.querySelector("#shoesSize>td>#shoesSize").value = data[idx]["Size"]; // Shoes Size
  document.querySelector("#shoesService>td>#shoesService").value =
    data[idx]["Service"]; // Shoes Service
}

// This function add new element if user signed
function defaultAdmin() {
  document.querySelector("#admin_login").remove();
  if (!Boolean(getData("DATA"))) {
    const response = adminRead("/");
    var dataList = {};
    response.then((data) => {
      for (var child in data) {
        dataList[child] = data[child];
      }
      console.log("response");
      console.log(data);
      console.log("dataList");
      console.log(dataList);
      storeData("data", JSON.stringify(dataList));
      displayData(dataList);
    });
  } else {
    var data = getData("DATA");
    displayData(data);
  }

  if (!Boolean(getData("ID"))) generateID();

  inputHandler();
  updateHandler();
}

export { defaultAdmin, displayData };
