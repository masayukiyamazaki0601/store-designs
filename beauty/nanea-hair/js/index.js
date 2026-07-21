let Body, Root, Header, Footer, Main, Section;
let Media = "PC";
const TB = 1000;
const SP = 680;
let TopPage = false;
//　[Development] ************************************************************
// window.addEventListener("keydown", function(e) {
//   // console.log(e.keyCode)
//   if (e.keyCode == 71) {
//     GuideFunc.Change();
//   } else if (e.keyCode == 73) {
//     InvertFunc.Change();
//   }
// });

const GuideFunc = {};
GuideFunc.Change = function () {
  if (hasClass(Body, "is-guide")) {
    removeClass(Body, "is-guide");
  } else {
    addClass(Body, "is-guide");
  }
};

const InvertFunc = {};
InvertFunc.Change = function () {
  if (hasClass(Body, "is-invert")) {
    removeClass(Body, "is-invert");
    removeClass(Root, "is-invert");
  } else {
    addClass(Body, "is-invert");
    addClass(Root, "is-invert");
  }
};

// [Ready・Load・Resize] ************************************************************

window.addEventListener("load", function () {
  if (hasClass(document.body, "pag-top")) {
    TopPage = true;
  }
  removeClass(document.body, "ready");
  InitFunc.Load();
});

window.addEventListener("resize", function () {
  if (Media == "PC") {
    InitFunc.Set();
  } else {
    if (Window.w !== window.innerWidth) {
      InitFunc.Set();
    }
  }
});

const InitFunc = {};
InitFunc.Load = function () {
  Body = document.body;
  Root = document.querySelector(":root");
  Header = document.querySelector("header");
  Footer = document.querySelector("footer");
  Main = document.querySelector("main");
  Section = document.querySelectorAll("section");

  //LazyBgi
  if (document.getElementsByClassName("js-lazy_bgi").length) {
    var lazy_bgi = document.getElementsByClassName("js-lazy_bgi");
    for (var i = 0; i < lazy_bgi.length; i++) {
      var bgi = lazy_bgi[i].getAttribute("data-bgi");
      lazy_bgi[i].style.backgroundImage = "url( " + bgi + " )";
    }
  }

  AnchorFunc.object = document.querySelectorAll('a[href^="#"]');
  if (AnchorFunc.object.length) {
    AnchorFunc.Init();
  }

  TabFunc.object = document.querySelectorAll(".js-tab");
  if (TabFunc.object.length) {
    TabFunc.Init();
  }

  AccordionFunc.object = document.querySelectorAll(".js-accordion");
  if (AccordionFunc.object.length) {
    AccordionFunc.Init();
  }

  MenuFunc.Init();
  InitFunc.Set();

  if (TopPage) {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    addClass(Body, "is-preload");
    setTimeout(function () {
      addClass(Body, "is-load");
      document.body.style.overflow = "inherit";
    }, 1600); //2400
  } else {
    addClass(Body, "is-load");
  }
};

InitFunc.Set = function () {
  //DataSet
  Window.h = window.innerHeight;
  // Window.h = document.documentElement.clientHeight;
  Window.w = window.innerWidth;
  Header.h = Header.offsetHeight;
  Header.w = Header.offsetWidth;
  Footer.h = Footer.offsetHeight;
  Footer.w = Footer.offsetWidth;
  Root.style.setProperty("--HeaderHeight", Header.h + "px");
  // alert(Window.h)
  if (Window.w > TB) {
    Media = "PC";
  } else if (Window.w > SP) {
    Media = "TB";
  } else {
    Media = "SP";
  }

  //Adjust
  InitFunc.Layout();

  //Function
  SectionFunc.Init();

  SlideFunc.object = document.querySelectorAll(".js-slide");
  if (SlideFunc.object.length) {
    SlideFunc.Init();
  }

  ScrollTextFunc.object = document.querySelectorAll(".js-stream");
  if (ScrollTextFunc.object) {
    ScrollTextFunc.Init();
  }

  GoogleMapFunc.object = document.querySelectorAll(".js-map");
  if (GoogleMapFunc.object.length) {
    GoogleMapFunc.Init();
  }

  if (hasClass(Body, HeaderFunc.class)) {
    HeaderFunc.Init();
  }

  ModalFunc.object = document.querySelectorAll(".js-modal");
  if (ModalFunc.object.length) {
    ModalFunc.Init();
  }

  VideoFunc.object = document.querySelectorAll(".js-video");
  if (VideoFunc.object.length) {
    VideoFunc.Init();
  }

  YoutubeFunc.object = document.querySelectorAll(".js-youtube");
  if (YoutubeFunc.object.length) {
    YoutubeFunc.Init();
  }

  GalleryFunc.object = document.querySelector(".js-gallery");
  if (GalleryFunc.object) {
    GalleryFunc.Init();
  }

  MasonryFunc.object = document.querySelectorAll(".js-masonry");
  if (MasonryFunc.object.length) {
    MasonryFunc.Init();
  }

  ScrollActionFunc.object = document.querySelectorAll(".js-sa");
  if (ScrollActionFunc.object.length) {
    ScrollActionFunc.Init();
  }

  SplideFunc.object = document.querySelectorAll(".splide");
  if (SplideFunc.object.length) {
    SplideFunc.Init();
  }
  Footer.t = offsetTop(Footer);
  Main.t = offsetTop(Main);
  Main.h = Main.offsetHeight;

  FloatingFunc.object = document.querySelector(".js-floating");
  if (FloatingFunc.object) {
    FloatingFunc.Init();
  }

  ToTopFunc.object = document.querySelector(".js-totop");
  if (ToTopFunc.object) {
    ToTopFunc.Init();
  }

  //ScrollInit
  ScrollFunc.Check();
};

InitFunc.Layout = function () {
  InitFunc.Tile();
  if (document.querySelectorAll(".is-wh").length) {
    for (var i = 0; i < document.querySelectorAll(".is-wh").length; i++) {
      document.querySelectorAll(".is-wh")[i].style.height = Window.h + "px";
    }
  }
  // if (document.querySelector('.b-top__mv')) {
  //   document.querySelector('.b-top__mv').style.height = (Window.h) + "px";
  // }
};

InitFunc.Tile = function () {
  // tile(document.querySelectorAll('.xxxxxxx'))
  // tile(document.querySelectorAll('.xxxxxxx'),n)
};

// [Scroll] ************************************************************
const ScrollFunc = {};
let Scroll = 1;
let ScrollAfter = 1;
window.addEventListener("scroll", function () {
  ScrollFunc.Check();
});

ScrollFunc.Check = function () {
  Scroll = document.documentElement.scrollTop || document.body.scrollTop;

  if (SlideFunc.flg) {
    SlideFunc.Check();
  }

  // if (ScrollTextFunc.load) {
  //   ScrollTextFunc.Scroll();
  // }

  if (VideoFunc.flg) {
    VideoFunc.Check();
  }

  if (SectionFunc.flg) {
    SectionFunc.Check();
  }

  if (ScrollActionFunc.flg) {
    ScrollActionFunc.Check();
  }

  if (YoutubeFunc.flg) {
    YoutubeFunc.Check();
  }

  if (MenuFunc.flg) {
    MenuFunc.Close();
  }
  // if (FloatingFunc.flg && !FloatingFunc.remove) {
  //   FloatingFunc.Check();
  // }
  if (SplideFunc.flg) {
    SplideFunc.Check();
  }

  if (HeaderFunc.flg) {
    HeaderFunc.Check();
  }

  if (FloatingFunc.flg && !FloatingFunc.remove) {
    FloatingFunc.Check();
  }

  if (ToTopFunc.flg) {
    ToTopFunc.Check();
  }

  ScrollAfter = Scroll;
};

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// [Function] ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// [MenuFunc] ************************************************************
const MenuFunc = {};
MenuFunc.flg = false;
MenuFunc.reserveFlg = false;
MenuFunc.Init = function () {
  MenuFunc.button = document.querySelector(".js-hbgicon");
  MenuFunc.modal = document.querySelector(".js-hbgmenu");
  MenuFunc.reserveButton = document.querySelectorAll(".is-reserve");
  MenuFunc.reserveButtonClose = document.querySelectorAll(".l-reserve__modal__close");
  MenuFunc.reserveModal = document.querySelector(".l-reserve__modal");

  MenuFunc.button.addEventListener(
    "click",
    function () {
      if (MenuFunc.flg) {
        MenuFunc.Close();
      } else {
        MenuFunc.Open();
      }
    },
    false
  );

  MenuFunc.modal.addEventListener(
    "click",
    function (e) {
      if (!e.target.closest("a")) {
        MenuFunc.Close();
      }
    },
    false
  );

  for (var i = 0; i < MenuFunc.reserveButton.length; i++) {
    MenuFunc.reserveButton[i].addEventListener(
      "click",
      function (e) {
        MenuFunc.reserveOpen();
      },
      false
    );
  }

  MenuFunc.reserveModal.addEventListener(
    "click",
    function (e) {
      if (!e.target.closest("a")) {
        MenuFunc.reserveClose();
      }
    },
    false
  );

  for (var i = 0; i < MenuFunc.reserveButtonClose.length; i++) {
    MenuFunc.reserveButtonClose[i].addEventListener(
      "click",
      function (e) {
        MenuFunc.reserveClose();
      },
      false
    );
  }
};

