/*
 * @description 顶部导航菜单和页签滚动方法
 */

/*
 * @description 点击滚动容器
 * @param el 滚动容器 dom
 * @param pane 放置 子项的容器
 * @param items 容器内部的子项
 * @param direction 滚动方向
 */
export async function handleScrollFromClick(el, pane, items, direction) {
  // 向左滚动
  if (direction === 'left') {
    // 向左滚动的余量
    let offset = el.scrollLeft
    for (let i = 0; i < items.length; i++) {
      offset -= items[i].offsetWidth
      if (offset < 0) {
        return await scrollForAnime(el, pane, Math.abs(offset), direction)
      } else if (offset === 0) {
        return await scrollForAnime(el, pane, items[i].offsetWidth, direction)
      } else if (offset < items[i + 1]?.offsetWidth) {
        return await scrollForAnime(el, pane, Math.abs(offset), direction)
      }
    }
  }
  // 向右滚动
  if (direction === 'right') {
    let offset = Math.round(el.scrollLeft)
    // 几个菜单的宽度能把外部容器占满
    let itemsWidth = 0
    for (let i = 0; i < items.length; i++) {
      // 累加子项宽度
      itemsWidth += items[i].offsetWidth
      if (itemsWidth - offset > pane.offsetWidth) {
        // 判断是否滚动值是否太小
        const sum = itemsWidth - pane.offsetWidth - offset
        if (!!items[i + 1] && sum < items[i]?.offsetWidth / 4) {
          return await scrollForAnime(el, pane, sum + items[i + 1]?.offsetWidth, direction)
        }
        // 如果子项加起来减去滚动距离大于容器宽度，需要滚动子项的宽度减去滚动距离和容器宽度
        return await scrollForAnime(el, pane, sum, direction)
      } else if (pane.offsetWidth === itemsWidth - offset) {
        // 如果子项的宽度减去滚动距离刚好等于容器宽度，则正好滚动下一项菜单的宽度
        return await scrollForAnime(el, pane, items[i + 1]?.offsetWidth, direction)
      }
    }
  }
}

/*
 * @desc 给容器的滚动添加动画
 * @param el 滚动的容器
 * @param offset 滚动的距离
 * @param direction 滚动的方向
 */
export function scrollForAnime(el, pane, offset, direction) {
  if (!offset || offset <= 0)
    return {
      // 滚动距离为0，表示已经到最左边了
      left: el.scrollLeft === 0,
      // 判断滚动宽度减去容器宽度是否小于等于滚动距离
      right: el.scrollWidth - el.offsetWidth <= el.scrollLeft,
    }
  // 每帧滚动的距离
  const step = 5
  // 滚动方法
  return new Promise((resolve) => {
    const anime = () => {
      if (direction === 'left') {
        el.scrollLeft -= Math.min(step, offset)
      } else {
        el.scrollLeft += Math.min(step, offset)
      }
      offset -= step
      if (offset > 0) {
        requestAnimationFrame(anime)
      } else {
        resolve({
          // 滚动距离为0，表示已经到最左边了
          left: el.scrollLeft === 0,
          // 判断滚动宽度减去容器宽度是否小于等于滚动距离
          right: el.scrollWidth - el.offsetWidth <= el.scrollLeft,
        })
      }
    }
    requestAnimationFrame(anime)
  })
}
