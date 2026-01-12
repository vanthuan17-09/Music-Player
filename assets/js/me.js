/**
    1. render songs 
    2. scroll top 
    3. Play / pause / seek 
    4. CD rotate 
    5. next / prev
    6. random
    7. next / repeat when ended
    8. active song
    9. scroll active song into view
    10. play song when click
 */
const PLAYER_STORAGE_KEY = "It's you";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
const cd = $('.cd');
const cdThumb = $('.cd__thumb');
const progress = $('#progress');

const audio = $('#audio');
const nameSong = $('.dashboard__name-song');

const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const repeatBtn = $('.btn-repeat');
const randomBtn = $('.btn-random');

// let songs;

const volume = $('#volume');
const volumeBox = $('.volume-box');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom : false,
  songs: [
    {
      name: "Dừng chân, đứng lại",
      author: "NamLee, Tofu, An ft VoVanDuc",
      image: "./assets/img/song1.jpg",
      path: "./assets/music/song1.mp3",
    },
    {
      name: "Chưa được yêu như thế",
      author: "Trang",
      image: "./assets/img/song2.jpg",
      path: "./assets/music/song2.mp3",
    },
    {
      name: "Qua những tiếng ve",
      author: "Tofu, Urabe ft Xesi",
      image: "./assets/img/song3.jpg",
      path: "./assets/music/song3.mp3",
    },
    {
      name: "Một thuở thanh bình",
      author: "Tùng Tea ft Tuyết",
      image: "./assets/img/song4.jpg",
      path: "./assets/music/song4.mp3",
    },
    {
      name: "Em không",
      author: "Vũ Thanh Vân",
      image: "./assets/img/song5.jpg",
      path: "./assets/music/song5.mp3",
    },
    {
      name: "Một ngàn nỗi đau (live)",
      author: "Mai Văn Hương X Trung Quân",
      image: "./assets/img/song6.jpg",
      path: "./assets/music/song6.mp3",
    },
    {
      name: "Từng là của nhau",
      author: "Bảo Anh ft Táo",
      image: "./assets/img/song7.jpg",
      path: "./assets/music/song7.mp3",
    },
    {
      name: "Cầu Vĩnh Tuy",
      author: "Wren Evans",
      image: "./assets/img/song8.jpg",
      path: "./assets/music/song8.mp3",
    },
    {
      name: "Only",
      author: "LeeHi",
      image: "./assets/img/song9.jpg",
      path: "./assets/music/song9.mp3",
    },
    {
      name: "Cô đơn trên sofa (live)",
      author: "Trung Quân",
      image: "./assets/img/song10.jpg",
      path: "./assets/music/song10.mp3",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
        <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')"></div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.author}</p>
            </div>
            <div class="option">
                <i class="fa-solid fa-ellipsis"></i>
                <ul class="option__menu">
                    <li class="option__item">Remove this song</li>
                    <li class="option__item">Remove this song</li>
                </ul>
            </div>
        </div>
            `;
    });
    playlist.innerHTML = htmls.join('');
  },
  defineProperties: function(){
    Object.defineProperty(this,'currentSong',{
        get: function(){
            return this.songs[this.currentIndex];
        }
    })
  },

  handleEvents: function(){
    const _this = this;
    const cdWidth = cd.offsetWidth;
    //xu ly cd quay va dung
    const cdThumbAnimate = cdThumb.animate([
      {transform: 'rotate(360deg)'}
    ], {
      duration: 10000, //10 seconds
      iterations: Infinity,
    })
    cdThumbAnimate.pause();
    //xu ly phong to,thu nho cd
    document.onscroll = function(){
        const scrollTop = document.documentElement.scrollTop || window.scrollY;
        const newCdWidth = cdWidth - scrollTop;
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' :0;
        cd.style.opacity = newCdWidth / cdWidth;
    }
    //xu ly khi play
    playBtn.onclick = function(){
        if(_this.isPlaying){
        audio.pause();
        }
        else{
        audio.play();
        
        }
    }
    //Khi song duoc play
    audio.onplay = function(){
        _this.isPlaying = true;
        playBtn.classList.add('playing');
        cdThumbAnimate.play();
    }
    //KHI SONG BI PAUSE
        audio.onpause = function(){
        _this.isPlaying = false;
        playBtn.classList.remove('playing');
        cdThumbAnimate.pause();
    }
    //khi tien do bai hat thay doi
    audio.ontimeupdate = function(){
      if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime / audio.duration *100);
        progress.value = progressPercent;
      }
    }

    //xu li khi tua Song
    progress.onchange = function(e){
        const seekTime = audio.duration / 100 * e.target.value
        audio.currentTime = seekTime
    }

    //khi next song
    nextBtn.onclick = function(){
      _this.nextSong();
      audio.play()
    }
    //khi prev song
    prevBtn.onclick = function(){
      _this.prevSong();
      audio.play();
    }
    //khi random song
    randomBtn.onclick = function(e){
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle('active',_this.isRandom);
      _this.randomSong();
      audio.play();
    }
  },  
  loadCurrentSong: function(){
    nameSong.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path; 
  },
  nextSong: function(){
    this.currentIndex++;
    console.log(this.currentIndex, this.songs.length );
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function(){
    this.currentIndex--;
    console.log(this.currentIndex, this.songs.length );
    if(this.currentIndex <= 0){
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong : function(){
    let newIndex
    do{
      newIndex = Math.floor(Math.random() * this.songs.length)
    }while(newIndex === this.currentIndex)
      this.currentIndex = newIndex
      this.loadCurrentSong();
  },
  start: function () {
    this.defineProperties();

    this.handleEvents();
    //Tai tt bai hat dau tien vao UI khi chay app
    this.loadCurrentSong();
    this.render();
  },
};

app.start();
//06.05