MenuFunc.Open = function () {
  addClass(Body, "is-nav_open");
  MenuFunc.flg = true;
  if (MenuFunc.reserveFlg) {
    MenuFunc.reserveClose();
  }
};

MenuFunc.Close = function () {
  removeClass(Body, "is-nav_open");
  MenuFunc.flg = false;
};

MenuFunc.reserveOpen = function () {
  addClass(Body, "is-reserve_open");
  MenuFunc.reserveFlg = true;
  if (MenuFunc.flg) {
    MenuFunc.Close();
  }
};

MenuFunc.reserveClose = function () {
  removeClass(Body, "is-reserve_open");
  MenuFunc.reserveFlg = false;
};

// [SectionFunc] ************************************************************
const SectionFunc = {};
SectionFunc.flg = false;
SectionFunc.Init = function () {
  SectionFunc.array = [];
  for (var i = 0; i < Section.length; i++) {
    SectionFunc.array.push(offsetTop(Section[i]));
  }
  SectionFunc.border = Window.h * 0.5;
  SectionFunc.flg = true;

  SectionFunc.Check();
};

SectionFunc.Check = function () {
  for (var i = 0; i < SectionFunc.array.length; i++) {
    if (Scroll + SectionFunc.border >= SectionFunc.array[i]) {
      SectionFunc.index = i;
    }
  }
  if (SectionFunc.indexAfter != SectionFunc.index) {
    removeClass(Section, "is-active");
    addClass(Section[SectionFunc.index], "is-active");
    if (hasClass(Section[SectionFunc.index], "is-invert")) {
      addClass(Body, "is-invert");
      addClass(Root, "is-invert");
    } else {
      removeClass(Body, "is-invert");
      removeClass(Root, "is-invert");
    }
  }
  SectionFunc.indexAfter = SectionFunc.index;
};

// [Usefull] ************************************************************

let AnchorFunc = {};
AnchorFunc.Init = function () {
  for (var i = 0; i < AnchorFunc.object.length; i++) {
    AnchorFunc.object[i].addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        var href = this.getAttribute("href");
        var target = document.getElementById(href.replace("#", ""));
        AnchorFunc.Move(target);
      },
      false
    );
  }
};
AnchorFunc.Move = function (_target) {
  var pos = offsetTop(_target) - Header.h;
  window.scroll({
    top: pos,
    behavior: "smooth",
  });
};

// [SlideFunc] ************************************************************
let SlideFunc = {};
SlideFunc.array = [];
SlideFunc.flg = false;
SlideFunc.Init = function () {
  SlideFunc.border = Window.h;
  if (!SlideFunc.flg) {
    SlideFunc.flg = true;

    for (var i = 0; i < SlideFunc.object.length; i++) {
      var slide = SlideFunc.object[i];
      slide.setAttribute("data-index", i);
      slide.flg = false;
      slide.top = offsetTop(slide);
      slide.height = slide.offsetHeight;
      slide.li = slide.querySelectorAll(".js-slide__li");
      slide.length = slide.li.length;
      slide.index = 0;
      slide.timer = null;
      if (slide.getAttribute("data-interval")) {
        slide.interval = slide.getAttribute("data-interval");
      } else {
        slide.interval = 5000;
      }

      if (JSON.parse(slide.getAttribute("data-dots")) || JSON.parse(slide.getAttribute("arrow"))) {
        var html = document.createElement("div");
        addClass(html, "js-slide__ctrl");
        var inner = document.createElement("div");
        addClass(inner, "js-slide__ctrl__wrap");
        if (slide.getAttribute("data-arrow")) {
          var arrow_prev = document.createElement("button");
          addClass(arrow_prev, ["js-slide__arrow", "prev"]);
          arrow_prev.textContent = "PREV";
          inner.appendChild(arrow_prev);
        }
        if (JSON.parse(slide.getAttribute("data-dots"))) {
          var ul = document.createElement("ul");
          addClass(ul, "js-slide__dots");
          for (let l = 0; l < slide.length; l++) {
            var li = document.createElement("li");
            var button = document.createElement("button");
            button.textContent = l + 1;
            li.appendChild(button);
            ul.appendChild(li);
          }
          inner.appendChild(ul);
        }
        if (JSON.parse(slide.getAttribute("data-arrow"))) {
          var arrow_next = document.createElement("button");
          addClass(arrow_next, ["js-slide__arrow", "next"]);
          arrow_next.textContent = "NEXT";
          inner.appendChild(arrow_next);
        }
        html.appendChild(inner);
        SlideFunc.object[i].appendChild(html);

        slide.arrow = SlideFunc.object[i].querySelectorAll(".js-slide__arrow");
        slide.dots = SlideFunc.object[i].querySelectorAll(".js-slide__dots li");
        removeClass(slide.li, "is-active");
        removeClass(slide.dots, "is-active");

        addClass(slide.li[0], "is-active");
        addClass(slide.dots[0], "is-active");

        for (var j = 0; j < slide.arrow.length; j++) {
          slide.arrow[j].setAttribute("data-index", j);
          slide.arrow[j].addEventListener(
            "click",
            function () {
              var idx = this.closest(".js-slide").getAttribute("data-index");
              if (hasClass(this, "next")) {
                SlideFunc.Next(SlideFunc.array[idx]);
              } else {
                SlideFunc.Prev(SlideFunc.array[idx]);
              }
            },
            false
          );
        }

        for (var j = 0; j < slide.dots.length; j++) {
          slide.dots[j].setAttribute("data-index", j);
          slide.dots[j].addEventListener(
            "click",
            function () {
              if (!hasClass(this, "is-active")) {
                var idx = this.closest(".js-slide").getAttribute("data-index");
                var dot_idx = this.getAttribute("data-index");
                SlideFunc.array[idx].index = dot_idx;
                clearTimeout(SlideFunc.array[idx].timer);
                SlideFunc.array[idx].timer = null;
                SlideFunc.Set(SlideFunc.array[idx]);
              }
            },
            false
          );
        }
      }

      SlideFunc.array.push(slide);
    }
  } else {
    for (var i = 0; i < SlideFunc.array.length; i++) {
      var slide = SlideFunc.array[i];
      slide.top = offsetTop(slide);
      slide.height = slide.offsetHeight;
    }
  }

  SlideFunc.Check();
};

SlideFunc.Check = function () {
  for (var i = 0; i < SlideFunc.array.length; i++) {
    var slide = SlideFunc.array[i];
    var _flg = slide.flg;
    if (Scroll + SlideFunc.border >= slide.top) {
      if (Scroll >= slide.top + slide.height) {
        slide.flg = false;
      } else {
        slide.flg = true;
      }
    } else {
      slide.flg = false;
    }

    if (_flg != slide.flg) {
      SlideFunc.Set(slide);
    }
  }
};

