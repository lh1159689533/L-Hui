<template>
  <div id="gobang">
    <canvas id="chess" width="450px" height="450px"></canvas>
    <Drawer v-model="drawerinfo.isopen" :title="drawerinfo.title" :closable="false" style="width:300px">
      <!-- <Anchor show-ink>
        <AnchorLink title="此次五子棋人机大战中你一败涂地，尽管你步步为营，但智者千虑终有一失，一子错满盘皆落索，最终你输给了自己的程序。你原以为自己是代表光明的白子，却输给了黑暗。你很想反悔，可是开发之初你秉持‘棋如人生，落子无悔’的原则，并没有提供悔棋功能，而且这也不是所谓光明之子的行事风格。你为此郁郁寡欢，你想再来一局一雪前耻，但是你又怕再次尝到失败的滋味，为此你犹豫不决，但当你摸到自己聪明而秃顶的脑壳时，你果断放弃了此想法。曾几何时，你长发飘飘，你容光焕发，如今的你很怀念并很想找回当初的感觉，因此你决定要克制不必要的思考。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="于是，你离开了电脑，迎风走在街道上。已然深秋的街道，只有寥寥的几位环卫工人。环卫工人们拿着魔法扫帚将落叶扫成一堆并施以禁锢法术。但此法术的天敌——风，此刻正在肆虐。秋风过处，重得自由的落叶蹦蹦跳跳的迎你而来，然后在你身后蹦蹦跳跳的远去，丝毫不顾环卫工人们如何的暴跳如雷。一堆落叶大如斗，风吹满地叶乱走，你难得的会心一笑，你为落叶们的重获自由感到由衷的开心。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="你继续迎风走着，你偶尔抬头一看，一轮上弦月挂在天上，究竟是上弦月还是下弦月你一时也分不太清，你不想去思考这种无所谓的问题，你要禁止不必要的脑活动。你继续迎风而行，你再次抬头时，发现不知是上弦还是下弦的月的位置变了，你于是想到了‘风吹幡动’的故事，你不禁陷入了思考：是月在动，还是人在动，或者说是人所处的地球在动。你久思而不得解。忽而，一片枯叶被风吹落，刮过你的脸颊时，你恍然大悟：月在动，人在动，人所处的地球也在动。这种是个读书人就知道的问题，你却为此思索良久，你悔恨不已，你不禁摸了下自己聪明而秃顶的脑壳，你痛恨自己的无为之思考。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="你想迎风跑起来，可是风停了，你不知道风是在此刻停的还是你此刻才察觉风停了，你不想去想，尽管你很想。你不确定这种不想去想，是不是也属于无为之思。你为此感到心烦意乱。你看到街边有包子铺，便决定买俩包子打道回家。就在你拿着热乎乎的包子转身原路返回的时候，你不禁回头看了一眼不知是上弦还是下弦的月，可是不知是上弦还是下弦的月被一朵可恨的乌云遮住，和挂在你人生上头的那朵乌云一样的面目可憎。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="你佝偻着身子走着，此时风又来了，只不过没有之前那般肆虐，你听到落叶们从你身后欢呼雀跃的跑来，然后朝前欢呼雀跃的远去。人随秋叶叶随风，你很想随着落叶跑起来，但是你欢呼雀跃不来，你跑不起来。昏黄的灯光中，你与不知是上弦还是下弦的月渐行渐远，此刻的乌云已被风吹散，可惜你再也没有回头。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="那天之后很久，人们议论纷纷。当警方发现死者时，死者已全身僵硬，如此寒冬，死者的住所竟没有任何取暖设备。但凶手不是寒冷，而是脑溢血，确切的说是警察头头绞尽脑汁也没有找到的引起脑溢血的原因。当警方想打开死者的电脑看能不能找到一点蛛丝马迹时，发现电脑并没有关机。他们反反复复查看了死者的电脑，并没有发现什么异常。死者电脑除了一盘警方认为是陷入僵局的围棋，实则是一盘看似还未结束但白子已现劣势的五子棋，之外，并无其他。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="此事最后被警方草草解决，死者的死亡报告上赫然写着：死因：脑溢血。至于起因无人知晓也无人关心，因为死者的遗体在停尸房躺了一月有余也无人认领，对此警方见怪不怪，毕竟在陌生的异乡，这种事并不少见。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="这件事随着时间的流逝，渐渐的淡出了人们的记忆。除了死者生前的房东一直耿耿于怀，只到有一天来了一个长发飘飘容光焕发的少年租下了这间房子之后，房东才释怀。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="少年在打扫衣柜的时候，无意间看到一张小字条掉在了地上，少年好奇的打开一看，只见纸条上写着这样几句：" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="月如银钩高高挂，人如蝼蚁踽踽行。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="身在他乡为异客，心归故里愿长眠。" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="" />
      </Anchor> -->
      <div id="Drag"></div>
    </Drawer>
    <div id="rank-gobang"><Button type="info" ghost @click="rank">历程</Button></div>
  </div>
</template>
<script>
  import gobang from './gobang/index'
  import drag from './drag/index'
  export default {
    name: 'gobang',
    data () {
      return {
        drawerinfo: {
          isopen: false,
          title: "五子棋人机大战之传说"
        },
        el: null
      }
    },
    mounted: function() {
      gobang.init(document.getElementById('chess'))
      drag.init(document.getElementsByClassName("ivu-drawer")[0])
    },
    methods: {
      rank () {
        this.drawerinfo.isopen = true
      }
    }
  }
</script>
<style>
  #gobang {
    height: 100%;
  }
  #rank-gobang {
    position: absolute;
    bottom: 30px;
    right: 50px;
    float: right;
  }
  .el-message {
    left: 58% !important;
    top: 65px !important;
  }
  .ivu-drawer {
    top: 6.8%
  }
  .ivu-drawer-mask {
    top: 6.8%;
  }
  .ivu-anchor-link-title {
    line-height: 18px;
    letter-spacing: 1px;
    white-space: inherit;
  }
</style>


