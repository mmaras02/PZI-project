let employees;
let selectedEmployeeId;
let pastContainer=document.getElementById("past-container");
let currentContainer=document.getElementById("current-container");
let futureContainer=document.getElementById("future-container");
DisplayEmployees();

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

async function DisplayEmployees()
{
    const employeeList=document.getElementById("user-display-container");

    try {
      employees=await fetchData();
      if(employees)
      {
        employees.forEach(employee => {
              const newElement=document.createElement('div');
              newElement.className="employee-container";
              newElement.innerHTML=`
                <p> ${employee.name}</p>
                <p> ${employee.email}</p>
              `;
              newElement.addEventListener('click', function(){DisplayEmployeeInfo(employee);});
              employeeList.appendChild(newElement);
          });
      }
      
    } catch (error) {
      console.log("Error fetching data!");
    }
}

function LogoutButton(){
    document.cookie="";
    alert("You have been logged out!");
    window.location.href="./Login.html";
}

function DisplayEmployeeInfo(employee) {
  const userInfo = document.getElementById("employee-info");
  userInfo.innerHTML = `
      <p>Name: ${employee.name}</p>
      <p>Username: ${employee.username}</p>
      <p>Email: ${employee.email}</p>
      <p>Address: ${employee.address.street}, ${employee.address.city}</p>
      <p>Phone: ${employee.phone}</p>
      <p>Website: ${employee.website}</p>
  `;
  selectedEmployeeId=employee.id;
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

    const dateElements = day1.querySelectorAll("li");
    dateElements.forEach(dateElement => {
        dateElement.addEventListener("click", () => {

            day1.querySelectorAll(".selected").forEach(element => {
                element.classList.remove("selected");
            });

            dateElement.classList.add("selected");
            ptoStartDate = new Date(startYear, startMonth, parseInt(dateElement.textContent));
            console.log(`Selected start date: ${ptoStartDate}`);
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

    const dateElements1 = day2.querySelectorAll("li");
    dateElements1.forEach(dateElement => {
        dateElement.addEventListener("click", () => {

            day2.querySelectorAll(".selected").forEach(element => {
                element.classList.remove("selected");
            });

            dateElement.classList.add("selected");
            ptoEndDate = new Date(endYear, endMonth, parseInt(dateElement.textContent));
            console.log(`Selected end date: ${ptoEndDate}`);
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

function CheckAndSubmit(){

  if(selectedEmployeeId===undefined){
    alert("No employees choosen!");
    RemoveDates();
    return;
  }
  if(ptoStartDate===undefined || ptoEndDate===undefined){
    alert("You are missing a date!");
    RemoveDates();
    return;
  }
  if(ptoStartDate>ptoEndDate){
    alert("Start date can't be after the end date");
    RemoveDates();
    return;
  }
  else{
    alert("PTO date successfully saved!");
    StoreData();
    DisplayPTOData(selectedEmployeeId);
    RemoveDates();
  }
}

function RemoveDates(){
  const selectedElements = document.querySelectorAll(".selected");
    selectedElements.forEach(element => {
      element.classList.remove("selected");
    });
}

function StoreData(){
  const datesArray = [ptoStartDate.toLocaleDateString(),ptoEndDate.toLocaleDateString()];

  const userData = JSON.parse(localStorage.getItem(selectedEmployeeId)) || [];
  userData.push(datesArray);
  localStorage.setItem(selectedEmployeeId, JSON.stringify(userData));
  console.log(userData);
}

function HandleHiddenTitle(){
  document.getElementById('past-title').style.display = pastContainer.childElementCount  > 0 ? 'block' : 'none';
  document.getElementById('current-title').style.display = currentContainer.childElementCount  > 0 ? 'block' : 'none';
  document.getElementById('future-title').style.display = futureContainer.childElementCount  > 0 ? 'block' : 'none';
}
 
function handleXIconClick(e)
{
  console.log("deleting...");

  const clickedXIcon=e.currentTarget;
  const card=clickedXIcon.parentElement;

  console.log("parent element of card",card);
  const child=card.children[1];
  const dataToDelete=child.children[0].textContent;

  let userData = JSON.parse(localStorage.getItem(selectedEmployeeId)) || [];

  userData=userData.filter(item=>item.join(" - ")!==dataToDelete);
  console.log("This is new user data:",userData);

  localStorage.setItem(selectedEmployeeId,JSON.stringify(userData));

  document.getElementById('past-title').style.display = pastContainer.childElementCount -1 > 0 ? 'block' : 'none';
  document.getElementById('current-title').style.display = currentContainer.childElementCount - 1 > 0 ? 'block' : 'none';
  document.getElementById('future-title').style.display = futureContainer.childElementCount - 1 > 0 ? 'block' : 'none';

  card.remove();
}

function DisplayPTOData(selectedEmployeeId){
  let allDates=JSON.parse(localStorage.getItem(selectedEmployeeId)) || [];
  console.log("all dates:",allDates);
  
  pastContainer.innerHTML = '';
  currentContainer.innerHTML = '';
  futureContainer.innerHTML = '';

  HandleHiddenTitle();

  allDates.forEach((date) => {
    console.log("date pairs:",date);

    const startPTO=new Date(date[0]); 
    const endPTO=new Date(date[1]); 

    const timePeriod=TimePeriod(startPTO,endPTO);
    console.log(timePeriod);

    const season=CheckDateSeason(startPTO);
    console.log(season);

    const picture=GetPicture(season);

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
      pastContainer.appendChild(newElement);
    }
    else if(timePeriod==="current"){
      currentContainer.appendChild(newElement);
    }
    else{
      futureContainer.appendChild(newElement);
    }
  });

  const xIcons = document.querySelectorAll(".x-icon");
  xIcons.forEach(xIcon => {
    xIcon.addEventListener("click", handleXIconClick);
  });

  HandleHiddenTitle();
}

function CheckDateSeason(startDate){

  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();
  console.log("this is startDay",startDate.getDate());

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
      return "https://wallpapers.com/images/hd/spring-desktop-sakura-trees-park-xgaf5iia8c63amqz.jpg";
    case "summer":
      return "https://picstatio.com/large/izgjhw/beach-morning-sea.jpg";
    case "autumn":
      return "images/autumn.jpg";
    default:
      return;
  }
}

function TimePeriod(startPTO,endPTO){
  const currentDate = new Date();

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

