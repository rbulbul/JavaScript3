'use strict';

/*
  Write here your JavaScript for HackYourRepo!
*/

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function fillRepoDetails(currentRepo, repoSection) {
  const div = createAndAppend('div', repoSection, {
    class: 'card',
  });
  const table = createAndAppend('table', div);
  const tbody = createAndAppend('tbody', table);
  let tr = createAndAppend('tr', tbody);
  createAndAppend('td', tr, {
    text: 'Repository:',
  });
  const td = createAndAppend('td', tr);
  createAndAppend('a', td, {
    text: currentRepo.name,
    href: currentRepo.html_url,
  });
  tr = createAndAppend('tr', tbody);
  createAndAppend('td', tr, {
    text: 'Description:',
  });
  createAndAppend('td', tr, {
    text: currentRepo.description,
  });
  tr = createAndAppend('tr', tbody);
  createAndAppend('td', tr, {
    text: 'Forks:',
  });
  createAndAppend('td', tr, {
    text: currentRepo.forks,
  });
  tr = createAndAppend('tr', tbody);
  createAndAppend('td', tr, {
    text: 'Updated:',
  });
  createAndAppend('td', tr, {
    text: currentRepo.updated_at,
  });
}

function loadRepo(repoSection, contributorsSection, currentRepo) {
  repoSection.innerHTML = '';
  contributorsSection.innerHTML = '';
  // fill contributor section
  fillContributorsDetails(currentRepo, contributorsSection);
  // fill repo section
  fillRepoDetails(currentRepo, repoSection);
}

function fillContributorsDetails(currentRepo, contributorsSection) {
  fetch(currentRepo.contributors_url)
    .then((response) => {
      return response.json();
    })
    .then((contributors) => {
      createAndAppend('p', contributorsSection, {
        text: 'Contributors',
        class: 'card contributorsTitle',
      });
      contributors
        .sort((contributor1, contributor2) =>
          contributor1.login.localeCompare(contributor2.login),
        )
        .forEach((contributor) => {
          const div = createAndAppend('div', contributorsSection, {
            class: 'card card-small',
          });
          createAndAppend('img', div, {
            src: contributor.avatar_url,
          });
          createAndAppend('a', div, {
            text: contributor.login,
            href: contributor.html_url,
            class: 'userName',
          });
          createAndAppend('span', div, {
            text: contributor.contributions,
            class: 'badge',
          });
        });
    })
    .catch((err) => {
      const root = document.getElementById('root');
      createAndAppend('div', root, {
        text: err.message,
        class: 'alert-error',
      });
    });
}

function main(url) {
  fetch(url)
    .then((response) => {
      let myOK = response.ok;
      // returns true if the response returned successfully
      if (myOK) {
        return response.json();
      } else {
        throw new Error(
          'Failed to load request',
          response.status,
          response.statusText,
        );
      }
    })
    .then((repos) => {
      const root = document.getElementById('root');
      const header = createAndAppend('header', root, {
        text: 'HYF Repositories',
      });
      header.setAttribute('class', 'header');
      const select = createAndAppend('select', header, {
        class: 'selectMenu',
      });
      const mainElm = createAndAppend('main', root, {
        class: 'main-container',
      });
      const repoSection = createAndAppend('section', mainElm, {
        class: 'repo-container',
      });
      const contributorsSection = createAndAppend('section', mainElm, {
        class: 'contributors-container',
      });
      repos
        .sort((repo1, repo2) => repo1.name.localeCompare(repo2.name))
        .forEach((repo) => {
          createAndAppend('option', select, {
            text: repo.name,
          });
        });
      // fetch and fill the current selected repo
      select.addEventListener('change', () => {
        loadRepo(repoSection, contributorsSection, repos[select.selectedIndex]);
      });
      // fetch and fill the first repo when data arrived
      loadRepo(repoSection, contributorsSection, repos[select.selectedIndex]);
    })
    .catch((err) => {
      const root = document.getElementById('root');
      createAndAppend('div', root, {
        text: err.message,
        class: 'alert-error',
      });
    });
}

const hackYourRepo =
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
window.onload = () => main(hackYourRepo);
