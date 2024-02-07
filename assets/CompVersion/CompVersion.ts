import Vibrator from "./Vibrator";
const { ccclass } = cc._decorator;

@ccclass
export default class CompVersion extends cc.Component {
    battleNode: cc.Node = null;
    roleNode: cc.Node = null;
    isBattleShake: boolean = false;
    start() {
        this.battleNode = cc.find('Battle', this.node);
        this.node.getChildByName('VS').on(cc.Node.EventType.TOUCH_START, () => {
            this.isBattleShake = !this.isBattleShake;
            this.battleNode.getComponent(Vibrator).shake(this.isBattleShake ? -1 : 20, cc.v2(20, -10), 0.05);
        }, this);
        this.node.getChildByName('Stop').on(cc.Node.EventType.TOUCH_START, () => {
            this.battleNode.getComponent(Vibrator).shake(0);
            this.isBattleShake = false;
            for (let i = this.roleNode.childrenCount - 1; i > -1; this.roleNode.children[i--].getComponent(Vibrator).shake(0));
        }, this);
        this.roleNode = cc.find('Role', this.battleNode);
        for (let i = this.roleNode.childrenCount - 1; i > -1; --i) {
            let node = this.roleNode.children[i];
            node.on(cc.Node.EventType.TOUCH_START, () => {
                switch (i) {
                    case 2: node.getComponent(Vibrator).shake(-1, cc.v2(-10, 0), 0.03); break;
                    case 5: node.getComponent(Vibrator).shake(-1, cc.v2(0, -10), 0.03); break;
                    case 0:
                    case 1: node.getComponent(Vibrator).shake(30, cc.v2(30, 0), 0.03); break;
                    case 3:
                    case 4: node.getComponent(Vibrator).shake(30, cc.v2(0, 30), 0.03); break;
                }
            });
        }
    }
}
