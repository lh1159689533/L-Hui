/**
 * 使容器可通过拖拽改变宽度,该容器为自定义,但必须包含<div id="Drag"></div>
 * 参数为该容器dom对象
 * 现版本只支持容器左边栏拖拽,一般配合iview的Drawer使用
 * @author hui.li
 * @date 2018-12-14
 * @version 1.0
 */
let drag = {}

drag.elId = "Drag"

drag.init = function(elrg) {
  let el = document.getElementById(this.elId)
  el.style.cssText = "width: 2px;height: calc(100% - 51px);float: left;background-color: #fff;margin-left: -16px;cursor: e-resize;top: 0;position: absolute;"
  $(el).mousedown((e) => {
    el.setCapture ? (
      el.setCapture(),
      el.onmousemove = function(ev) {
        mouseMove(ev || event)
      }
    ) : (
      $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
    )
    e.preventDefault()
  })

  function mouseMove (e) {
    elrg.style.width = document.body.clientWidth - e.clientX + 'px'
  }
  function mouseUp () {
    el.releaseCapture ? (
      el.releaseCapture(),
      el.onmousemove = el.onmouseup = null
    ) : (
      $(document).unbind("mousemove", mouseMove).bind("mouseup", mouseUp)
    )
  }
}

export default drag