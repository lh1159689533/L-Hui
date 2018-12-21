<template>
  <div id="tzfe">
    <header>
      <h1>2048</h1>
      <a @click="restart" id="newgamebutton">New Game</a>
      <p>score:<span id="score">{{score}}</span></p>
      <span id="add"></span>
    </header>
    
    <div id="grid-container">
      <div class="grid-cell" id="grid-cell-0-0"></div>
      <div class="grid-cell" id="grid-cell-0-1"></div>
      <div class="grid-cell" id="grid-cell-0-2"></div>
      <div class="grid-cell" id="grid-cell-0-3"></div>
      
      <div class="grid-cell" id="grid-cell-1-0"></div>
      <div class="grid-cell" id="grid-cell-1-1"></div>
      <div class="grid-cell" id="grid-cell-1-2"></div>
      <div class="grid-cell" id="grid-cell-1-3"></div>
      
      <div class="grid-cell" id="grid-cell-2-0"></div>
      <div class="grid-cell" id="grid-cell-2-1"></div>
      <div class="grid-cell" id="grid-cell-2-2"></div>
      <div class="grid-cell" id="grid-cell-2-3"></div>
      
      <div class="grid-cell" id="grid-cell-3-0"></div>
      <div class="grid-cell" id="grid-cell-3-1"></div>
      <div class="grid-cell" id="grid-cell-3-2"></div>
      <div class="grid-cell" id="grid-cell-3-3"></div>
    </div>
    <HDrawer :drawer-data="drawerinfo">
      <!-- <Anchor show-ink>
        <AnchorLink title="月如银钩高高挂，人如蝼蚁踽踽行。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="身在他乡为异客，心归故里愿长眠。" />
      </Anchor> -->
    </HDrawer>
    <div id="rank"><Button type="info" ghost @click="rank">历程</Button></div>
  </div>
</template>
<script>
  import tzfe from './tzfe/index'
  import HDrawer from './HDrawer'
  export default {
    name: 'tzfe',
    components: {
      HDrawer
    },
    data () {
      return {
        score: 0,
        drawerinfo: {
          isopen: false,
          title: "您的2048之旅"
        }
      }
    },
    created: function() {
      document.onkeydown = (e) => {
        let key = window.event.keyCode
        if (key == 37) {
          this.left()
        } else if (key == 38) {
          this.up()
        } else if (key == 39) {
          this.right()
        } else if (key == 40) {
          this.down()
        }
      }
    },
    mounted: function() {
      tzfe.run()
    },
    methods: {
      restart () {
        tzfe.restart()
      },
      up () {
        tzfe.U()
      },
      down () {
        tzfe.D()
      },
      left () {
        tzfe.L()
      },
      right () {
        tzfe.R()
      },
      rank () {
        this.drawerinfo.isopen = true
      }
    }
  }
</script>
<style>
  #tzfe header {
    display:block;
    margin:0 auto;
    width:100%;
    text-align:center;
  }
  #tzfe header h1 {
    font-family:Arial;
    font-size:40px;
    font-weight:bold;
  }
  #tzfe header #newgamebutton {
    display:block;
    margin:20px auto;
    width:100px;
    padding:10px 10px;
    background-color:#8f7a66;
    font-family:Arial;
    color:white;
    border-radius:10px;
    text-decoration:none;
  }
  #tzfe header #newgamebutton:hover {
    background-color:#9f8b77;
  }
  #tzfe header p {
    font-family:Arial;
    font-size:25px;
    margin:20px auto;
  }
  #tzfe #grid-container {
    width:460px;
    height:460px;
    padding:20px;
    margin:40px auto;
    background-color:#bbada0;
    border-radius:10px;
    position:relative;
  }
  #tzfe .grid-cell {
    width:100px;
    height:100px;
    border-radius:6px;
    background-color:#ccc0b3;
    position:absolute;
  }
  #tzfe .number-cell {
    border-radius:6px;
    font-family:Arial;
    font-weight:bold;
    font-size:40px;
    line-height:100px;
    text-align:center;
    position:absolute;
  }
  #tzfe #add {
    width: 100px;
    height: 100px;
    top: 260px;
    left: 760px;
    position: absolute;
    color: red;
    font-size: 28px;
  }
  .el-message {
    left: 88.9% !important;
    top: 14.2% !important;
  }
  .el-message p {
    padding-left: 10px;
  }
  #rank {
    position: absolute;
    bottom: 30px;
    right: 50px;
    float: right;
  }
</style>


