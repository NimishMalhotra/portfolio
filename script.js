(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasObserver = "IntersectionObserver" in window;

  // Save as PDF (browser print dialog; the print stylesheet formats the page for A4)
  var printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", function () { window.print(); });
  }

  // Score rings: start empty, fill when scrolled into view.
  // Without JS or IntersectionObserver the rings simply render filled.
  var rings = document.querySelectorAll(".ring");
  if (hasObserver && !reduceMotion && rings.length) {
    var ringObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("armed");
          ringObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    rings.forEach(function (ring) {
      ring.classList.add("armed");
      ringObserver.observe(ring);
    });
  }

  // Highlight the nav link for the section currently in view.
  var links = document.querySelectorAll(".site-nav nav a");
  var sections = [];
  links.forEach(function (link) {
    var target = document.querySelector(link.getAttribute("href"));
    if (target) { sections.push({ link: link, el: target }); }
  });

  if (hasObserver && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        sections.forEach(function (s) {
          s.link.classList.toggle("is-active", s.el === entry.target);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (s) { navObserver.observe(s.el); });
  }

  // Logos: drop official logo files into assets/logos/ named codeforces, linkedin, dtu, rdps and cbse
  // (svg, png, jpg or webp). A slot whose file is missing stays hidden.
  var logoExts = ["svg", "png", "jpg", "webp"];
  document.querySelectorAll("img[data-logo]").forEach(function (img) {
    var name = img.getAttribute("data-logo");
    var holder = img.parentNode;
    var i = 0;
    function tryNext() {
      if (i >= logoExts.length) { return; }
      img.src = "assets/logos/" + name + "." + logoExts[i++];
    }
    img.addEventListener("load", function () { holder.classList.add("is-ready"); });
    img.addEventListener("error", tryNext);
    tryNext();
  });

  // Skills explorer: tabs by area, with arrow/Home/End keyboard support.
  var explorer = document.querySelector(".skills-explorer");
  if (explorer) {
    var tabs = Array.prototype.slice.call(explorer.querySelectorAll(".skill-tab"));
    var panels = Array.prototype.slice.call(explorer.querySelectorAll(".skill-panel"));

    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
        if (on) { panels[i].removeAttribute("hidden"); } else { panels[i].setAttribute("hidden", ""); }
      });
      if (focus) { tabs[index].focus(); }
    }

    explorer.classList.add("is-tabbed");
    select(0, false);

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") { next = (i + 1) % tabs.length; }
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { next = (i - 1 + tabs.length) % tabs.length; }
        else if (e.key === "Home") { next = 0; }
        else if (e.key === "End") { next = tabs.length - 1; }
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
  }
})();
