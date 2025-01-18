/**
 * @description close on click in nav menu when is in small screens
 */
function closeMenu() {
    const header = document.getElementById("start")
    const headerMenu = document.getElementById("header-menu")
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

runAutoPlay()


