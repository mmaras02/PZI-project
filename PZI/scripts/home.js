let users;
let selectedEmployeeId;
displayEmployees();

async function fetchData() {
    try {
      const apiUrl = 'https://jsonplaceholder.typicode.com/users';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error:', error);
    }
  }

async function displayEmployees()
{
    const usersList=document.getElementById("user-display-container");
    console.log("helooo");
    users=await fetchData();
    if(users)
    {
        users.forEach(user => {
            const newElement=document.createElement('div');
            newElement.className="user-container";
            newElement.innerHTML=`
              <p>Username: ${user.username}</p>
              <p>Email: ${user.email}</p>
            `;
            console.log("helooo");
            newElement.addEventListener('click', function(){displayEmployeeInfo(user);});
            usersList.appendChild(newElement);
        
        });
    }
}

function logoutButton(){
    document.cookie="";
    alert("You have been logged out!");
    window.location.href="./Login.html";
}

function displayEmployeeInfo(user) {
  console.log("help");
  const userInfo = document.getElementById("employee-info");
  userInfo.innerHTML = `
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email}</p>
      <p>Address: ${user.address.street}, ${user.address.city}</p>
      <p>Phone: ${user.phone}</p>
      <p>Website: ${user.website}</p>
  `;
  selectedEmployeeId=user.id;
  console.log(selectedEmployeeId);
  DisplayPTOData(selectedEmployeeId);
}


/*CALENDAR */

let date1 = new Date();
let startYear = date1.getFullYear();
let startMonth = date1.getMonth();

let date2 = new Date();
let endYear = date2.getFullYear();
let endMonth = date2.getMonth();

let ptoStartDate;
let ptoEndDate;

const day1 = document.getElementById("calendar-dates-start");
const day2 = document.getElementById("calendar-dates-end");

const currdate1 = document.getElementById("calendar-current-date-start");
const currdate2 = document.getElementById("calendar-current-date-end");

