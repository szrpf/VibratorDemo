export namespace gi {
    //让node振动repeat次，振幅amplitude（水平、垂直两方向），频率frequency（ms），time < 0无限振动，time = 0停止振动
    //例如：gi.shake(node,5,cc.v2(20,0))振动5次，gi.shake(node,-1)振动无限次，gi.shake(node,0)停止振动
    export function shake(node: cc.Node, repeat: number, amplitude?: cc.Vec2, frequency?: number) {
        if (node['amplitude']) {
            node.x -= node['amplitude'].x;
            node.y -= node['amplitude'].y;
            clearInterval(node['shakeHandle']);
        }
        if (repeat === 0) {
            delete node['shakeHandle'];
            delete node['amplitude'];
            delete node['frequency'];
            return;
        }
        repeat = ~~repeat;
        if (amplitude) {
            node['amplitude'] = amplitude;
        } else if (node['amplitude']) {
            node['amplitude'].x = -node['amplitude'].x;
            node['amplitude'].y = -node['amplitude'].y;
        } else return;
        node['frequency'] = frequency !== undefined ? Math.max(frequency, 10) : node['frequency'] ?? 50;
        node.x += node['amplitude'].x;
        node.y += node['amplitude'].y;
        let step = cc.v2();
        if (repeat > 0) {
            repeat = Math.max(repeat - 1, 1);
            step = cc.v2(-node['amplitude'].x / repeat, -node['amplitude'].y / repeat);
        }
        node['shakeHandle'] = setInterval(() => {
            node.x -= node['amplitude'].x;
            node.y -= node['amplitude'].y;
            if (--repeat === 0) {
                clearInterval(node['shakeHandle']);
                delete node['shakeHandle'];
                delete node['amplitude'];
                delete node['frequency'];
                return;
            }
            node['amplitude'].x = -node['amplitude'].x - step.x;
            node.x += node['amplitude'].x;
            step.x = -step.x;
            node['amplitude'].y = -node['amplitude'].y - step.y;
            node.y += node['amplitude'].y;
            step.y = -step.y;
        }, node['frequency']);
    }
}
window['gi'] = gi;