<template>
  <div class="container">
    <video width="800px" height="540px" id="video" @timeupdate="timeupdate" @ended="ended" @click="play" >
      <source src="http://video.mukewang.com/mk.mp4" type="video/mp4">您的浏览器不支持
      <!-- <source src="http://www.runoob.com/try/demo_source/mov_bbb.mp4" type="video/mp4"> -->
      <!-- <source src="video.mp4" type="video/mp4"> -->
    </video>
    <div :class="'top ' + logoAni" @click="play">
      <span class="playBtn">
        <Icon type="md-play"/>
      </span>
      <span class="logo">LIUH</span>
    </div>
    <div class="bottom">
      <div class="progress" @click="changProClk" @mouseenter="proPoint=true" @mouseleave="proPoint=false">
        <div class="current" id="currentPro" :style="'width:' + curWidth">
          <div class="point" @mousedown="changePro" v-show="proPoint"></div>
        </div>
      </div>
      <div class="time">
        <span>{{curTime}}</span>
        <span>/</span>
        <span>{{duration}}</span>
      </div>
      <span class="play" id="play" @click="play">
        <Icon :type="ispause?'ios-pause':'ios-play'"/>
      </span>
      <div class="rightCtrl">
        <span class="volume" @mouseenter="showCurVol" @mouseleave="curVolHide">
          <Icon type="md-volume-up"/>
        </span>
        <div class="currentVolume" v-show="curVolShow" @mouseleave="curVolHide" @mouseenter="showCurVol">
          <span class="tolVol" id="tolVol" @click="changeVol2"></span>
          <div class="curVol" id="curVol">
            <span class="point" @mousedown="changeVol"></span>
          </div>
          <span class="num">{{curVol}}</span>
        </div>
        <span class="fullScreen" @click="fullScreen">
          <Icon type="md-qr-scanner"/>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Video: null,
      ispause: false,
      duration: "00:00:00",
      curTime: "00:00:00",
      curWidth: 0,
      defaultWidth: 0,
      defaultHeight: 0,
      curVolShow: false,
      curVol: 40,
      isHideVol: true,
      logoAni: '',
      videoX: 388,
      processTol: 0,
      proPoint: false
    };
  },
  mounted: function() {
    this.Video = document.getElementById("video")
    this.processTol = this.Video.offsetWidth - 8
    const self = this
    setTimeout(() => {
      this.duration = this.formatTime(this.Video.duration)
    }, 500)
    this.fullScreenEvent()
  },
  watch: {
    curVol: function() {
      const v = this.Video
      v.volume = this.curVol/100
    }
  },
  methods: {
    play() {
      const v = this.Video
      if (v.paused) {
        v.play()
        this.ispause = true
        this.logoAni = 'logoAniHide'
        setTimeout(() => {
          this.logoAni = 'logoAniAfter'
        }, 600)
      } else {
        v.pause()
        this.ispause = false
        this.logoAni = 'logoAniShow'
      }
    },
    timeupdate() {
      const v = this.Video;
      this.curTime = this.formatTime(v.currentTime)
      this.curWidth = (this.processTol) * (v.currentTime / v.duration) + "px"
    },
    ended() {
      this.ispause = false
      this.logoAni = 'logoAniShow'
    },
    showCurVol () {
      if (!this.isHideVol) return
      this.curVolShow = true
    },
    curVolHide () {
      if (!this.isHideVol) return
      this.curVolShow = false
    },
    changeVol (e) {
      this.isHideVol = false
      const y = e.clientY
      const moveDiv = document.getElementById('curVol')
      const curHei = moveDiv.offsetHeight
      document.onmousemove = (e) => {
        const h = curHei + (y - e.clientY)
        if (h > 50 || h < 0) {
          return
        }
        this.curVol = Math.floor(h/50 * 100)
        moveDiv.style.height = h + 'px';
      };
      document.onmouseup = (e) => {
        this.isHideVol = true
        document.onmousemove = null;
        document.onmouseup = null;
      }
    },
    changeVol2 (e) {
      const y = e.clientY
      const divVol = document.getElementById("tolVol")
      const h = 50 - (y - divVol.offsetTop)
      console.log(divVol.offsetTop)
      // divVol.style.height = h + 'px'
      // this.curVol = Math.floor(h/50 * 100)
    },
    changePro (e) {
      const v = this.Video
      const x = e.clientX
      const moveDiv = document.getElementById('currentPro')
      const curWid = moveDiv.offsetWidth
      document.onmousemove = (e) => {
        const w = curWid + (e.clientX - x)
        if (w > (this.processTol) || w < 0) {
          return
        }
        moveDiv.style.width = w + 'px'
        v.currentTime = w/(this.processTol) * v.duration
      };
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    changProClk (e) {
      console.log(e.clientX)
      const x = e.clientX - this.videoX
      const v = this.Video
      const moveDiv = document.getElementById('currentPro')
      if (x > (this.processTol) || x < 0) {
        return
      }
      moveDiv.style.width = x + 'px'
      v.currentTime = x/(this.processTol) * v.duration
    },
    fullScreen() {
      const v = this.Video
      if (!this.isFull()) {
        if (v.requestFullscreen) {
          console.log(1)
          v.requestFullscreen()
        } else if (v.webkitRequestFullscreen) {
          console.log(2)
          v.webkitRequestFullscreen()
        } else if (v.mozRequestFullScreen) {
          console.log(3)
          v.mozRequestFullScreen()
        } else if (v.msRequestFullscreen) {
          console.log(4)
          v.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        v.style.width = '600px'
        v.style.height = '340px'
      }
    },
    fullScreenEvent() {
      const v = this.Video
      this.defaultWidth = v.offsetWidth
      this.defaultHeight = v.offsetHeight
      // ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach((event,i) => {
      //   document.addEventListener(event, (event) => {
      //     if (!this.isFull()) {
      //       v.style.width = window.screen.width + 'px'
      //       v.style.height = window.screen.height + 'px'
      //     }
      //   })
      // })
      document.addEventListener("fullscreenchange", () => {
        if (!this.isFull()) {
          v.style.width = window.screen.width + 'px'
          v.style.height = window.screen.height + 'px'
        } else {
          v.style.width = this.defaultWidth + 'px'
          v.style.height = this.defaultHeight + 'px'
        }
      })
    },
    formatTime(tm) {
      const hour = Math.floor(tm / 3600) || 0;
      const minute = Math.floor((tm % 3600) / 60) || 0;
      const second = Math.floor(tm % 60) || 0;
      return (
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (minute < 10 ? "0" + minute : minute) +
        ":" +
        (second < 10 ? "0" + second : second)
      );
    },
    isFull() {
      return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    }
  }
};
</script>
<style>
@import "./play.css";
</style>

