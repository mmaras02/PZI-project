let users;
displayUsers();

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

async function displayUsers()
{
    const usersList=document.getElementById("user-display-container");
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
            usersList.appendChild(newElement);
        });
    }
}

function logoutButton(){
    document.cookie="";
    alert("You have been logged out!");
    window.location.href="./Login.html";
}