SlideFunc.Set = function (_slide) {
  if (_slide.flg) {
    clearTimeout(_slide.timer);
    _slide.timer = null;
    removeClass(_slide.li, "is-active");
    addClass(_slide.li[_slide.index], "is-active");

    if (JSON.parse(_slide.getAttribute("data-dots"))) {
      removeClass(_slide.dots, "is-active");
      addClass(_slide.dots[_slide.index], "is-active");
    }

    _slide.timer = setTimeout(function () {
      SlideFunc.Next(_slide);
    }, _slide.interval);
  } else {
    clearTimeout(_slide.timer);
    _slide.timer = null;
  }
};

SlideFunc.Prev = function (_slide) {
  if (_slide.index > 0) {
    _slide.index--;
  } else {
    _slide.index = _slide.length - 1;
  }
  SlideFunc.Set(_slide);
};

SlideFunc.Next = function (_slide) {
  if (_slide.index < _slide.length - 1) {
    _slide.index++;
  } else {
    _slide.index = 0;
  }
  SlideFunc.Set(_slide);
};

// [SplideFunc] ************************************************************
let SplideFunc = {};
SplideFunc.flg = false;
SplideFunc.array = [];
SplideFunc.Init = function () {
  if (!SplideFunc.flg) {
    SplideFunc.array = [];
    SplideFunc.flg = true;
    for (var i = 0; i < SplideFunc.object.length; i++) {
      if (hasClass(SplideFunc.object[i], "is-loop")) {
        var options = {
          type: "loop",
          drag: false,
          focus: "center",
          perPage: 4,
          autoplay: false,
          pagination: false,
          arrows: false,
          gap: "2rem",
          height: "35vw",
          autoWidth: true,
          // interval: 0,
          // speed: 0,
          pauseOnHover: false,
          pauseOnFocus: false,
          autoScroll: {
            speed: 1,
            rewind: false,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
          breakpoints: {
            1000: {
              perPage: 3,
            },
            680: {
              perPage: 2,
              gap: "5vw",
              height: "60vw",
            },
          },
        };
      } else if (hasClass(SplideFunc.object[i], "is-topics")) {
        var options = {
          type: "loop",
          perPage: 3,
          focus: 0,
          arrows: true,
          autoplay: true,
          interval: 3000,
          speed: 1000,
          gap: "2rem",
          pagination: true,
          pauseOnFocus: false,
          pauseOnHover: false,
          padding: "5%",
          breakpoints: {
            1000: {
              perPage: 3,
            },
            680: {
              perPage: 1,
            },
          },
        };
      } else {
        var options = {
          type: "loop",
          perPage: 1,
          focus: 0,
          arrows: true,
          pauseOnFocus: false,
          autoplay: true,
          interval: 2000,
          speed: 1000,
          pagination: true,
          pauseOnHover: false,
          // padding: "12%",
          breakpoints: {
            1000: {
              perPage: 3,
            },
            680: {
              perPage: 1,
            },
          },
        };
      }

      var splide = new Splide(SplideFunc.object[i], options);

      splide.on("mounted", function () {
        SplideFunc.array.push(splide);
      });
      splide.on("resized", function () {
        InitFunc.Set();
      });

      splide.on("overflow", function (isOverflow) {
        if (isOverflow) {
          // 十分なスライドがあるときの処理
          // console.log(true)
        } else {
          // console.log(false)
          splide.go(0);

          splide.options = {
            arrows: isOverflow,
            pagination: isOverflow,
            drag: isOverflow,
            clones: isOverflow ? undefined : 0, // クローンの破棄・再生成
          };
          // addClass(SplideFunc.object[i],"col-"+SplideFunc.object[i].querySelectorAll(".splide__slide").length)
          // スライドが不足しているときの処理
        }
      });

      if (!options.autoScroll) {
        splide.AutoScroll = false;
        splide.mount();
      } else {
        splide.AutoScroll = true;
        splide.mount(window.splide.Extensions);
      }
    }
  }

  for (var i = 0; i < SplideFunc.array.length; i++) {
    var target = SplideFunc.array[i];
    var rect = target.root.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    target.top = rect.top + scrollTop;
    target.height = target.root.offsetHeight;
  }
  // InitFunc.Set();
};

SplideFunc.Check = function () {
  for (var i = 0; i < SplideFunc.array.length; i++) {
    var splide = SplideFunc.array[i];

    // console.log(splide.Components.AutoScroll)
    if (Scroll + window.innerHeight >= splide.top && Scroll <= splide.top + splide.height) {
      if (splide.AutoScroll) {
        if (splide.Components.AutoScroll.isPaused()) {
          splide.Components.AutoScroll.play();
        }
      } else {
        if (splide.Components.Autoplay.isPaused()) {
          splide.Components.Autoplay.play();
        }
      }
      // splide.classList.add("is-active");
      // console.log(i+":play")
    } else {
      if (splide.AutoScroll) {
        if (!splide.Components.AutoScroll.isPaused()) {
          splide.Components.AutoScroll.pause();
        }
      } else {
        if (!splide.Components.Autoplay.isPaused()) {
          splide.Components.Autoplay.pause();
        }
      }
      // splide.classList.remove("is-active");
      // console.log(i+":pause")
    }
  }
};

// [ScrollActionFunc] ************************************************************
let ScrollActionFunc = {};

ScrollActionFunc.borederTop = 0.1;
ScrollActionFunc.borederMiddle = 0.5;
ScrollActionFunc.borederBottom = 1;
ScrollActionFunc.flg = false;
ScrollActionFunc.remove = true; //trueで毎回
ScrollActionFunc.Init = function () {
  removeClass(ScrollActionFunc.object, "sa-active");
  ScrollActionFunc.array = [];
  ScrollActionFunc.count = 0;
  for (var i = 0; i < ScrollActionFunc.object.length; i++) {
    var sa = ScrollActionFunc.object[i];
    sa.top = offsetTop(sa);
    sa.height = sa.offsetHeight;
    sa.topHeight = sa.top + sa.height;
    sa.bottom = sa.top + sa.height;
    sa.progress = 0;
    sa.flg = false;
    ScrollActionFunc.array.push(sa);
  }

  ScrollActionFunc.windowTop = Window.h * ScrollActionFunc.borederTop;
  ScrollActionFunc.windowMiddle = Window.h * ScrollActionFunc.borederMiddle;
  ScrollActionFunc.windowBottom = Window.h * ScrollActionFunc.borederBottom;
  ScrollActionFunc.flg = true;

  ScrollActionFunc.Check();
};

ScrollActionFunc.Check = function () {
  ScrollActionFunc.areaTop = Math.floor(Scroll + ScrollActionFunc.windowTop);
  ScrollActionFunc.areaMiddle = Math.floor(Scroll + ScrollActionFunc.windowMiddle);
  ScrollActionFunc.areaBottom = Math.floor(Scroll + ScrollActionFunc.windowBottom);
  ScrollActionFunc.areaHeight = ScrollActionFunc.areaBottom - ScrollActionFunc.areaTop;
  ScrollActionFunc.areaHalf = ScrollActionFunc.areaBottom - ScrollActionFunc.areaMiddle;

  for (var i = 0; i < ScrollActionFunc.array.length; i++) {
    var sa = ScrollActionFunc.array[i];
    if (ScrollActionFunc.areaBottom >= sa.top && ScrollActionFunc.areaTop <= sa.bottom) {
      addClass(sa, "sa-active");
      sa.progress = Math.round(((ScrollActionFunc.areaBottom - sa.top) / (ScrollActionFunc.areaHeight + sa.height)) * 100);
      sa.progressHalf = Math.round(((ScrollActionFunc.areaBottom - sa.top) / (ScrollActionFunc.areaHalf + sa.height / 2)) * 100);
      // sa.progress = Math.round(((ScrollActionFunc.areaBottom - sa.top) / (ScrollActionFunc.areaHeight + sa.height)) * 100) / 100;
      // sa.progress *= 0.5;

      if (hasClass(sa, "js-sa__image")) {
        var scale = sa.getAttribute("data-scale");
        var range = scale * 100 - 100;
        sa.style.transform = "translate3d(0px, " + (range / 2 - range * (sa.progress / 100)) + "%, 0px) scale(" + scale + ")";
      }

      if (hasClass(sa, "js-sa__float")) {
        var rangeY = sa.getAttribute("data-rangeY");
        var rangeX = sa.getAttribute("data-rangeX");
        var adjust = Math.round(Math.cos((sa.progressHalf * Math.PI) / 180) * 100) / 100;
        var stop = JSON.parse(sa.getAttribute("data-stop").toLowerCase());
        if (stop) {
          sa.style.transform = "translate3d(" + Math.round(rangeX * Math.max(0, adjust) * 100) / 100 + "%, " + Math.round(rangeY * Math.max(0, adjust) * 100) / 100 + "%, 0px)";
        } else {
          sa.style.transform = "translate3d(" + Math.round(rangeX * adjust * 100) / 100 + "%, " + Math.round(rangeY * adjust * 100) / 100 + "%, 0px)";
        }
      }

      if (ScrollActionFunc.remove == false) {
        if (sa.flg == false) {
          sa.flg = true;
          ScrollActionFunc.count++;
          if (ScrollActionFunc.count == ScrollActionFunc.array.length) {
            ScrollActionFunc.flg = false;
          }
        }
      }
    } else {
      if (ScrollActionFunc.remove) {
        if (sa.getAttribute("data-remove")) {
          if (JSON.parse(sa.getAttribute("data-remove").toLowerCase())) {
            removeClass(sa, "sa-active");
          }
        } else {
          removeClass(sa, "sa-active");
        }
      }
    }
  }
};

// [VideoFunc] ************************************************************
let VideoFunc = {};

VideoFunc.flg = false;
VideoFunc.Init = function () {
  VideoFunc.border = Window.h;
  if (!VideoFunc.flg) {
    VideoFunc.array = [];
    for (var i = 0; i < VideoFunc.object.length; i++) {
      var source = document.createElement("source");
      source.setAttribute("type", "video/mp4");
      source.setAttribute("src", VideoFunc.object[i].getAttribute("data-src"));
      VideoFunc.object[i].querySelector(".js-video__player").appendChild(source);
      var video = document.getElementsByTagName("video")[i];
      video.wrap = VideoFunc.object[i];
      video.top = offsetTop(VideoFunc.object[i]);
      video.h = VideoFunc.object[i].offsetHeight;

      VideoFunc.Pause(video);
      if (video.autoplay) {
        // VideoFunc.Play(video);
      } else {
        // VideoFunc.Pause(video);
        if (!video.controls) {
          addClass(VideoFunc.object[i], "is-cover");
        }
      }
      VideoFunc.array.push(video);
    }

    for (var j = 0; j < VideoFunc.object.length; j++) {
      VideoFunc.object[j].setAttribute("data-index", j);
      VideoFunc.object[j].addEventListener(
        "click",
        function () {
          var video = VideoFunc.array[this.getAttribute("data-index")];
          if (!video.autoplay) {
            if (video.paused) {
              VideoFunc.Play(video);
            } else {
              VideoFunc.Pause(video);
            }
          }
        },
        false
      );
    }
    VideoFunc.flg = true;
  } else {
    for (var i = 0; i < VideoFunc.array.length; i++) {
      var video = VideoFunc.array[i];
      video.top = offsetTop(VideoFunc.object[i]);
      video.h = VideoFunc.object[i].offsetHeight;
    }
  }

  VideoFunc.Check();
};

VideoFunc.Check = function () {
  for (var i = 0; i < VideoFunc.array.length; i++) {
    var video = VideoFunc.array[i];
    if (Scroll + VideoFunc.border >= video.top) {
      if (Scroll >= video.top + video.h) {
        if (!video.paused) {
          VideoFunc.Pause(video);
        }
      } else {
        if (video.paused) {
          if (video.autoplay) {
            VideoFunc.Play(video);
          }
        }
      }
    } else {
      if (!video.paused) {
        VideoFunc.Pause(video);
      }
    }
  }
};

VideoFunc.Play = function (_video) {
  _video.play();
  if (!_video.autoplay) {
    removeClass(_video.wrap, "is-pause");
  }
};

VideoFunc.Pause = function (_video) {
  _video.pause();
  if (!_video.autoplay) {
    addClass(_video.wrap, "is-pause");
  }
};

// [YoutubeFunc] ************************************************************
let YoutubeFunc = {};
YoutubeFunc.flg = false;
YoutubeFunc.Init = function () {
  YoutubeFunc.border = Window.h;
  if (!YoutubeFunc.flg) {
    YoutubeFunc.array = [];
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = function () {
      for (var i = 0; i < YoutubeFunc.object.length; i++) {
        var youtube = YoutubeFunc.object[i];
        youtube.videoId = youtube.getAttribute("data-id");
        // youtube.playerId = "YT-" + youtube.getAttribute("data-id");
        youtube.playerId = youtube.querySelector(".js-youtube__player").getAttribute("id");
        if (youtube.getAttribute("data-sp")) {
          if (Media == "SP") {
            youtube.videoId = youtube.getAttribute("data-sp");
          }
        }
        youtube.cover = youtube.querySelector(".js-youtube__cover");
        if (youtube.cover) {
          youtube.cover.setAttribute("data-index", i);
          youtube.cover.addEventListener(
            "click",
            function () {
              // console.log(this.getAttribute("data-index"))
              YoutubeFunc.Play(YoutubeFunc.array[this.getAttribute("data-index")]);
            },
            false
          );
        }
        youtube.width = youtube.offsetWidth;
        youtube.height = youtube.width * 0.5625;
        if (youtube.getAttribute("data-sp")) {
          if (Media == "SP") {
            youtube.height = youtube.width * 1.7777;
          }
        }
        youtube.top = offsetTop(youtube);
        youtube.ready = false;
        youtube.auto = 0;
        if (youtube.getAttribute("data-auto")) {
          if (JSON.parse(youtube.getAttribute("data-auto"))) {
            youtube.auto = 1;
          }
          youtube.autoLoad = false;
          youtube.autoLoadTimer = null;
        }

        youtube.controls = 0;
        if (youtube.getAttribute("data-controls")) {
          if (JSON.parse(youtube.getAttribute("data-controls"))) {
            youtube.controls = 1;
          }
        }

        youtube.mute = 0;
        if (youtube.getAttribute("data-mute")) {
          if (JSON.parse(youtube.getAttribute("data-mute"))) {
            youtube.mute = 1;
          }
        }

        youtube.loop = 0;
        if (youtube.getAttribute("data-loop")) {
          if (JSON.parse(youtube.getAttribute("data-loop"))) {
            youtube.loop = 1;
          }
        }

        youtube.player = new YT.Player(youtube.playerId, {
          width: youtube.width,
          height: youtube.height,
          videoId: youtube.videoId,
          videoId: youtube.videoId,
          playerVars: {
            autohide: 1,
            controls: youtube.controls,
            loop: youtube.loop,
            mute: youtube.mute,
            modestbranding: 1,
            iv_load_policy: 3,
            showinfo: 0,
            rel: 0,
            autoplay: youtube.auto,
            wmode: "transparent",
          },
          events: {
            onReady: YoutubeFunc.Ready,
            onStateChange: YoutubeFunc.Change,
          },
        });
        YoutubeFunc.array.push(youtube);
      }
      InitFunc.Set();
    };
  } else {
    for (var i = 0; i < YoutubeFunc.array.length; i++) {
      var youtube = YoutubeFunc.array[i];

      if (youtube.getAttribute("data-sp")) {
        var pre = youtube.videoId;
        if (Media == "SP") {
          youtube.videoId = youtube.getAttribute("data-sp");
        } else {
          youtube.videoId = youtube.getAttribute("data-id");
        }
        if (pre != youtube.videoId) {
          youtube.player.cueVideoById(youtube.videoId);
        }
      }

      youtube.width = youtube.offsetWidth;
      if (youtube.getAttribute("data-sp")) {
        if (Media != "SP") {
          youtube.height = youtube.width * 0.5625;
        } else {
          youtube.height = youtube.width * 1.7777;
        }
      }

      youtube.top = offsetTop(youtube);
      youtube.player.setSize(youtube.width, youtube.height);
    }
  }

  YoutubeFunc.flg = true;
};

YoutubeFunc.Ready = function (e) {
  for (var j = 0; j < YoutubeFunc.array.length; j++) {
    // console.log(e.target.getIframe().id)
    if (e.target.getIframe().id == YoutubeFunc.array[j].playerId) {
      YoutubeFunc.array[j].ready = true;
      // console.log(j + '番目のプレーヤー準備完了しました。');
      var youtube = YoutubeFunc.array[j];
      if (youtube.auto) {
        // console.log(j + '番目のプレーヤーを再生');
        // console.log(youtube.loop)
        if (!youtube.mute) {
          youtube.mute = 1;
        }

        YoutubeFunc.Play(youtube);

        YoutubeFunc.Check();
      }
    }
  }
};

YoutubeFunc.Change = function (e) {
  for (var j = 0; j < YoutubeFunc.array.length; j++) {
    if (e.target.getIframe().id == YoutubeFunc.array[j].playerId) {
      var youtube = YoutubeFunc.array[j];
      if (!youtube.auto) {
        var Status = e.data;
        if (Status == YT.PlayerState.PAUSED) {
          YoutubeFunc.Pause(youtube);
        }
        if (Status == YT.PlayerState.ENDED) {
          YoutubeFunc.Pause(youtube);
        }
        if (Status == YT.PlayerState.BUFFERING) {
          YoutubeFunc.Play(youtube);
        }
      } else {
        var Status = e.data;
        if (Status == YT.PlayerState.ENDED) {
          YoutubeFunc.Play(youtube);
          YoutubeFunc.Check();
        }
      }
    }
  }
};

YoutubeFunc.Pause = function (_youtube) {
  if (_youtube.ready) {
    _youtube.player.pauseVideo();
    removeClass(_youtube, "is-play");
    // console.log("Pause")
  }
};

YoutubeFunc.Play = function (_youtube) {
  for (var j = 0; j < YoutubeFunc.array.length; j++) {
    var youtube = YoutubeFunc.array[j];
    if (youtube != _youtube) {
      if (youtube.ready) {
        YoutubeFunc.Pause(youtube);
      }
    } else {
      if (youtube.ready) {
        youtube.player.playVideo();
        // youtube.player.playVideo().seekTo(0);
        addClass(youtube, "is-play");
        // console.log("Play")
      }
    }
  }
};

YoutubeFunc.Check = function () {
  for (var i = 0; i < YoutubeFunc.array.length; i++) {
    var youtube = YoutubeFunc.array[i];
    if (Scroll + YoutubeFunc.border >= youtube.top && Scroll <= youtube.top + youtube.height) {
      if (youtube.auto) {
        // youtube.player.seekTo(0);
        if (youtube.ready) {
          if (youtube.player.getPlayerState() != 1) {
            if (!youtube.autoLoad) {
              youtube.autoLoad = true;
              youtube.player.seekTo(0);
              clearTimeout(youtube.autoLoadTimer);
              youtube.autoLoadTimer = null;
            }
            YoutubeFunc.Play(youtube);
          }
        }
      }
    } else {
      if (youtube.ready) {
        if (youtube.auto) {
          if (!youtube.autoLoad) {
            //  一度再生してからロゴを消して頭出し
            if (youtube.autoLoadTimer == null) {
              if (youtube.player.getPlayerState() != 1) {
                YoutubeFunc.Play(youtube);
                youtube.autoLoadTimer = setTimeout(function () {
                  youtube.autoLoad = true;
                  youtube.player.seekTo(0);
                  YoutubeFunc.Pause(youtube);
                  clearTimeout(youtube.autoLoadTimer);
                  // console.log("ロゴ消し")
                  youtube.autoLoadTimer = null;
                }, 3000);
              }
            }
          } else {
            if (youtube.player.getPlayerState() == 1) {
              YoutubeFunc.Pause(youtube);
            }
          }
        } else {
          if (youtube.player.getPlayerState() == 1) {
            YoutubeFunc.Pause(youtube);
          }
        }
      }
    }
  }
};

// [ModalFunc] ************************************************************
let ModalFunc = {};
ModalFunc.flg = false;
ModalFunc.Init = function () {
  ModalFunc.openBtn = document.querySelectorAll(".js-modal__open");
  ModalFunc.closeBtn = document.querySelectorAll(".js-modal__close,.js-modal__close__foot");
  ModalFunc.content = document.querySelectorAll(".js-modal__content");
  ModalFunc.modal;
  for (var i = 0; i < ModalFunc.openBtn.length; i++) {
    var openBtn = ModalFunc.openBtn[i];
    openBtn.addEventListener(
      "click",
      function () {
        var name = this.getAttribute("data-modal");
        var target = document.querySelector('.js-modal__content[data-modal="' + name + '"]');
        var modal = target.closest(".js-modal");
        ModalFunc.modal = modal;
        if (!ModalFunc.flg) {
          ModalFunc.flg = true;
          fadeIn(modal, 300, function () {
            Body.style.overflow = "hidden";
            fadeIn(target, 400, function () {
              target.scrollTop = 0;
              addClass(target, "is-open");
            });
          });
        } else {
          fadeOut(document.querySelector(".js-modal__content.is-open"), 400, function () {
            removeClass(ModalFunc.content, "is-open");
            fadeIn(target, 400, function () {
              target.scrollTop = 0;
              addClass(target, "is-open");
            });
          });
        }
      },
      false
    );
  }

  for (var i = 0; i < ModalFunc.object.length; i++) {
    ModalFunc.object[i].addEventListener(
      "click",
      function (e) {
        if (!e.target.closest("a")) {
          ModalFunc.Close();
        }
      },
      false
    );
  }

  for (var i = 0; i < ModalFunc.closeBtn.length; i++) {
    var closeBtn = ModalFunc.closeBtn[i];
    closeBtn.addEventListener(
      "click",
      function (e) {
        ModalFunc.Close();
      },
      false
    );
  }
};

ModalFunc.Close = function () {
  fadeOut(ModalFunc.modal, 400, function () {
    Body.style.overflow = "inherit";
    fadeOut(document.querySelector(".js-modal__content.is-open"), 0, function () {
      removeClass(ModalFunc.content, "is-open");
      ModalFunc.flg = false;
    });
  });
};

// [GalleryFunc] ************************************************************
let GalleryFunc = {};
GalleryFunc.flg = false;
GalleryFunc.Init = function () {
  GalleryFunc.openBtn = document.querySelectorAll(".js-gallery__open");
  GalleryFunc.closeBtn = document.querySelectorAll(".js-gallery__close,.js-gallery__ctrl__nav__close");
  GalleryFunc.content = document.querySelector(".js-gallery__content");
  GalleryFunc.youtube = document.querySelector(".js-gallery__player");
  GalleryFunc.image = document.querySelector(".js-gallery__image");
  GalleryFunc.imageObject = document.querySelector(".js-gallery__image img");
  GalleryFunc.Text = document.querySelector(".js-gallery__text");
  GalleryFunc.ctrl = document.querySelector(".js-gallery__ctrl");
  GalleryFunc.ctrlIdx = document.querySelector(".js-gallery__ctrl__num__idx");
  GalleryFunc.ctrlLength = document.querySelector(".js-gallery__ctrl__num__length");
  GalleryFunc.ctrlArrow = document.querySelectorAll(".js-gallery__ctrl__nav__arrow");
  GalleryFunc.YoutubeIdFlg = false;
  if (document.querySelectorAll(".js-gallery__list")) {
    for (var i = 0; i < document.querySelectorAll(".js-gallery__list").length; i++) {
      for (var j = 0; j < document.querySelectorAll(".js-gallery__list")[i].querySelectorAll(".js-gallery__open").length; j++) {
        document.querySelectorAll(".js-gallery__list")[i].querySelectorAll(".js-gallery__open")[j].setAttribute("data-idx", j);
      }
    }
  }

  // if (document.querySelectorAll('.js-gallery__open[data-youtube="' + name + '"]')) {

  // }
  if (!GalleryFunc.flg) {
    for (var i = 0; i < GalleryFunc.openBtn.length; i++) {
      var openBtn = GalleryFunc.openBtn[i];

      if (openBtn.getAttribute("data-youtube")) {
        GalleryFunc.YoutubeIdFlg = true;
      }
      openBtn.addEventListener(
        "click",
        function () {
          GalleryFunc.target = this;
          fadeIn(GalleryFunc.object, 300, function () {
            Body.style.overflow = "hidden";
            GalleryFunc.Set();
          });
        },
        false
      );
    }

    if (GalleryFunc.YoutubeIdFlg) {
      GalleryFunc.youtubePlayer = GalleryFunc.youtube.querySelector(".js-youtube");
    }

    GalleryFunc.object.addEventListener(
      "click",
      function (e) {
        if (!e.target.closest("a")) {
          GalleryFunc.Close();
        }
      },
      false
    );

    for (var i = 0; i < GalleryFunc.closeBtn.length; i++) {
      var closeBtn = GalleryFunc.closeBtn[i];
      closeBtn.addEventListener(
        "click",
        function (e) {
          GalleryFunc.Close();
        },
        false
      );
    }

    GalleryFunc.flg = true;

    for (var i = 0; i < GalleryFunc.ctrlArrow.length; i++) {
      GalleryFunc.ctrlArrow[i].addEventListener(
        "click",
        function () {
          if (hasClass(this, "is-prev")) {
            GalleryFunc.Move(false);
          } else {
            GalleryFunc.Move(true);
          }
        },
        false
      );
    }
  } else {
    // 再帰
    if (GalleryFunc.youtubeId) {
      GalleryFunc.youtubePlayer.player.setSize(GalleryFunc.content.offsetWidth, GalleryFunc.content.offsetWidth * 0.5625);
    }
    if (GalleryFunc.src) {
      GalleryFunc.SetImageSize();
    }
  }
};

GalleryFunc.Set = function () {
  GalleryFunc.target.closest(".js-gallery__list") ? (GalleryFunc.list = true) : (GalleryFunc.list = false);
  GalleryFunc.target.getAttribute("data-src") ? (GalleryFunc.src = GalleryFunc.target.getAttribute("data-src")) : (GalleryFunc.src = false);
  GalleryFunc.target.getAttribute("data-cap") ? (GalleryFunc.cap = GalleryFunc.target.getAttribute("data-cap")) : (GalleryFunc.cap = false);
  GalleryFunc.target.getAttribute("data-youtube") ? (GalleryFunc.youtubeId = GalleryFunc.target.getAttribute("data-youtube")) : (GalleryFunc.youtubeId = false);

  GalleryFunc.youtube.style.display = "none";
  GalleryFunc.image.style.display = "none";
  GalleryFunc.ctrl.style.display = "none";
  GalleryFunc.Text.style.display = "none";

  if (GalleryFunc.youtubeId) {
    GalleryFunc.youtube.style.display = "block";
    GalleryFunc.SetYoutube(GalleryFunc.youtubeId);
  } else {
    GalleryFunc.image.style.display = "block";
    GalleryFunc.SetImage(GalleryFunc.src);
  }

  if (GalleryFunc.cap) {
    GalleryFunc.Text.style.display = "block";
    GalleryFunc.SetText(GalleryFunc.cap);
  }

  if (GalleryFunc.list) {
    GalleryFunc.ctrl.style.display = "block";
    GalleryFunc.SetCtrl();
  }
};

GalleryFunc.SetImage = function (_src) {
  GalleryFunc.newImage = new Image();
  GalleryFunc.newImage.src = _src;
  GalleryFunc.newImage.onload = function () {
    GalleryFunc.imageObject.setAttribute("src", _src);
    GalleryFunc.content.style.display = "block";
    GalleryFunc.content.style.opacity = "0";
    GalleryFunc.newImage.ratio = GalleryFunc.newImage.width / GalleryFunc.newImage.height;
    GalleryFunc.SetImageSize();
    fadeIn(GalleryFunc.content, 400);
  };
};

GalleryFunc.SetImageSize = function () {
  if (Media == "PC") {
    var ratio = 1.5;
  } else {
    var ratio = 1;
  }
  if (ratio <= GalleryFunc.newImage.ratio) {
    GalleryFunc.imageObject.style.width = GalleryFunc.content.offsetWidth + "px";
    GalleryFunc.imageObject.style.height = "auto";
  } else {
    if (Media == "PC") {
      GalleryFunc.imageObject.style.height = GalleryFunc.content.offsetWidth * (1 / ratio) + "px";
      GalleryFunc.imageObject.style.width = "auto";
    } else {
      GalleryFunc.imageObject.style.height = GalleryFunc.content.offsetWidth / GalleryFunc.newImage.ratio + "px";
      GalleryFunc.imageObject.style.width = "auto";
    }
  }
};

GalleryFunc.SetYoutube = function (_id) {
  GalleryFunc.content.style.display = "block";
  GalleryFunc.content.style.opacity = "0";
  GalleryFunc.youtubePlayer.setAttribute("data-id", _id);
  GalleryFunc.youtubePlayer.setAttribute("id", _id);
  GalleryFunc.youtubePlayer.querySelector(".js-youtube__player").setAttribute("id", "YT-" + _id);
  GalleryFunc.youtubePlayer.player.setSize(GalleryFunc.content.offsetWidth, GalleryFunc.content.offsetWidth * 0.5625);
  GalleryFunc.youtubePlayer.player.cueVideoById(_id);

  fadeIn(GalleryFunc.content, 400, function () {
    GalleryFunc.youtubePlayer.player.playVideo();
  });
};

GalleryFunc.SetText = function (_text) {
  if (_text) {
    GalleryFunc.Text.textContent = _text;
  }
};

GalleryFunc.SetCtrl = function () {
  GalleryFunc.children = GalleryFunc.target.closest(".js-gallery__list").querySelectorAll(".js-gallery__open");
  // GalleryFunc.length = GalleryFunc.children.length;
  GalleryFunc.idx = GalleryFunc.target.getAttribute("data-idx");
  GalleryFunc.ctrlIdx.textContent = zeroPadding(GalleryFunc.idx, 2);
  GalleryFunc.ctrlLength.textContent = zeroPadding(GalleryFunc.children.length, 2);
};

GalleryFunc.Move = function (_direction) {
  if (_direction) {
    if (GalleryFunc.idx < GalleryFunc.children.length - 1) {
      GalleryFunc.idx++;
    } else {
      GalleryFunc.idx = 0;
    }
  } else {
    if (GalleryFunc.idx > 0) {
      GalleryFunc.idx--;
    } else {
      GalleryFunc.idx = GalleryFunc.children.length - 1;
    }
  }
  // console.log(GalleryFunc.children.length)
  GalleryFunc.target = GalleryFunc.children[GalleryFunc.idx];
  fadeOut(GalleryFunc.content, 400, function () {
    GalleryFunc.Set();
  });
};

GalleryFunc.Close = function () {
  if (GalleryFunc.youtubePlayer.player.getPlayerState() == 1) {
    GalleryFunc.youtubePlayer.player.pauseVideo();
  }
  fadeOut(GalleryFunc.object, 400, function () {
    Body.style.overflow = "inherit";
    fadeOut(GalleryFunc.content, 0, function () {
      removeClass(GalleryFunc.content, "is-open");
      GalleryFunc.flg = false;
    });
  });
};

// [MasonryFunc] ************************************************************
let MasonryFunc = {};
MasonryFunc.array = [];
MasonryFunc.flg = false;
// MasonryFunc.object = $(".js-masonry");
MasonryFunc.Init = function () {
  MasonryFunc.array = [];
  for (var i = 0; i < MasonryFunc.object.length; i++) {
    var masonry = MasonryFunc.object[i];
    MasonryFunc.Reset(masonry);
    masonry.width = masonry.offsetWidth;
    masonry.height = masonry.offsetHeight;

    if (Media == "PC") {
      masonry.col = masonry.getAttribute("data-masonry").split(",")[0];
    } else if (Media == "TB") {
      masonry.col = masonry.getAttribute("data-masonry").split(",")[1];
    } else if (Media == "SP") {
      masonry.col = masonry.getAttribute("data-masonry").split(",")[2];
    }
    masonry.colWidth = masonry.width / masonry.col;
    masonry.colHeightArray = [];

    for (var j = 0; j < masonry.col; j++) {
      masonry.colHeightArray.push(0);
    }

    for (var j = 0; j < masonry.item.length; j++) {
      var item = masonry.item[j];
      item.style.width = masonry.colWidth + "px";
      masonry.array.push(item);
    }

    var minIndex, maxIndex;
    for (var j = 0; j < masonry.array.length; j++) {
      var item = masonry.array[j];
      if (j < masonry.col) {
        minIndex = j;
      } else {
        minIndex = masonry.colHeightArray.indexOf(Math.min.apply(null, masonry.colHeightArray));
      }

      //  最初だけ大きくしたい時（1列目以降で大きくするのは事実上高さが揃うことはないので不可能）
      if (Media == "SP") {
        if (j == 0 && masonry.col > 1) {
          item.style.width = masonry.colWidth * 2 + "px";
          masonry.colHeightArray[minIndex + 1] += item.offsetHeight;
        }
      }

      if (masonry.getAttribute("data-reverse")) {
        if (JSON.parse(masonry.getAttribute("data-reverse").toLowerCase())) {
          item.style.right = masonry.colWidth * minIndex + "px";
        } else {
          item.style.left = masonry.colWidth * minIndex + "px";
        }
      } else {
        item.style.left = masonry.colWidth * minIndex + "px";
      }

      item.style.top = masonry.colHeightArray[minIndex] + "px";
      masonry.colHeightArray[minIndex] += item.offsetHeight;
    }

    maxIndex = masonry.colHeightArray.indexOf(Math.max.apply(null, masonry.colHeightArray));
    masonry.style.height = masonry.colHeightArray[maxIndex] + "px";
    MasonryFunc.array.push(masonry);
  }
};

MasonryFunc.Reset = function (_masonry) {
  _masonry.array = [];
  _masonry.progressTop = 0;
  _masonry.progressLeft = 0;
  _masonry.item = _masonry.querySelectorAll(".js-masonry__item");
  for (var j = 0; j < _masonry.item.length; j++) {
    var item = _masonry.item[j];
    item.style.left = "auto";
    item.style.right = "auto";
    item.style.top = 0;
    item.style.width = 0;
  }

  _masonry.style.height = 0;
};

// [HeaderFunc] ************************************************************
let HeaderFunc = {};
HeaderFunc.flg = false;
HeaderFunc.sec_array = [];
HeaderFunc.class = "is-header_invert";
HeaderFunc.Init = function () {
  HeaderFunc.flg = true;
  HeaderFunc.Check();
};

HeaderFunc.Check = function () {
  if (Scroll < Window.h * 0.5) {
    addClass(Body, HeaderFunc.class);
    addClass(Root, HeaderFunc.class);
  } else {
    removeClass(Body, HeaderFunc.class);
    removeClass(Root, HeaderFunc.class);
  }
};
// [AccordionFunc] ************************************************************
let AccordionFunc = {};
AccordionFunc.Init = function () {
  AccordionFunc.head = document.querySelectorAll(".js-accordion__head");
  AccordionFunc.body = document.querySelectorAll(".js-accordion__body");
  for (var i = 0; i < AccordionFunc.head.length; i++) {
    AccordionFunc.body[i].setAttribute("data-height", AccordionFunc.body[i].offsetHeight);
    AccordionFunc.body[i].style.display = "block";
    // AccordionFunc.body[i].style.display = "none";
    // AccordionFunc.body[i].style.overflow = "hidden";

    AccordionFunc.head[i].addEventListener(
      "click",
      function (e) {
        var target = this.closest(".js-accordion").querySelector(".js-accordion__body");
        if (hasClass(this, "is-active")) {
          removeClass(this, "is-active");
          target.style.maxHeight = null;
          // slideUp(target, 400, function () {
          //   InitFunc.Set();
          // });
        } else {
          addClass(this, "is-active");
          target.style.maxHeight = target.scrollHeight + "px";
          // slideDown(target, 400, function () {
          //   InitFunc.Set();
          // });
        }
      },
      false
    );

    AccordionFunc.body[i].addEventListener(
      "click",
      function (e) {
        if (!e.target.closest("a")) {
          removeClass(this.closest(".js-accordion").querySelector(".js-accordion__head"), "is-active");
          target.style.maxHeight = null;
          // slideUp(this, 400, function () {
          //   InitFunc.Set();
          // });
        }
      },
      false
    );
  }
};

// [TabFunc] ************************************************************
let TabFunc = {};
TabFunc.Init = function () {
  for (var i = 0; i < TabFunc.object.length; i++) {
    var tabNav = TabFunc.object[i].querySelectorAll(".js-tab__nav");
    var tabContent = TabFunc.object[i].querySelectorAll(".js-tab__content");
    for (var j = 0; j < tabNav.length; j++) {
      tabNav[j].addEventListener(
        "click",
        function (e) {
          if (!hasClass(this, "is-active")) {
            var target = document.querySelectorAll('[data-tab="' + this.getAttribute("data-tab") + '"]');
            removeClass(tabNav, "is-active");
            removeClass(tabContent, "is-active");
            addClass(target[0], "is-active");
            addClass(target[1], "is-active");
          }
        },
        false
      );
    }
  }
};

// [GoogleMapFunc] ************************************************************
let GoogleMapFunc = {};
GoogleMapFunc.style = [
  {
    stylers: [
      {
        saturation: -100,
      },
    ],
  },
];
GoogleMapFunc.Init = function () {
  for (var i = 0; i < GoogleMapFunc.object.length; i++) {
    var gm = GoogleMapFunc.object[i];
    var lat = Number(gm.getAttribute("data-lat"));
    var lng = Number(gm.getAttribute("data-lng"));
    var pin = gm.getAttribute("data-pin");
    gm.pos = new google.maps.LatLng({
      lat: lat,
      lng: lng,
    });

    gm.wrap = gm.querySelector(".js-map__wrap");

    gm.map = new google.maps.Map(gm.wrap, {
      center: gm.pos,
      zoom: 16,
      panControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });
    gm.map.setOptions({ styles: GoogleMapFunc.style });
    gm.marker = new google.maps.Marker({
      position: gm.pos,
      map: gm.map,
    });
    gm.marker.setOptions({
      icon: {
        url: pin,
        scaledSize: new google.maps.Size(56, 56),
      },
    });
  }
};

// [SlideLeadFunc] ************************************************************
let ScrollTextFunc = {};
ScrollTextFunc.load = false;

ScrollTextFunc.Init = function () {
  ScrollTextFunc.array = [];
  for (var i = 0; i < ScrollTextFunc.object.length; i++) {
    var stObject = ScrollTextFunc.object[i];

    stObject.array = [];
    stObject.index = i;
    stObject.areaTop = offsetTop(stObject.closest("section"));
    stObject.areaBottom = offsetTop(stObject.closest("section")) + stObject.closest("section").offsetHeight;
    // stObject.axelAuto = Math.floor(Window.w * 0.0015 * 10) / 10 + 0.3;
    stObject.axelAuto = 2;
    stObject.child = stObject.querySelectorAll(".js-stream__box");
    for (var c = 0; c < stObject.child.length; c++) {
      var st = stObject.child[c];
      st.w = st.querySelector(".js-stream__box__wrap").offsetWidth;
      st.border = st.w / 3;
      if (ScrollTextFunc.flg) {
        st.count = 0;
        st.pos = 0;
      } else {
        st.count = 0;
        st.pos = 0;
      }
      if (hasClass(st, "reverse")) {
        st.reverse = true;
      } else {
        st.reverse = false;
      }
      stObject.array.push(st);
    }

    stObject.flg = true;
    stObject.flgAuto = true;
    stObject.flgArea = false;
    stObject.timer = null;
    stObject.timerAuto = null;
    stObject.axel = 0;
    ScrollTextFunc.array.push(stObject);
    if (stObject.flgAuto) {
      ScrollTextFunc.Check(stObject);
      ScrollTextFunc.Auto(stObject);
    } else {
      ScrollTextFunc.Check(stObject);
    }
  }

  ScrollTextFunc.load = true;
};

// ScrollTextFunc.Scroll = function() {
//   for (var i = 0; i < ScrollTextFunc.array.length; i++) {
//     stObject = ScrollTextFunc.array[i];
//     stObject.axel = (ScrollAfter - Scroll) * -0.9;
//     if (stObject.timerAuto != null) {
//       clearTimeout(stObject.timerAuto);
//       stObject.timerAuto = null;
//     }

//     ScrollTextFunc.Check(stObject);

//     if (stObject.timerAuto == null) {
//       if (stObject.flgAuto && stObject.flgArea) {
//         ScrollTextFunc.Auto(stObject);
//       } else {
//         if (stObject.timerAuto != null) {
//           clearTimeout(stObject.timerAuto);
//           stObject.timerAuto = null;
//         }
//       }
//     }
//   }
// };

ScrollTextFunc.Check = function (_stObject) {
  var stObject = _stObject;

  if (stObject.areaTop < Scroll + Window.h && stObject.areaBottom > Scroll) {
    stObject.flgArea = true;
    for (var c = 0; c < stObject.array.length; c++) {
      var st = stObject.array[c];

      st.count += stObject.axel;
      st.pos = st.count;
      if (st.reverse) {
        st.style.transform = "translate3d(" + Math.round(-st.pos) + "px, 0px, 0px)";
      } else {
        st.style.transform = "translate3d(" + Math.round(st.pos) + "px, 0px, 0px)";
      }
      if (st.pos >= st.border) {
        st.count = st.pos - st.border;
      }
    }
  } else {
    stObject.flgArea = false;
    if (stObject.timerAuto != null) {
      clearTimeout(stObject.timerAuto);
      stObject.timerAuto = null;
    }
  }
};

ScrollTextFunc.Auto = function (_stObject) {
  var stObject = _stObject;
  stObject.timerAuto = setTimeout(function () {
    stObject.axel = stObject.axelAuto;
    ScrollTextFunc.Check(stObject);
    clearTimeout(stObject.timerAuto);
    stObject.timerAuto = null;
    ScrollTextFunc.Auto(stObject);
  }, 20);
};
// [FloatingFunc] ************************************************************
let FloatingFunc = {};
FloatingFunc.flg = false;
FloatingFunc.remove = false;
FloatingFunc.Init = function () {
  FloatingFunc.border = offsetTop(Footer);
  FloatingFunc.flg = true;
  FloatingFunc.close = FloatingFunc.object.querySelector(".js-floating__close");
  FloatingFunc.close.addEventListener(
    "click",
    function (e) {
      removeClass(FloatingFunc.object, "is-active");
      FloatingFunc.remove = true;
    },
    false
  );
  if (!FloatingFunc.remove) {
    FloatingFunc.Check();
  }
};
FloatingFunc.Check = function () {
  if (Scroll + Window.h >= FloatingFunc.border) {
    removeClass(FloatingFunc.object, "is-active");
  } else {
    addClass(FloatingFunc.object, "is-active");
  }
};

// [ToTopFunc] ************************************************************
let ToTopFunc = {};
ToTopFunc.flg = false;
ToTopFunc.Init = function () {
  ToTopFunc.flg = true;
  removeClass(ToTopFunc.object, "is-active");
  ToTopFunc.object.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
    false
  );
  ToTopFunc.Check();
  // console.log(Main.h);
};
ToTopFunc.Check = function () {
  if (Scroll < Window.h * 0.5) {
    removeClass(ToTopFunc.object, ["is-absolute", "is-active"]);
  } else {
    if (Scroll + Window.h >= Main.t + Main.h) {
      addClass(ToTopFunc.object, ["is-absolute", "is-active"]);
    } else {
      removeClass(ToTopFunc.object, "is-absolute");
      if (Scroll < ScrollAfter) {
        addClass(ToTopFunc.object, "is-active");
      } else {
        removeClass(ToTopFunc.object, "is-active");
      }
    }
  }
};

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// [Usefull] ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function hasClass(_target, _class) {
  return _target.classList.contains(_class);
}

