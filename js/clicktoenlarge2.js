// this script comes from here : https://www.thatsoftwaredude.com/content/6385/click-to-enlarge-script-with-pure-javascript
// I modified it, but mostly for styling rather than function



var rand = Math.floor(Math.random() * 1000);
// keeps collisions at bay
var maxWidth = 0;
var maxHeight = 0;
var newWidth = 0;
var newHeight = 0;

// offset between window and image
// used for centering
// centering is not working : why?
var offsetx = 0;
var offsety = 0;

function init131() {
    var images = document.querySelectorAll(".clicktoenlarge");
    var body = document.querySelector("body");
    var body_rect = body.getBoundingClientRect();		// used to calculate the maximum allowable (90%)

    maxWidth = Math.floor(window.innerWidth * .9);		// maximum allowable width based on screen size
    maxHeight = Math.floor(window.innerHeight * .9);		// maximum allowable height based on screen size

    for (var i = 0 ; i < images.length; i++) {
        var image = images[i];
        var rect = image.getBoundingClientRect();
        var hover_text = document.createElement("div");

        hover_text.style.textAlign = "center";
        hover_text.style.width = rect.width + "px";
        image.style.transition = ".8s opacity";
        image.style.cursor = "pointer";
        image.addEventListener('click', function () {
            var div = document.createElement("div");		// max allowable parent
            var overlay = document.createElement("div");
            var close = document.createElement("div");
            var img = document.createElement("img");

            // this styles the border that shows up when the image is enlarged, the overlay and the X button
            div.style.cssText = "position:fixed;z-index:2000;overflow:hidden;background:black;text-align:center;margin:auto";
            // margin-left:25% is a temporary solution
            // il faut calculer combien de % de la largeur occupe l'image, puis combien faire les marges (à revoir, à refaire avec un tutorial)
            overlay.style.cssText = "background:black;opacity:.8;position:fixed;top:0px;width:100%;height:1000px;z-index:1000;left:0px;";
            close.style.cssText = "color:red;cursor:pointer;position:absolute;top:0px;right:0px;font-size:20pt;width:30px;height:30px;border-radius:50%;text-align:center;";
            close.classList.add('close')


            // overlay.className = "overlay_" + rand;
            overlay.className = "overlay_" + rand;
            div.className = "clicktoenlarge_" + rand;

            // only do this if the image size is larger than the max allowable
            img.src = this.src;

            // image is larger than the allowable space of 90%
            if (this.naturalWidth > maxWidth || this.naturalHeight > maxHeight) {
                newWidth = maxWidth;
                newHeight = maxHeight;

                // original version :
                div.style.width = maxWidth + "px";

                div.style.height = maxHeight + "px";
            }

            else {
                newWidth = this.naturalWidth;
                newHeight = this.naturalHeight;

                div.style.width = this.naturalWidth + "px";
                div.style.height = this.NaturalHeight + "px";

            }

            img.style.maxHeight = div.style.height;
            //original version:
            div.style.width = img.style.width;

            offsetx = Math.floor((window.innerWidth - newWidth) / 2);
            offsety = Math.floor((window.innerHeight - newHeight) / 2);

            div.style.top = offsety + "px";
            div.style.left = offsetx + "px";


            close.innerHTML = "&#127335;";
            close.addEventListener('click', function () {
                var overlay = document.querySelector(".overlay_" + rand);
                var clicktoenlarge = document.querySelector(".clicktoenlarge_" + rand);
                body.removeChild(overlay);
                body.removeChild(clicktoenlarge);
            });


            div.appendChild(close);
            div.appendChild(img);
            body.appendChild(div);
            body.appendChild(overlay);

        });
        image.addEventListener('mouseover', function () {
            // this.style.opacity = ".7";   // removed this so that the opacity doesnt change on hover
            this.style.boxSizing = "border-box";
        });
        image.addEventListener('mouseout', function () {
            this.style.opacity = "1";
        });

        if (image.nextSibling) {
            image.parentNode.insertBefore(hover_text, image.nextSibling);
        }
        else {
            image.parentNode.appendChild(hover_text);
        }
    }
}

//the if prevents it from running on mobile or very narrow screens, as it is not useful to do so.
//it is not perfect : if you resize your browser window on desktop, you need to refresh the page for it to apply. But it is good enough for now.
if (document.documentElement.clientWidth > 600 ) {
  window.addEventListener('load', function () {
      init131();
  });
}
