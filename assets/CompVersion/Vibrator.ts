/*******************************************************************************
 * 创建: 2024年01月29日
 * 作者: 水煮肉片饭(27185709@qq.com)
 * 描述: 振动器
 *       给节点挂上振动器，调用组件的shake函数可以让节点振动。
 * shake函数参数：
 * 1、repeat振动次数
 *    >0：振动repeat次（振幅逐次衰减到0）
 *    <0：振动无数次（振幅不衰减）
 *    =0：停止振动
 * 2、amplitude振动幅度，水平和垂直2个方向
 * 3、frequency振动频率，单位：秒
 * 举个栗子：
 *    comp.shake(-1,cc.v2(50,-30),0.02); 无限振动，振幅(50,-30)，每20ms振动一次
 *    comp.shake(5,cc.v2(-100,50),0.05); 振动5次，初始振幅(-100,50)逐次衰减，每50ms振动一次
 *    comp.shake(0);                     立即停止振动
 * 注意：振动过程中，调用shake(正整数)逐次衰减缓慢停止，调用shake(0)立即停止
*******************************************************************************/
const { ccclass, menu } = cc._decorator;
@ccclass
@menu('Comp/Vibrator')
export default class Vibrator extends cc.Component {
    private repeat: number = 0;             //振动次数
    private amplitude: cc.Vec2 = null;      //振动幅度
    private frequency: number = 0.05;       //振动频率
    private step: cc.Vec2 = null;           //振动步长

    shake(repeat: number, amplitude?: cc.Vec2, frequency?: number) {
        if (this.amplitude) {
            this.node.x -= this.amplitude.x;
            this.node.y -= this.amplitude.y;
            this.unschedule(this.callback);
        }
        if (repeat === 0) { 
            this.amplitude = null; 
            this.frequency = undefined;
            return;
         }
        repeat = ~~repeat;
        if(amplitude){
            this.amplitude = amplitude;
        }else if(this.amplitude){
            this.amplitude.x = -this.amplitude.x;
            this.amplitude.y = -this.amplitude.y;
        }else return;
        this.frequency = frequency !== undefined ? Math.max(frequency,0.01) : this.frequency ?? 0.05;
        this.node.x += this.amplitude.x;
        this.node.y += this.amplitude.y;
        if (repeat < 0) {
            this.repeat = repeat;
            this.step = cc.v2();
        } else {
            this.repeat = Math.max(repeat - 1, 1);
            this.step = cc.v2(-this.amplitude.x / this.repeat, -this.amplitude.y / this.repeat);
        }
        this.schedule(this.callback, this.frequency, cc.macro.REPEAT_FOREVER);
    }

    private callback() {
        this.node.x -= this.amplitude.x;
        this.node.y -= this.amplitude.y;
        if (--this.repeat === 0) {
            this.unschedule(this.callback);
            this.amplitude = null;
            this.frequency = undefined;
            return;
        }
        this.amplitude.x = -this.amplitude.x - this.step.x;
        this.node.x += this.amplitude.x;
        this.step.x = -this.step.x;
        this.amplitude.y = -this.amplitude.y - this.step.y;
        this.node.y += this.amplitude.y;
        this.step.y = -this.step.y;
    };
}