function addClass(_target, _class) {
  if (_target.length) {
    if (Array.isArray(_class)) {
      for (var i = 0; i < _target.length; i++) {
        for (var j = 0; j < _class.length; j++) {
          _target[i].classList.add(_class[j]);
        }
      }
    } else {
      for (var i = 0; i < _target.length; i++) {
        _target[i].classList.add(_class);
      }
    }
  } else {
    if (Array.isArray(_class)) {
      for (var i = 0; i < _class.length; i++) {
        _target.classList.add(_class[i]);
      }
    } else {
      _target.classList.add(_class);
    }
  }
}

function removeClass(_target, _class) {
  if (_target.length) {
    if (Array.isArray(_class)) {
      for (var i = 0; i < _target.length; i++) {
        for (var j = 0; j < _class.length; j++) {
          _target[i].classList.remove(_class[j]);
        }
      }
    } else {
      for (var i = 0; i < _target.length; i++) {
        _target[i].classList.remove(_class);
      }
    }
  } else {
    if (Array.isArray(_class)) {
      for (var i = 0; i < _class.length; i++) {
        _target.classList.remove(_class[i]);
      }
    } else {
      _target.classList.remove(_class);
    }
  }
}

function offsetTop(_target) {
  var rect = _target.getBoundingClientRect();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
}

