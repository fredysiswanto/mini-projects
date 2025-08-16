document.addEventListener('DOMContentLoaded', () => {
  // Load and display data from JSON file
  fetch('./assets/data.json')
    .then((response) => response.json())
    .then((data) => {
      const wrapper = document.getElementById('container-wrapper');
      const navigation = document.getElementById('group-navigation');

      // Create navigation buttons
      Object.keys(data).forEach((groupName) => {
        const button = document.createElement('button');
        button.textContent = groupName;
        button.addEventListener('click', () => {
          document.getElementById(groupName).scrollIntoView({
            behavior: 'smooth',
          });
        });
        navigation.appendChild(button);
      });

      Object.keys(data).forEach((groupName) => {
        // Create container div
        const container = document.createElement('div');
        container.id = groupName;
        container.className = 'group-container';

        // Create group title
        const title = document.createElement('h2');
        title.textContent = groupName;
        container.appendChild(title);

        // Create table
        const table = document.createElement('table');

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['NO', 'V1', 'V2', 'V3', 'MEANING'].forEach((header) => {
          const th = document.createElement('th');
          th.textContent = header;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data[groupName].forEach((verb, index) => {
          const row = document.createElement('tr');

          // Add row number
          const numberCell = document.createElement('td');
          numberCell.textContent = index + 1;
          row.appendChild(numberCell);

          // Add verb forms and meaning
          ['V1', 'V2', 'V3', 'MEANING'].forEach((key) => {
            const cell = document.createElement('td');
            cell.textContent = verb[key];
            row.appendChild(cell);
          });

          tbody.appendChild(row);
        });

        table.appendChild(tbody);
        container.appendChild(table);
        wrapper.appendChild(container);
      });
    })
    .catch((error) => console.error('Error loading data:', error));

  // Setup voice selector
  const voiceSelector = document.getElementById('voice-selector');
  const speakingIndicator = document.getElementById('speaking-indicator');
  const voiceSelect = document.createElement('select');
  voiceSelect.id = 'voice-select';

  // Add label for voice selector
  const voiceLabel = document.createElement('label');
  voiceLabel.setAttribute('for', 'voice-select');
  voiceLabel.textContent = 'Select Voice:';
  voiceLabel.style.display = 'block';
  voiceLabel.style.marginBottom = '5px';
  voiceLabel.style.textAlign = 'center';

  voiceSelector.appendChild(voiceLabel);
  voiceSelector.appendChild(voiceSelect);

  // Function to populate voice options
  const populateVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log('Supported Voices:', voices);

    // Clear existing options
    voiceSelect.innerHTML = '<option value="">Select a voice</option>';

    // Filter voices for English and Indonesian only
    const filteredVoices = voices.filter(
      (voice) => voice.lang.startsWith('en') || voice.lang.startsWith('id')
    );

    // Create option groups
    const englishGroup = document.createElement('optgroup');
    englishGroup.label = 'English Voices';

    const indonesianGroup = document.createElement('optgroup');
    indonesianGroup.label = 'Indonesian Voices';

    // Sort voices by name within language groups
    filteredVoices.forEach((voice) => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = `${voice.name}`;
      option.setAttribute('data-lang', voice.lang);

      if (voice.lang.startsWith('en')) {
        englishGroup.appendChild(option);
      } else if (voice.lang.startsWith('id')) {
        indonesianGroup.appendChild(option);
      }
    });

    // Add groups to select if they have options
    if (englishGroup.children.length > 0) {
      voiceSelect.appendChild(englishGroup);
    }

    if (indonesianGroup.children.length > 0) {
      voiceSelect.appendChild(indonesianGroup);
    }

    // Select first voice by default
    if (filteredVoices.length > 0) {
      voiceSelect.value = filteredVoices[0].name;
    }
  };

  // Initialize voices
  window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
  populateVoices(); // Initial call in case voices are already loaded

  // Handle clicks on table cells for speech
  document.body.addEventListener('click', (event) => {
    if (event.target.tagName === 'TD') {
      const cell = event.target;
      const text = cell.textContent.trim();

      if (!text) return;

      // Visual feedback - highlight active cell
      const previousActive = document.querySelector('.active-cell');
      if (previousActive) {
        previousActive.classList.remove('active-cell');
      }

      cell.classList.add('active-cell');

      // Determine language based on column (MEANING column uses Indonesian)
      const isLastColumn = cell.cellIndex === 4; // MEANING column
      const lang = isLastColumn ? 'id-ID' : 'en-US';

      // Create and configure speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      // Set selected voice if one is selected
      if (voiceSelect.value) {
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(
          (voice) => voice.name === voiceSelect.value
        );

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      // Update speaking indicator
      speakingIndicator.textContent = `Speaking: "${text}"`;

      // Clear indicator when speech ends
      utterance.onend = () => {
        speakingIndicator.textContent = '';
        cell.classList.remove('active-cell');
      };

      // Stop any currently playing speech before starting new one
      window.speechSynthesis.cancel();

      // Start speaking
      window.speechSynthesis.speak(utterance);
    }
  });

  // Add back-to-top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.textContent = 'Back to Top';
  backToTopBtn.id = 'back-to-top';
  backToTopBtn.style.position = 'fixed';
  backToTopBtn.style.bottom = '20px';
  backToTopBtn.style.right = '20px';
  backToTopBtn.style.padding = '10px 15px';
  backToTopBtn.style.backgroundColor = '#3498db';
  backToTopBtn.style.color = 'white';
  backToTopBtn.style.border = 'none';
  backToTopBtn.style.borderRadius = '4px';
  backToTopBtn.style.cursor = 'pointer';
  backToTopBtn.style.display = 'none';
  backToTopBtn.style.zIndex = '100';

  document.body.appendChild(backToTopBtn);

  // Show/hide back-to-top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
