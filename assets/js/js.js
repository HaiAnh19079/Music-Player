const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STRORAGE_KEY = "F8_PLAYER"

const player = $(".player")
const heading = $("header h2")
const cdThumb = $(".cd-thumb")
const audio = $("#audio")
const cd = $(".cd")
const playBtn = $(".btn-toggle-play")
const nextBtn = $(".btn-next")
const prevBtn = $(".btn-prev")
const randomBtn = $(".btn-random")
const repeatBtn = $(".btn-repeat")
const playlist = $(".playlist")
const saveBtn = $(".btn-save")
const headTitle = $("#title")
const progressTime = $("#progressTime")
const progressTimeValue = $(".song-time__value")
const progressAllTime = $(".song-all-time")
const progressVolume = $("#progressVolume")
const progressVolumeValue = $(".song-volume__value")
const app = {
	currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeat: false,
	isSave: false,
	isTimeupdate: true,
	isSongVolume: 100,
	config: JSON.parse(localStorage.getItem(PLAYER_STRORAGE_KEY)) || {},
	songs: [
		{
			name: "Fly me to the moon",
			singer: "Lofi Cover (Prod. YungRhythm)",
			path: "./song/song1.mp3",
			image: "./img/img-1.jpg",
		},
		{
			name: "Dĩ vẵng nhạt nhòa",
			singer: " Lofi By Tama",
			path: "./song/song2.mp3",
			image: "./img/img-2.jpeg",
		},
		{
			name: "Stay with me",
			singer: "Chanyeol (EXO) ft. Punch",
			path: "./song/song3.mp3",
			image: "./img/img-3.jpg",
		},
		{
			name: "My eyes",
			singer: "10cm",
			path: "./song/song4.mp3",
			image: "./img/img-4.jpg",
		},
		{
			name: "Hush",
			singer: "Lasse Lindh",
			path: "./song/song5.mp3",
			image: "./img/img-5.jpg",
		},
		{
			name: "You are so beautiful",
			singer: "Eddy Kim",
			path: "./song/song6.mp3",
			image: "./img/img-6.jpg",
		},
		{
			name: "Mơ hồ",
			singer: "Bùi Anh Tuấn",
			path: "./song/song7.mp3",
			image: "./img/img-7.jpg",
		},
		{
			name: "Thanh xuân",
			singer: "Da LAB",
			path: "./song/song8.mp3",
			image: "./img/img-8.jpg",
		},
		{
			name: "Lily",
			singer: "Alan Walker, K-391 & Emelie Hollow",
			path: "./song/song9.mp3",
			image: "./img/img-9.jpg",
		},
		{
			name: "Señorita",
			singer: "Shawn Mendes, Camila Cabello",
			path: "./song/song10.mp3",
			image: "./img/img-10.jpg",
		},
		{
			name: "Ái nộ",
			singer: "Masew x Khoi Vu",
			path: "./song/song11.mp3",
			image: "./img/img-11.jpeg",
		},
		{
			name: "Build a b*tch",
			singer: "Pella ",
			path: "./song/song12.mp4",
			image: "./img/img-12.jpeg",
		},
		{
			name: "Take me hand",
			singer: "Pella ",
			path: "./song/song13.mp4",
			image: "./img/img-13.jpeg",
		},
		{
			name: "Chỉ Một Lần Thôi Em Nhé Hãy Để Anh Yêu Em",
			singer: "Phạm Đình Thái Ngân",
			path: "./song/song14.mp4",
			image: "./img/img-14.jpg",
		},
		{
			name: "Đại Thiên Bồng",
			singer: "Lý Viên Kiệt",
			path: "./song/song15.mp3",
			image: "./img/img-15.jpg",
		},
		{
			name: "Vây giữ",
			singer: "V t V",
			path: "./song/song16.mp3",
			image: "./img/img-16.jpeg",
		},
		{
			name: "Fa b",
			singer: "...",
			path: "./song/song17.mp4",
			image: "./img/img-17.jpg",
		},
	],

	setConfig: function (key, value) {
		this.config[key] = value
		localStorage.setItem(PLAYER_STRORAGE_KEY, JSON.stringify(this.config))
	},

	render() {
		const htmls = this.songs.map((song, index) => {
			return `
                        <div class="song${
							index === this.currentIndex ? " active" : ""
						}" data-index=${index}>
                            <div class="thumb" 
                                style="background: url('${
									song.image
								}') top center / cover no-repeat">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `
		})
		playlist.innerHTML = htmls.join("")
	},
	defineProperties() {
		Object.defineProperty(this, "currentSong", {
			get() {
				return this.songs[this.currentIndex]
			},
		})
	},
	handleEvents() {
		const cdWidth = cd.offsetWidth

		//Xử lý CD quay / dừng
		const cdThumbAnimate = cdThumb.animate(
			[
				{
					transform: "rotate(360deg)",
				},
			],
			{
				duration: 10000, //10second
				iterations: Infinity,
			}
		)
		cdThumbAnimate.pause()

		//Xử lý phóng to / thu nhỏ CD
		document.onscroll = function () {
			const scrollTop =
				window.scrollY || document.documentElement.scrollTop
			const newCdWidth = cdWidth - scrollTop

			cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0

			const cdOpacity = newCdWidth / cdWidth
			cd.style.opacity = cdOpacity > 0 ? cdOpacity : 0
		}

		//Xử lý khi click play
		playBtn.onclick = () => {
			if (this.isPlaying) {
				audio.pause()
			} else {
				audio.play()
			}
		}

		//khi song được play
		audio.onplay = () => {
			this.isPlaying = true
			player.classList.add("playing")
			cdThumbAnimate.play()
		}

		//khi song bị pause
		audio.onpause = () => {
			this.isPlaying = false
			player.classList.remove("playing")
			cdThumbAnimate.pause()
		}

		progressTime.onmousedown = () => {
			this.isTimeupdate = false
		}

		progressTime.ontouchstart = () => {
			this.isTimeupdate = false
		}

		// Khi bài hát được tua
		progressTime.onchange = e => {
			const seekTime = (audio.duration / 100) * e.target.value
			audio.currentTime = seekTime
			this.isTimeupdate = true
		}

		// Khi tiến độ bài hát thay đổi
		audio.ontimeupdate = () => {
			if (audio.duration && this.isTimeupdate) {
				const progressPercent =
					(audio.currentTime / audio.duration) * 100
				const minutes = Math.floor(audio.currentTime / 60)
				const seconds = Math.floor(audio.currentTime - minutes * 60)

				progressTime.value = progressPercent
				progressTimeValue.innerHTML = `0${minutes}:${
					seconds >= 10 ? seconds : "0" + seconds
				}`
				this.setConfig("currentTime", audio.currentTime)
				// if (this.isSave) {
				// } else {
				//     this.setConfig('currentTime', 0)
				// }
			}
			if (audio.duration) {
				const minutesDuration = Math.floor(audio.duration / 60)
				const secondsDuration = Math.floor(
					audio.duration - minutesDuration * 60
				)
				progressAllTime.innerHTML = `0${minutesDuration}:${
					secondsDuration >= 10
						? secondsDuration
						: "0" + secondsDuration
				}`
			}
		}

		//Thay đổi âm lượng
		progressVolume.oninput = e => {
			this.isSongVolume = e.target.value
			audio.volume = this.isSongVolume / 100
			progressVolume.value = this.isSongVolume
			progressVolumeValue.innerHTML = `${progressVolume.value}%`
			this.setConfig("currentVolume", this.isSongVolume)
		}

		//Khi next song
		nextBtn.onclick = () => {
			if (this.isRandom) {
				this.playRandomSong()
			} else {
				this.nextSong()
			}
			audio.play()
			this.render()
			this.scrollToActiveSong()
		}

		//Khi prev song
		prevBtn.onclick = () => {
			if (this.isRandom) {
				this.playRandomSong()
			} else {
				this.prevSong()
			}
			audio.play()
			this.render()
			this.scrollToActiveSong()
		}

		//KeyCode next & prev song
		window.onkeydown = e => {
			if (
				e.keyCode == 38 &&
				e.keyCode == 40 &&
				e.target == document.body
			) {
				e.preventDefault()
			}
			if (e.keyCode === 39) {
				nextBtn.click()
			}
			if (e.which === 37) {
				prevBtn.click()
			}
			if (e.keyCode === 38) {
				e.preventDefault()
				if (this.isSongVolume < 100) {
					this.isSongVolume += 5
					audio.volume = this.isSongVolume / 100
					progressVolume.value = this.isSongVolume
				} else {
					this.isSongVolume = 100
					audio.volume = this.isSongVolume / 100
					progressVolume.value = this.isSongVolume
				}
				this.setConfig("currentVolume", this.isSongVolume)
				progressVolumeValue.innerHTML = `${progressVolume.value}%`
			}
			if (e.keyCode === 40) {
				e.preventDefault()
				if (this.isSongVolume > 0) {
					this.isSongVolume -= 5
					audio.volume = this.isSongVolume / 100
					progressVolume.value = this.isSongVolume
				} else {
					this.isSongVolume = 0
					audio.volume = this.isSongVolume / 100
					progressVolume.value = this.isSongVolume
				}
				this.setConfig("currentVolume", this.isSongVolume)
				progressVolumeValue.innerHTML = `${progressVolume.value}%`
			}
			if (e.keyCode === 32) {
				playBtn.click()
			}
		}

		//Xử lý bật / tắt random song
		randomBtn.onclick = () => {
			this.isRandom = !this.isRandom
			this.setConfig("isRandom", this.isRandom)
			randomBtn.classList.toggle("active", this.isRandom)
		}

		//Xử lý lặp lại song
		repeatBtn.onclick = () => {
			this.isRepeat = !this.isRepeat
			this.setConfig("isRepeat", this.isRepeat)
			repeatBtn.classList.toggle("active", this.isRepeat)
		}

		//Xử lý next song khi ended
		audio.onended = () => {
			if (this.isRepeat) {
				audio.play()
			} else {
				nextBtn.click()
			}
			this.scrollToActiveSong()
		}

		//Lắng nghe hành vi click vào playlist
		playlist.onclick = e => {
			//Xử lý khi click vào song
			const songNode = e.target.closest(".song:not(.active)")
			if (songNode || e.target.closest(".option")) {
				if (songNode) {
					//get Index song
					//console.log(songNode.dataset.index)
					this.currentIndex = Number(songNode.dataset.index)

					this.loadCurrentSong()
					this.render()
					this.scrollToActiveSong()
					audio.play()
				}

				//Xử lý khi click vào option
				else if (e.target.closest(".option") && !songNode) {
					console.log("click on option!")
				}
			}
		}

		//Click lưu currentSong & currentTime
		// saveBtn.onclick = () => {
		//     this.isSave = !this.isSave;
		//     saveBtn.classList.toggle('active', this.isSave)
		//     this.playSaveInfo()
		//     this.setConfig('isSave', this.isSave)

		// }
	},
	scrollToActiveSong() {
		var view = ""
		if (this.currentIndex < 2) view = "end"
		else view = "center"
		setTimeout(() => {
			$(".song.active").scrollIntoView({
				behavior: "smooth",
				block: view,
				inline: "nearest",
			})
		}, 300)
	},

	loadCurrentSong() {
		console.log("currentSong ->", this)
		heading.textContent = this.currentSong.name
		cdThumb.style.background = `url(${this.currentSong.image}) top center / cover no-repeat`
		audio.src = this.currentSong.path
		headTitle.textContent = this.currentSong.name
		progressVolumeValue.innerHTML = `${progressVolume.value}%`
		this.isRandom = this.isRandom
		this.isRepeat = this.isRepeat
		this.isSave = this.isSave
		this.isTimeupdate = this.isTimeupdate
		this.isSongVolume = this.isSongVolume
		this.setConfig("currentSong", this.currentSong)
		this.setConfig("currentIndex", this.currentIndex)
		this.setConfig("currentTime", audio.currentTime)
		this.setConfig("isRepeat", this.isRepeat)
		this.setConfig("isRandom", this.isRandom)
		this.setConfig("currentVolume", this.isSongVolume)
		// if (this.isSave) {
		//     this.playSaveInfo()
		// }
		this.scrollToActiveSong()
	},
	loadConfig() {
		console.log("loadConfig ->", this)

		this.isRandom = this.config.isRandom
		this.isRepeat = this.config.isRepeat
		this.isSave = this.config.isSave
		this.isSongVolume = this.config.currentVolume
		audio.volume = this.config.currentVolume / 100
		progressVolume.value = this.isSongVolume
		audio.currentTime = this.config.currentTime
		this.currentIndex = this.config.currentIndex
		if (this.config.currentIndex === undefined && this.isSave === false) {
			this.currentIndex = 0
		} else {
			this.currentIndex = this.config.currentIndex
			audio.currentTime = this.config.currentTime
		}
	},
	nextSong() {
		this.currentIndex++
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0
		}
		this.loadCurrentSong()
	},
	prevSong() {
		this.currentIndex--
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1
		}
		this.loadCurrentSong()
	},
	playRandomSong() {
		let newIndex
		do {
			newIndex = Math.floor(Math.random() * this.songs.length)
		} while (newIndex === this.currentIndex)
		{
			this.currentIndex = newIndex
			this.loadCurrentSong()
		}
	},
	playSaveInfo() {
		if (this.isSave) {
			this.setConfig("currentIndex", this.currentIndex)
			this.setConfig("currentTime", audio.currentTime)
		} else {
			this.setConfig("currentIndex", 0)
		}
	},
	start() {
		//Gán cấu hình từ config vào app

		if (Object.values(this.config).length !== 0) {
			console.log(this.config)
			this.loadConfig()
		}

		//Định nghĩa các thuộc tính cho Object
		this.defineProperties()

		//Lắng nghe / xử lý các sự kiện (DOM events)
		this.handleEvents()

		//Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
		this.loadCurrentSong()

		//Render playlist
		this.render()

		//hiển thị trạng thái ban đầu của btn Repeat&Random
		randomBtn.classList.toggle("active", this.isRandom)
		repeatBtn.classList.toggle("active", this.isRepeat)
		// saveBtn.classList.toggle('active', this.isSave)
	},
}

app.start()
