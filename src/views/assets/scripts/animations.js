/**
 * @description close on click in nav menu when is in small screens
 */
function closeMenu() {
    const header = document.getElementById("start")
    const headerMenu = document.getElementById("headerMenu")
    if (headerMenu.clientHeight > header.clientHeight) {
        const controlIsChecked = document.getElementById("control").checked
        document.getElementById("control").checked = !controlIsChecked
    }
}

/**
 * 
 */
function runAutoPlay () {
    const videoPlayers = document.querySelectorAll(".auto-play");
    console.log(videoPlayers.length)
    videoPlayers.forEach(videoPlayer => {
        videoPlayer?.addEventListener('mouseover', function () {
            this.volume = 0.03
            this.play()
        });
        videoPlayer?.addEventListener("mouseleave", function () {
            this.pause()
        });
    });
}

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(()=>{
        runAutoPlay()
    }, 500)
});


