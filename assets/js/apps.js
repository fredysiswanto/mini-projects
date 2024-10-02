async function getData() {
  return fetch('./content.json')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error('Unable to fetch data:', error));
}

async function insertUi() {
  const { menu, contents } = await getData();
  const containerElem = document.getElementById('container');

  contents.forEach((e) => {
    const newElement = document.createElement('div');
    newElement.className = 'col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5';
    newElement.innerHTML = `
        <figure class="effect-ming tm-video-item">
            <img src="assets/images/${e.image}" alt="Image" class="img-fluid" />
            <figcaption
              class="d-flex align-items-center justify-content-center">
              <h2>${e.title}</h2>
              <a href="${e.link}">View more</a>
            </figcaption>
          </figure>
          <div class="d-flex justify-content-between tm-text-gray">
            <span class="tm-text-gray-light">3 Aug 2020</span>
            <span>21,204 views</span>
          </div>
          <h4 class ="title"><a href="${e.link}">${e.title}</a></h4>
        </div>
    `;
    containerElem.appendChild(newElement);
  });
}

insertUi();
