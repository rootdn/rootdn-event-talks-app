document.addEventListener('DOMContentLoaded', () => {
    // talksData will be injected globally by the build script
    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('categorySearch');

    function renderSchedule(talksToDisplay) {
        scheduleContainer.innerHTML = ''; // Clear current schedule

        talksToDisplay.forEach(event => {
            if (event.type === 'talk') {
                const talkCard = document.createElement('div');
                talkCard.classList.add('talk-card');

                talkCard.innerHTML = `
                    <div class="time">${event.startTime} - ${event.endTime}</div>
                    <h2>${event.title}</h2>
                    <div class="speakers">Speaker(s): ${event.speakers.join(', ')}</div>
                    <div class="categories">
                        ${event.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                    <p class="description">${event.description}</p>
                `;
                scheduleContainer.appendChild(talkCard);
            } else if (event.type === 'break') {
                const breakCard = document.createElement('div');
                breakCard.classList.add('break-card');
                breakCard.innerHTML = `
                    <div class="time">${event.startTime} - ${event.endTime}</div>
                    <h2>${event.title}</h2>
                `;
                scheduleContainer.appendChild(breakCard);
            }
        });
    }

    // Initial render of the schedule
    if (typeof talksData !== 'undefined') {
        renderSchedule(talksData);
    } else {
        console.error('Talks data not found. Ensure talksData is injected by the build script.');
    }

    // Search functionality
    categorySearchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredTalks = talksData.filter(event => {
            if (event.type === 'talk') {
                return event.categories.some(category => category.toLowerCase().includes(searchTerm));
            }
            // Always show breaks, regardless of search term
            return true;
        });
        renderSchedule(filteredTalks);
    });
});