const navigationIcons1 = document.querySelectorAll("#calendar-navigation-start span");
const navigationIcons2 = document.querySelectorAll("#calendar-navigation-end span");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const manipulate1 = () => {
    let dayone = new Date(startYear, startMonth, 1).getDay();
    let lastdate = new Date(startYear, startMonth + 1, 0).getDate();
    let dayend = new Date(startYear, startMonth, lastdate).getDay();
    let monthlastdate = new Date(startYear, startMonth, 0).getDate();
    let lit = "";
    for (let i = dayone; i > 0; i--) {
        lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
    for (let i = 1; i <= lastdate; i++) {
        let isToday = i === date1.getDate() && startMonth === new Date().getMonth() && startYear === new Date().getFullYear() ? "active" : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }
    currdate1.innerText = `${months[startMonth]} ${startYear}`;
    day1.innerHTML = lit;


    //just trying
    const dateElements = day1.querySelectorAll("li");
    dateElements.forEach(dateElement => {
        dateElement.addEventListener("click", () => {

            day1.querySelectorAll(".selected").forEach(el => {
                el.classList.remove("selected");
            });

            dateElement.classList.add("selected");
            ptoStartDate = new Date(startYear, startMonth, parseInt(dateElement.textContent));
            console.log(`Selected start date: ${ptoStartDate}`);
            //showChoosenDates();
            document.getElementById("start-date").innerHTML=` PTO Start Date: ${ptoStartDate ? ptoStartDate.toLocaleDateString() : ''}`;
        });
      });
}

const manipulate2 = () => {
    let dayone = new Date(endYear, endMonth, 1).getDay();
    let lastdate = new Date(endYear, endMonth + 1, 0).getDate();
    let dayend = new Date(endYear, endMonth, lastdate).getDay();
    let monthlastdate = new Date(endYear, endMonth, 0).getDate();
    let lit = "";
    for (let i = dayone; i > 0; i--) {
        lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
    for (let i = 1; i <= lastdate; i++) {
        let isToday = i === date2.getDate() && endMonth === new Date().getMonth() && endYear === new Date().getFullYear() ? "active" : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }
    currdate2.innerText = `${months[endMonth]} ${endYear}`;
    day2.innerHTML = lit;


    //samo proba
    const dateElements1 = day2.querySelectorAll("li");
    dateElements1.forEach(dateElement => {
        dateElement.addEventListener("click", () => {

            day2.querySelectorAll(".selected").forEach(el => {
                el.classList.remove("selected");
            });

            dateElement.classList.add("selected");
            ptoEndDate = new Date(endYear, endMonth, parseInt(dateElement.textContent));
            console.log(`Selected end date: ${ptoEndDate}`);
            //showChoosenDates();
            document.getElementById("end-date").innerHTML=` PTO End Date: ${ptoEndDate ? ptoEndDate.toLocaleDateString() : ''}`;
           
        });
      });
}

manipulate1();
manipulate2();

navigationIcons1.forEach(icon => {
  icon.addEventListener("click", () => {
      startMonth = icon.id === "calendar-prev-start" ? startMonth - 1 : startMonth + 1;
      if (startMonth < 0 || startMonth > 11) {
          startYear = icon.id === "calendar-prev-start" ? startYear - 1 : startYear + 1;
          startMonth = icon.id === "calendar-prev-start" ? 11 : 0;
      }
      manipulate1();
  });
});

navigationIcons2.forEach(icon => {
  icon.addEventListener("click", () => {
      endMonth = icon.id === "calendar-prev-end" ? endMonth - 1 : endMonth + 1;
      if (endMonth < 0 || endMonth > 11) {
          endYear = icon.id === "calendar-prev-end" ? endYear - 1 : endYear + 1;
          endMonth = icon.id === "calendar-prev-end" ? 11 : 0;
      }
      manipulate2();
  });
});

/*function showChoosenDates(){
  document.getElementById("start-date").textContent=` PTO Start Date: ${startDate ? startDate.toLocaleDateString() : ''}`;
  document.getElementById("end-date").textContent=` PTO End Date: ${endDate ? endDate.toLocaleDateString() : ''}`;
}*/

function CheckAndSubmit(){

  if(selectedEmployeeId===undefined){
    alert("No employees choosen!");
    return;
  }
  if(ptoStartDate>ptoEndDate){
    alert("Start date can't be after the end date");
    return;
  }
  else{
    alert("PTO date successfully saved!");
    StoreData();
    //CheckDateSeason();
    DisplayPTOData(selectedEmployeeId);
  }
}

function StoreData(){
  const datesArray = [ptoStartDate.toLocaleDateString(),ptoEndDate.toLocaleDateString()];
  //localStorage.setItem(selectedEmployeeId, JSON.stringify(userArray)); -->only saves one

  const userData = JSON.parse(localStorage.getItem(selectedEmployeeId)) || [];
  userData.push(datesArray);
  localStorage.setItem(selectedEmployeeId, JSON.stringify(userData));
  console.log(userData);
}

 
function handleXIconClick(e)
{
  console.log("deleting...");
  const clickedXIcon=e.currentTarget;
  const card=clickedXIcon.parentElement;
  card.remove();
}



function DisplayPTOData(selectedEmployeeId){

  //need to create a div that containes picture of the season and inside date for that time period written
  //season pictures (2 relative links, 2 apsolute links)
  //logged user can delete PTO clicking on x in the corner of the picture
  //checks pair-dates and determines whether they are in the past current or upcoming  


  let allDates=JSON.parse(localStorage.getItem(selectedEmployeeId));
  console.log("all dates:",allDates);
  //const displayContainer=document.getElementById("display-container");
  const pastContainer=document.getElementById("past-container");
  const currentContainer=document.getElementById("current-container");
  const futureContainer=document.getElementById("future-container");
  //displayContainer.innerHTML = '';
  pastContainer.innerHTML = '';
  currentContainer.innerHTML = '';
  futureContainer.innerHTML = '';

  allDates.forEach((date) => {
    console.log("date pairs:",date);

    const startPTO=new Date(date[0]);
    const endPTO=new Date(date[1]);
    console.log("stratttting",startPTO);

    const season=CheckDateSeason(startPTO);
    console.log(season);

    let timePeriod=TimePeriod(startPTO,endPTO);
    console.log(timePeriod);

    const picture=GetPicture(season);
    /*<img src="${picture}"></img>*/

    //creating big picture div
    const newElement=document.createElement('div');
    newElement.className="picture-container";
    newElement.style.backgroundImage=`url("${picture}")`;
    newElement.innerHTML=`
      <i class="fa fa-times x-icon"></i>
      <div id="overlay">
        <p>${date[0]} - ${date[1]}</p>
      </div>
    `;

    if(timePeriod==="past"){
      console.log("helop");
      pastContainer.appendChild(newElement);
      //document.getElementById('past-title').style.display = 'block';
    }
    else if(timePeriod==="current"){
      currentContainer.appendChild(newElement);
      //document.getElementById('current-title').style.display = 'block';
    }
    else{
      futureContainer.appendChild(newElement);
      //document.getElementById('future-title').style.display = 'block';
    }
  });


  const xIcons = document.querySelectorAll(".x-icon");
  xIcons.forEach(xIcon => {
    xIcon.addEventListener("click", handleXIconClick);
  });

  document.getElementById('past-title').style.display = pastContainer.childElementCount > 0 ? 'block' : 'none';
  document.getElementById('current-title').style.display = currentContainer.childElementCount > 0 ? 'block' : 'none';
  document.getElementById('future-title').style.display = futureContainer.childElementCount > 0 ? 'block' : 'none';
}

function CheckDateSeason(startDate){

  const startMonth = startDate.getMonth();
  const startDay = startDate.getDay();

  // December 21st - March 20th
  if ((startMonth === 11 && startDay >= 21) || startMonth === 0 || startMonth===1 || (startMonth === 2 && startDay <= 20)) {
    return "winter";
  }
  // March 21st - June 20th 
  else if ((startMonth === 2 && startDay >= 21) || startMonth === 3 || startMonth===4 || (startMonth === 5 && startDay <= 20)) {
    return "spring";
  }
  //June 21st - 22nd September
  else if ((startMonth === 5 && startDay >= 21) || startMonth === 6 || startMonth===7 || (startMonth === 8 && startDay <= 20)) {
    return "summer";
  }
  // September 21st - December 20th 
  else if ((startMonth === 8 && startDay >= 21) || startMonth === 9 || startMonth===10 || (startMonth === 11 && startDay <= 20)) {
    return "autumn";
  } else {
    return "invalid date range";
  }
}

function GetPicture(season){
  switch(season){
    case "winter":
      return "images/winter.jpg";
    case "spring":
      return "images/spring.jpg";
    case "summer":
      return "images/summer.jpg";
    case "autumn":
      return "images/autumn.jpg";
    default:
      return;
  }
}

function TimePeriod(startPTO,endPTO){
  //calculate if it is current past or present
  const currentDate = new Date();

  // Compare the input date with the current date
  if (startPTO < currentDate && endPTO<currentDate) {
    return "past";
  }
  else if(startPTO<currentDate && endPTO>currentDate){
    return "current";
  } 
  else{
    return "future";
  }
}

