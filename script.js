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
          fetchAdditionalGitHubData(username);
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

function fetchAdditionalGitHubData(username) {
  const reposUrl = `https://api.github.com/users/${username}/repos`;

  fetch(reposUrl)
      .then(response => response.json())
      .then(repos => {
          let stars = 0;
          let forks = 0;
          let issues = 0;
          let watchers = 0;

          repos.forEach(repo => {
              stars += repo.stargazers_count;
              forks += repo.forks_count;
              issues += repo.open_issues_count;
              watchers += repo.watchers_count;
          });

          displayAdditionalGitHubData(stars, forks, issues, watchers);

          const eventsUrl = `https://api.github.com/users/${username}/events`;
          return fetch(eventsUrl);
      })
      .then(response => response.json())
      .then(events => {
          const pageViews = events.length; // Simplified example; replace with actual data if available
          const uniqueVisitors = new Set(events.map(event => event.actor.id)).size; // Simplified example; replace with actual data if available
          const contributions = events.filter(event => event.type === 'PushEvent').length;

          displayOverviewData(pageViews, uniqueVisitors, contributions);
      })
      .catch(error => console.error('Error fetching additional GitHub data:', error));
}

function displayAdditionalGitHubData(stars, forks, issues, watchers) {
  document.getElementById('stars').textContent = stars;
  document.getElementById('forks').textContent = forks;
  document.getElementById('issues').textContent = issues;
  document.getElementById('watchers').textContent = watchers;
}

function displayOverviewData(pageViews, uniqueVisitors, contributions) {
  document.getElementById('page-views').textContent = pageViews;
  document.getElementById('unique-visitors').textContent = uniqueVisitors;
  document.getElementById('contributions').textContent = contributions;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
  } else {
      localStorage.setItem('dark-mode', 'disabled');
  }
}
