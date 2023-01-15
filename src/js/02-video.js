import Player from '@vimeo/player';

// Player initializing

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const throttle = require('lodash.throttle');

player.on('play', function(data) {
    console.log('played the video!');
});

function storeCurrentTimeInLocalStorage(data) {
    localStorage.setItem("videoplayer-current-time", data.seconds);
};

player.on('timeupdate', throttle(storeCurrentTimeInLocalStorage, 1000));

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

let currentTime = localStorage.getItem("videoplayer-current-time");
player.setCurrentTime(currentTime).then(function(seconds) {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
        break;

        default:
        break;
    }
});

