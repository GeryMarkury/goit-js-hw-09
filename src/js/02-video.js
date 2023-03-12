import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', (data) => {
    const throtTime = throttle(() => {
        localStorage.setItem("videoplayer-current-time", data.seconds);
        console.log(1);
    }, 1000);

    throtTime();
}); 

player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));