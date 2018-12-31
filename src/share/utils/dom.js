import {reqAnimFrame} from "./request-animation";

class DomOperations {
    // 获取滚动条距离
    getWindowScroll() {
        const doc = document.documentElement;
        return {
            scrollLeft: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            scrollTop: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        }
    }


    /**
     * 使用动画形式将 `el` 滚动至某位置
     *
     * @param containerEl 容器，默认 `window`
     * @param targetTopValue 滚动至目标 `top` 值，默认：0，相当于顶部
     * @param easing 动作算法，默认：`easeInOutCubic`
     * @param callback 动画结束后回调
     */
    scrollTo(targetTopValue, callback, containerEl, easing) {
        const target = containerEl ? containerEl : window;
        const scrollTop = this.getScroll(target);
        const startTime = Date.now();
        const frameFunc = () => {
            const timestamp = Date.now();
            const time = timestamp - startTime;
            this.setScrollTop(target, (easing || easeInOutCubic)(time, scrollTop, targetTopValue, 450));
            if (time < 450) {
                reqAnimFrame(frameFunc);
                 // window.requestAnimationFrame(frameFunc);
            } else {
                if (callback) callback();
            }
        };
        reqAnimFrame(frameFunc);
         // window.requestAnimationFrame(frameFunc);
    }



    /* 设置 `el` 滚动条位置 */
    setScrollTop(el, topValue = 0) {
        if (el === window) {
            document.body.scrollTop = topValue;
            document.documentElement.scrollTop = topValue;
        } else {
            el.scrollTop = topValue;
        }
    }


    /** 获取 `el` 滚动条位置 */
    getScroll(el, top = true) {
        const target = el ? el : window;
        const prop = top ? 'pageYOffset' : 'pageXOffset';
        const method = top ? 'scrollTop' : 'scrollLeft';
        const isWindow = target === window;
        let ret = isWindow ? target[ prop ] : target[ method ];
        if (isWindow && typeof ret !== 'number') {
            ret = document.documentElement[ method ];
        }
        return ret;
    }
}


function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    let tt = t / (d / 2);
    if (tt < 1) {
        return cc / 2 * tt * tt * tt + b;
    } else {
        return cc / 2 * ((tt -= 2) * tt * tt + 2) + b;
    }
}

export default new DomOperations();