function offsetLeft(_target) {
  var rect = _target.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  return rect.left + scrollLeft;
}

function fadeIn(_target, _time, _callback) {
  _target.style.display = "block";
  _target.style.opacity = 0;

  var start = performance.now();
  if (!_time) {
    _time = 500;
  }
  requestAnimationFrame(function tick(timestamp) {
    var easing = (timestamp - start) / _time;
    _target.style.opacity = Math.min(easing, 1);
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      if (_callback) {
        _callback();
      }
    }
  });
}

function fadeOut(_target, _time, _callback) {
  var start = performance.now();
  if (!_time) {
    _time = 500;
  }
  requestAnimationFrame(function tick(timestamp) {
    var easing = (timestamp - start) / _time;
    _target.style.opacity = Math.max(1 - easing, 0);
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      _target.style.opacity = 0;
      _target.style.display = "none";
      if (_callback) {
        _callback();
      }
    }
  });
}

function slideUp(_target, _time, _callback) {
  var start = performance.now();
  var height = _target.getAttribute("data-height");
  if (!_time) {
    _time = 500;
  }
  requestAnimationFrame(function tick(timestamp) {
    var easing = (timestamp - start) / _time;
    _target.style.height = Math.max(1 - easing, 0) * height + "px";
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      _target.style.height = 0;
      _target.style.display = "none";
      if (_callback) {
        _callback();
      }
    }
  });
}

