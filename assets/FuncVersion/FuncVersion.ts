
const { ccclass } = cc._decorator;

@ccclass
export default class FuncVersion extends cc.Component {
    battleNode: cc.Node = null;
    roleNode: cc.Node = null;
    isBattleShake: boolean = false;
    start() {
        this.battleNode = cc.find('Battle', this.node);
        this.node.getChildByName('VS').on(cc.Node.EventType.TOUCH_START, () => {
            this.isBattleShake = !this.isBattleShake;
            gi.shake(this.battleNode, this.isBattleShake ? -1 : 20, cc.v2(20, -10), 50);
        }, this);
        this.node.getChildByName('Stop').on(cc.Node.EventType.TOUCH_START, () => {
            gi.shake(this.battleNode, 0);
            this.isBattleShake = false;
            for (let i = this.roleNode.childrenCount - 1; i > -1; gi.shake(this.roleNode.children[i--], 0));
        }, this);
        this.roleNode = cc.find('Role', this.battleNode);
        for (let i = this.roleNode.childrenCount - 1; i > -1; --i) {
            let node = this.roleNode.children[i];
            node.on(cc.Node.EventType.TOUCH_START, () => {
                switch (i) {
                    case 2: gi.shake(node, -1, cc.v2(-10, 0), 30); break;
                    case 5: gi.shake(node, -1, cc.v2(0, -10), 30); break;
                    case 0:
                    case 1: gi.shake(node, 30, cc.v2(30, 0), 30); break;
                    case 3:
                    case 4: gi.shake(node, 30, cc.v2(0, 30), 30); break;
                }
            });
        }
    }
}
