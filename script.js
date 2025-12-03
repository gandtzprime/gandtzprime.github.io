    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    const API_BASE = 'http://localhost:5000/api';

    async function renderTournaments() {
        try {
            const response = await fetch(`${API_BASE}/tournaments`);
            const tournaments = await response.json();
            
            const container = document.getElementById('tournaments-container');
            container.innerHTML = '';
            
            tournaments.forEach(tournament => {
                const tournamentDate = new Date(tournament.date);
                const now = new Date();
                const timeDiff = tournamentDate - now;
                
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                const tournamentCard = document.createElement('div');
                tournamentCard.className = 'tournament-card';
                tournamentCard.innerHTML = `
                    <div class="tournament-img">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="tournament-content">
                        <h3>${tournament.name}</h3>
                        <p>${tournament.description}</p>
                        <p><strong>Prize Pool:</strong> ${tournament.prize}</p>
                        <div class="countdown">
                            <div class="countdown-item">
                                <div class="countdown-value" id="days-${tournament.id}">${days}</div>
                                <div class="countdown-label">Days</div>
                            </div>
                            <div class="countdown-item">
                                <div class="countdown-value" id="hours-${tournament.id}">${hours}</div>
                                <div class="countdown-label">Hours</div>
                            </div>
                            <div class="countdown-item">
                                <div class="countdown-value" id="minutes-${tournament.id}">${minutes}</div>
                                <div class="countdown-label">Minutes</div>
                            </div>
                            <div class="countdown-item">
                                <div class="countdown-value" id="seconds-${tournament.id}">${seconds}</div>
                                <div class="countdown-label">Seconds</div>
                            </div>
                        </div>
                        <a href="${tournament.registration_link}" class="btn" target="_blank">Register Now</a>
                    </div>
                `;
                container.appendChild(tournamentCard);
            });
        } catch (error) {
            console.error('Error loading tournaments:', error);
            document.getElementById('tournaments-container').innerHTML = 
                '<p>Error loading tournaments. Please try again later.</p>';
        }
    }

    async function renderWinners() {
        try {
            const response = await fetch(`${API_BASE}/winners`);
            const winners = await response.json();
            
            const container = document.getElementById('winners-container');
            container.innerHTML = '';
            
            winners.forEach(winner => {
                const winnerCard = document.createElement('div');
                winnerCard.className = 'winner-card';
                winnerCard.innerHTML = `
                    <h3>${winner.team_name}</h3>
                    <p>${winner.tournament_name}</p>
                    <p><strong>Prize Won:</strong> ${winner.prize_won}</p>
                    <ul class="players-list">
                        ${winner.players.map(player => `<li>${player.trim()}</li>`).join('')}
                    </ul>
                `;
                container.appendChild(winnerCard);
            });
        } catch (error) {
            console.error('Error loading winners:', error);
            document.getElementById('winners-container').innerHTML = 
                '<p>Error loading winners. Please try again later.</p>';
        }
    }

    async function updateCountdowns() {
        try {
            const response = await fetch(`${API_BASE}/tournaments`);
            const tournaments = await response.json();
            
            tournaments.forEach(tournament => {
                const tournamentDate = new Date(tournament.date);
                const now = new Date();
                const timeDiff = tournamentDate - now;
                
                if (timeDiff > 0) {
                    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                    
                    const daysElement = document.getElementById(`days-${tournament.id}`);
                    const hoursElement = document.getElementById(`hours-${tournament.id}`);
                    const minutesElement = document.getElementById(`minutes-${tournament.id}`);
                    const secondsElement = document.getElementById(`seconds-${tournament.id}`);
                    
                    if (daysElement) daysElement.textContent = days;
                    if (hoursElement) hoursElement.textContent = hours;
                    if (minutesElement) minutesElement.textContent = minutes;
                    if (secondsElement) secondsElement.textContent = seconds;
                } else {
                    // Tournament has passed
                    const daysElement = document.getElementById(`days-${tournament.id}`);
                    const hoursElement = document.getElementById(`hours-${tournament.id}`);
                    const minutesElement = document.getElementById(`minutes-${tournament.id}`);
                    const secondsElement = document.getElementById(`seconds-${tournament.id}`);
                    
                    if (daysElement) daysElement.textContent = '0';
                    if (hoursElement) hoursElement.textContent = '0';
                    if (minutesElement) minutesElement.textContent = '0';
                    if (secondsElement) secondsElement.textContent = '0';
                }
            });
        } catch (error) {
            console.error('Error updating countdowns:', error);
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // --- modifier les tournois qui s'affiche ---
const tournaments = [
    { name: "YF7 Tournaments #8", date: "2025-12-06T21:00:00", link: "https://matcherino.com/supercell/tournaments/175245" },
    { name: "YF7 Tournaments X BTLN #2", date: "2025-12-13T21:00:00", link: "https://matcherino.com/supercell/tournaments/175914" },
    { name: "YF7 Tournaments #9", date: "2025-12-20T21:00:00", link: "https://matcherino.com/supercell/tournaments/175911" }
];


const list = document.getElementById("tournament-list");

// Filtrer uniquement les tournois à venir
const now = new Date();
const upcoming = tournaments.filter(t => new Date(t.date) > now);

// Trier par date
upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

// Fonction pour créer le compte à rebours
function getCountdown(date) {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "En cours / terminé";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}j ${hours}h ${minutes}m`;
}
    // Afficher la liste des tournois
upcoming.forEach((t, index) => {
    const li = document.createElement("li");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("tournament-info");
    infoDiv.innerHTML = `<span>${t.name} — ${new Date(t.date).toLocaleDateString()} à ${new Date(t.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                         <span class="countdown" id="countdown-${index}"></span>`;

    const btn = document.createElement("a");
    btn.href = t.link;
    btn.target = "_blank";
    btn.textContent = "S'inscrire";
    btn.classList.add("btn-register");

    // Bouton copier le lien
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copier lien";
    copyBtn.classList.add("copy-btn");
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(t.link).then(() => alert("Lien copié !"));
    };

    li.appendChild(infoDiv);
    li.appendChild(btn);
    li.appendChild(copyBtn);

    list.appendChild(li);

    // Mettre à jour le compte à rebours toutes les minutes
    function updateCountdown() {
        document.getElementById(`countdown-${index}`).textContent = getCountdown(t.date);
    }
    updateCountdown();
    setInterval(updateCountdown, 60000);
});