function slideDown(_target, _time, _callback) {
  _target.style.display = "block";
  _target.style.height = 0;
  var start = performance.now();
  var height = _target.getAttribute("data-height");

  if (!_time) {
    _time = 500;
  }
  requestAnimationFrame(function tick(timestamp) {
    var easing = (timestamp - start) / _time;
    _target.style.height = Math.min(easing, 1) * height + "px";
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      _target.style.height = height + "px";
      _target.style.display = "block";
      if (_callback) {
        _callback();
      }
    }
  });
}

function tile(_target, _num) {
  if (!_num) {
    var array = [];
    for (var i = 0; i < _target.length; i++) {
      _target[i].style.height = "auto";
      array.push(_target[i].offsetHeight);
    }
    var max = Math.max.apply(null, array);
    for (var i = 0; i < _target.length; i++) {
      _target[i].style.height = max + "px";
    }
  } else {
    var array = [];
    var arrayIn = [];
    var maxArray = [];
    var idx = 0;
    for (var i = 0; i < _target.length; i++) {
      if (i % _num == 0) {
        arrayIn = [];
        array.push(arrayIn);
      }
      _target[i].style.height = "auto";
      arrayIn.push(_target[i].offsetHeight);
    }

    for (var i = 0; i < array.length; i++) {
      maxArray.push(Math.max.apply(null, array[i]));
    }

    for (var i = 0; i < _target.length; i++) {
      if (i % _num == 0) {
        var max = maxArray[i / _num];
      }
      _target[i].style.height = max + "px";
    }
  }
}

// ゼロパッデング　NUM=値 LEN=桁数
function zeroPadding(NUM, LEN) {
  return (Array(LEN).join("0") + NUM).slice(-LEN);
}
