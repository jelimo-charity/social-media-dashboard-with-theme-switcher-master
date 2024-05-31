document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubData();
  
    // Toggle dark mode
    const darkModeToggle = document.getElementById('darkmode-toggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);
  
    if (localStorage.getItem('dark-mode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
  });
  
  function fetchGitHubData() {
    const username = 'fbiego'; // Replace with any GitHub username
    const url = `https://api.github.com/users/${username}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayGitHubData(data);
      })
      .catch(error => console.error('Error fetching GitHub data:', error));
  }
  
  function displayGitHubData(data) {
    document.getElementById('userName').textContent = `${data.name} `;
    document.getElementById('Followers').textContent = `${data.followers}`;
    document.getElementById('Following').textContent = ` ${data.following}`;
    document.getElementById('userg').textContent = ` ${data.name}`;
    document.getElementById('total-followers').innerText = data.followers;
    //card three
    document.getElementById('location').textContent = ` ${data.location}`;
    document.getElementById('company-name').textContent = `Company: ${data.company}`;
    document.getElementById('blog').innerText =` Blog: ${data.blog}`;
 //card four
 document.getElementById('gists').textContent = `Gists: ${data.public_gists}`;
 document.getElementById('public-repos').textContent = `Public Repos: ${data.public_repos}`;
 document.getElementById('createdat').innerText =` Created at: ${data.created_at}`;

  }
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  }
  