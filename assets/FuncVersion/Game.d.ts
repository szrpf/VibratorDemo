declare namespace gi {
    //让node振动repeat次，振幅amplitude（水平、垂直两方向），频率frequency（ms），time < 0无限振动，time = 0停止振动
    //例如：gi.shake(node,5,cc.v2(20,0))振动5次，gi.shake(node,-1)振动无限次，gi.shake(node,0)停止振动
    export function shake(node: cc.Node, repeat: number, amplitude?: cc.Vec2, frequency?: number);
}